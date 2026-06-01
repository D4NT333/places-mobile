import React, { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";

import {
  EditHeader,
  EditableTextField,
  EditablePillsField,
  EditableReturnedSubtagsBox,
  EditablePhotosBox,
  EditableMapBox,
  SubmitAgainBox,
  EditableOptionModal,
  EditablePriceModal,
  EditableScheduleModal,
  ResubmitSuccessModal,
  DeleteSubtagWarningModal,
} from "./Components";

import getReturnedPlaceSubmissionEditDataService from "../../../../services/api/getReturnedPlaceSubmissionEditData.service";

import { getTagsService } from "../../../../services/firebase/firestore/tags/getTags.service";
import { getSubtagsByTagId } from "../../../../services/firebase/firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "../../../../services/firebase/firestore/approaches/getApproachesByTagId.service";

import {
  uploadCorrectedSubmissionPhotoService,
  resubmitReturnedPlaceSubmissionService
} from "../../../../services";

import styles from "./styles";

const EMPTY_RETURN_FIELDS = {
  name: { selected: false, message: "" },
  description: { selected: false, message: "" },
  tag: { selected: false, message: "" },
  subtags: { selected: false, message: "" },
  approaches: { selected: false, message: "" },
  price: { selected: false, message: "" },
  schedule: { selected: false, message: "" },
  photos: { selected: false, message: "" },
  location: { selected: false, message: "" },
};

const DEFAULT_OPENING_HOURS = {
  type: "not_specified",
  days: [],
  openTime: null,
  closeTime: null,
  label: "Horario no especificado",
};

const FALLBACK_PLACE = {
  id: "fallback",
  name: "",
  description: "",
  tag: [],
  subtags: [],
  approaches: [],
  priceRange: "",
  openingHours: DEFAULT_OPENING_HOURS,
  schedule: DEFAULT_OPENING_HOURS.label,
  photos: [],
  mapLabel: "ubicación",
  returnFields: EMPTY_RETURN_FIELDS,
};

const TAG_IDS_WITHOUT_APPROACHES = [
  "tag_shopping",
  "tag_lodging",
  "tag_service",
];

function tagDoesNotUseApproaches(tagId) {
  return TAG_IDS_WITHOUT_APPROACHES.includes(tagId);
}

function normalizeOpeningHours(openingHours, fallbackSchedule = "") {
  if (!openingHours || typeof openingHours !== "object") {
    return {
      ...DEFAULT_OPENING_HOURS,
      label: fallbackSchedule || DEFAULT_OPENING_HOURS.label,
    };
  }

  const validTypes = ["defined", "always_open", "not_specified"];

  const type = validTypes.includes(openingHours.type)
    ? openingHours.type
    : "not_specified";

  if (type === "always_open") {
    return {
      type: "always_open",
      days: [],
      openTime: null,
      closeTime: null,
      label: openingHours.label || "Abierto 24 horas",
    };
  }

  if (type === "defined") {
    return {
      type: "defined",
      days: Array.isArray(openingHours.days) ? openingHours.days : [],
      openTime: openingHours.openTime || "09:00",
      closeTime: openingHours.closeTime || "18:00",
      label: openingHours.label || fallbackSchedule || "Horario definido",
    };
  }

  return {
    type: "not_specified",
    days: [],
    openTime: null,
    closeTime: null,
    label:
      openingHours.label ||
      fallbackSchedule ||
      "Horario no especificado",
  };
}

function normalizePriceLabel(value = "") {
  return String(value)
    .replace(/\s+/g, " ")
    .replace("–", "-")
    .trim();
}

function findRangeIdByPriceLabel(config, priceLabel) {
  const ranges = Array.isArray(config?.ranges) ? config.ranges : [];

  const normalizedPrice = normalizePriceLabel(priceLabel);

  const foundRange = ranges.find((range) => {
    return normalizePriceLabel(range.label) === normalizedPrice;
  });

  return foundRange?.id || ranges[0]?.id || null;
}

function getRangeLabelById(config, rangeId) {
  const ranges = Array.isArray(config?.ranges) ? config.ranges : [];

  const foundRange = ranges.find((range) => range.id === rangeId);

  return foundRange?.label || "";
}

function normalizeText(value = "") {
  return String(value || "").trim();
}

function normalizeForCompare(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function sameTextValue(oldValue, newValue) {
  return normalizeForCompare(oldValue) === normalizeForCompare(newValue);
}

function arrayIncludesSameText(array = [], value = "") {
  return array.some((item) => sameTextValue(item, value));
}

function arraysHaveSameTextValues(a = [], b = []) {
  const cleanA = Array.isArray(a) ? a.filter(Boolean) : [];
  const cleanB = Array.isArray(b) ? b.filter(Boolean) : [];

  if (cleanA.length !== cleanB.length) return false;

  return cleanA.every((item) => {
    return cleanB.some((otherItem) => sameTextValue(item, otherItem));
  });
}

function getCorrectionValidationErrors({
  returnFields,
  oldPlace,
  name,
  description,
  tag,
  subtags,
  approaches,
  priceRange,
  openingHours,
  selectedTagHasNoApproaches,
}) {
  const errors = [];

  if (returnFields.name?.selected) {
    if (!isValidName(name)) {
      errors.push("El nombre debe tener al menos 3 caracteres.");
    } else if (sameTextValue(oldPlace.name, name)) {
      errors.push(
        "El nuevo nombre debe ser diferente al nombre señalado en la corrección."
      );
    }
  }

  if (returnFields.description?.selected) {
    if (!isValidDescription(description)) {
      errors.push("La descripción debe tener al menos 80 caracteres.");
    } else if (sameTextValue(oldPlace.description, description)) {
      errors.push(
        "La nueva descripción debe ser diferente a la descripción señalada en la corrección."
      );
    }
  }

  if (returnFields.tag?.selected) {
    if (!Array.isArray(tag) || tag.length === 0) {
      errors.push("Selecciona una nueva etiqueta.");
    } else if (arraysHaveSameTextValues(oldPlace.tag, tag)) {
      errors.push(
        "La nueva etiqueta debe ser diferente a la etiqueta señalada en la corrección."
      );
    }
  }

  if (returnFields.subtags?.selected) {
    const reviewedLabels = getSelectedReturnedSubtagLabels(returnFields);
    const blockedSubtags =
      reviewedLabels.length > 0 ? reviewedLabels : oldPlace.subtags;

    if (!Array.isArray(subtags) || subtags.length === 0) {
      errors.push("Selecciona nuevas subetiquetas.");
    }

    const repeatedSubtag = subtags.some((subtag) =>
      arrayIncludesSameText(blockedSubtags, subtag)
    );

    if (repeatedSubtag) {
      errors.push(
        "Las subetiquetas corregidas no pueden repetirse en el reenvío."
      );
    }
  }

  if (returnFields.approaches?.selected && !selectedTagHasNoApproaches) {
    if (!Array.isArray(approaches) || approaches.length === 0) {
      errors.push("Selecciona un nuevo enfoque.");
    } else if (arraysHaveSameTextValues(oldPlace.approaches, approaches)) {
      errors.push(
        "El nuevo enfoque debe ser diferente al enfoque señalado en la corrección."
      );
    }
  }

  if (returnFields.price?.selected) {
    if (!normalizeText(priceRange)) {
      errors.push("Selecciona un nuevo rango de precio.");
    } else if (sameTextValue(oldPlace.priceRange, priceRange)) {
      errors.push(
        "El nuevo rango de precio debe ser diferente al señalado en la corrección."
      );
    }
  }

  if (returnFields.schedule?.selected) {
    if (!isValidOpeningHoursForCorrection(openingHours)) {
      errors.push("Ingresa un horario válido.");
    } else if (!openingHoursAreDifferent(oldPlace.openingHours, openingHours)) {
      errors.push(
        "El nuevo horario debe ser diferente al horario señalado en la corrección."
      );
    }
  }

  return errors;
}

function filterOptionsByBlockedLabels(options = [], blockedLabels = []) {
  const blockedSet = new Set(
    blockedLabels.map((label) => normalizeForCompare(label))
  );

  return options.filter((option) => {
    return !blockedSet.has(normalizeForCompare(option.label));
  });
}

function getFirstPendingMessage(checks = []) {
  const firstInvalid = checks.find((check) => !check.valid);

  return firstInvalid?.message || "Aún faltan correcciones por realizar.";
}

function removeUndefinedFields(object = {}) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
}

function arraysAreDifferent(a = [], b = []) {
  const cleanA = Array.isArray(a) ? a.filter(Boolean) : [];
  const cleanB = Array.isArray(b) ? b.filter(Boolean) : [];

  if (cleanA.length !== cleanB.length) return true;

  return cleanA.some((item, index) => item !== cleanB[index]);
}

function hasTextChanged(oldValue, newValue) {
  return normalizeText(oldValue) !== normalizeText(newValue);
}

function normalizeDaysForCompare(days = []) {
  if (!Array.isArray(days)) return [];

  return [...days].filter(Boolean).sort();
}

function openingHoursAreDifferent(oldOpeningHours, newOpeningHours) {
  const oldValue = normalizeOpeningHours(oldOpeningHours);
  const newValue = normalizeOpeningHours(newOpeningHours);

  if (oldValue.type !== newValue.type) return true;

  if (oldValue.openTime !== newValue.openTime) return true;
  if (oldValue.closeTime !== newValue.closeTime) return true;

  const oldDays = normalizeDaysForCompare(oldValue.days);
  const newDays = normalizeDaysForCompare(newValue.days);

  if (oldDays.length !== newDays.length) return true;

  return oldDays.some((day, index) => day !== newDays[index]);
}

function isValidOpeningHoursForCorrection(openingHours) {
  if (!openingHours || typeof openingHours !== "object") return false;

  if (openingHours.type === "always_open") return true;

  if (openingHours.type === "defined") {
    const hasDays =
      Array.isArray(openingHours.days) && openingHours.days.length > 0;

    const hasTimes = Boolean(openingHours.openTime && openingHours.closeTime);

    const timesAreDifferent = openingHours.openTime !== openingHours.closeTime;

    return hasDays && hasTimes && timesAreDifferent;
  }

  return false;
}

function isValidName(value) {
  return normalizeText(value).length >= 3;
}

function isValidDescription(value) {
  return normalizeText(value).length >= 80;
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function getSelectedReturnedSubtagLabels(returnFields = {}) {
  const items = Array.isArray(returnFields?.subtags?.items)
    ? returnFields.subtags.items
    : [];

  return items
    .filter((item) => item?.selected)
    .map((item) => item.label)
    .filter(Boolean);
}

function reviewedSubtagsWereChanged({
  oldSubtags = [],
  newSubtags = [],
  returnFields = {},
}) {
  const reviewedLabels = getSelectedReturnedSubtagLabels(returnFields);

  if (reviewedLabels.length === 0) {
    return arraysAreDifferent(oldSubtags, newSubtags);
  }

  const removedReviewedLabels = reviewedLabels.every((label) => {
    return !newSubtags.some((subtag) => sameTextValue(subtag, label));
  });

  return removedReviewedLabels && arraysAreDifferent(oldSubtags, newSubtags);
}

function buildSinglePill(value) {
  if (!value) return [];

  return [value];
}

function mapCatalogToOptions(items = []) {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item?.isActive !== false)
    .sort((a, b) => {
      const orderA = Number.isFinite(a?.sortOrder) ? a.sortOrder : 999;
      const orderB = Number.isFinite(b?.sortOrder) ? b.sortOrder : 999;

      return orderA - orderB;
    })
    .map((item) => ({
      id: item.id,
      label: item.label || item.name || "Sin nombre",
      raw: item,
    }));
}

function getPhotoUrl(photo = {}) {
  if (!photo) return null;

  if (typeof photo === "string") return photo;

  return (
    photo.previewURL ||
    photo.thumbnailUrl ||
    photo.thumbnail?.url ||
    photo.displayUrl ||
    photo.mediumUrl ||
    photo.medium?.url ||
    photo.originalUrl ||
    photo.original?.url ||
    photo.thumbnailURL ||
    photo.mediumURL ||
    photo.downloadURL ||
    photo.url ||
    photo.imageUrl ||
    photo.fullUrl ||
    photo.uri ||
    photo.src ||
    null
  );
}

function getPhotoId(photo = {}, index = 0) {
  if (!photo || typeof photo === "string") {
    return `photo_${index + 1}`;
  }

  return (
    photo.photoId ||
    photo.raw?.photoId ||
    photo.id ||
    `photo_${index + 1}`
  );
}

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 6;

function getReviewedPhotos(oldPlace = {}) {
  return Array.isArray(oldPlace.photos)
    ? oldPlace.photos.filter((photo) => photo.selected)
    : [];
}

function getFinalPhotosCount({ oldPhotos = [], photoCorrections = {} }) {
  const deletedCount = Object.values(photoCorrections).filter(
    (correction) => correction?.type === "delete"
  ).length;

  return oldPhotos.length - deletedCount;
}

function reviewedPhotosWereResolved({ oldPlace, photoCorrections }) {
  const reviewedPhotos = getReviewedPhotos(oldPlace);

  if (reviewedPhotos.length === 0) return false;

  return reviewedPhotos.every((photo) => {
    const correction = photoCorrections[photo.id];

    return correction?.type === "replace" || correction?.type === "delete";
  });
}

function normalizePhotosForEdit({ photos = [], photosField }) {
  const needsPhotosReview = Boolean(photosField?.selected);

  if (!Array.isArray(photos) || photos.length === 0) {
    return [];
  }

  const photoItems = Array.isArray(photosField?.items)
    ? photosField.items
    : [];

  return photos.map((photo, index) => {
    const photoId = getPhotoId(photo, index);

    const returnItem = photoItems.find((item) => {
      const itemIndexMatches = Number(item.index) === index;
      const itemUrl = item.url || "";
      const photoUrl = getPhotoUrl(photo) || "";

      return itemIndexMatches || itemUrl === photoUrl;
    });

    const isPhotoSelected = needsPhotosReview
      ? returnItem
        ? Boolean(returnItem.selected)
        : true
      : false;

    return {
      id: photoId,
      index,
      label: `Foto ${index + 1}`,
      url: getPhotoUrl(photo),
      selected: isPhotoSelected,
      message: isPhotoSelected
        ? returnItem?.message ||
          photosField?.message ||
          "Esta foto requiere revisión."
        : "",
      raw: photo,
    };
  });
}

function getSubtagSlotKey(index) {
  return `slot_${index}`;
}

function getIndexFromSubtagSlotKey(key = "") {
  const value = String(key).replace("slot_", "");
  const index = Number(value);

  return Number.isInteger(index) ? index : -1;
}

function getOldSubtagIndexFromItem(item = {}, oldSubtags = []) {
  if (Number.isInteger(Number(item?.oldIndex))) {
    return Number(item.oldIndex);
  }

  if (item?.oldLabel) {
    const foundIndex = oldSubtags.findIndex((subtag) =>
      sameTextValue(subtag, item.oldLabel)
    );

    if (foundIndex >= 0) return foundIndex;
  }

  if (item?.label) {
    const foundIndex = oldSubtags.findIndex((subtag) =>
      sameTextValue(subtag, item.label)
    );

    if (foundIndex >= 0) return foundIndex;
  }

  const rawIndex = Number(item?.index);

  if (Number.isInteger(rawIndex)) {
    if (oldSubtags[rawIndex]) return rawIndex;
    if (oldSubtags[rawIndex - 1]) return rawIndex - 1;
  }

  return -1;
}

function getOldSubtagLabelFromItem(item = {}, oldSubtags = []) {
  if (item?.oldLabel) return item.oldLabel;

  const index = getOldSubtagIndexFromItem(item, oldSubtags);

  if (index >= 0) {
    return oldSubtags[index] || "";
  }

  return item?.label || "";
}

function getSubtagKeyFromItem(item = {}, oldSubtags = []) {
  if (item?.correctionKey) return item.correctionKey;

  const index = getOldSubtagIndexFromItem(item, oldSubtags);

  if (index < 0) return "";

  return getSubtagSlotKey(index);
}

function getOldSubtagLabelFromSlotKey(key = "", oldSubtags = []) {
  const index = getIndexFromSubtagSlotKey(key);

  if (index < 0) return "";

  return oldSubtags[index] || "";
}

function buildFinalSubtagsFromCorrections({
  oldSubtags = [],
  rows = [],
  corrections = {},
}) {
  const result = [...oldSubtags];

  rows.forEach((row) => {
    const correction = corrections[row.correctionKey];

    if (!correction) return;

    if (correction.type === "delete") {
      result[row.oldIndex] = null;
      return;
    }

    if (correction.type === "replace") {
      result[row.oldIndex] = correction.label;
    }
  });

  return result.filter(Boolean);
}

function buildReturnedSubtagRows({ returnFields = {}, oldSubtags = [] }) {
  const items = Array.isArray(returnFields?.subtags?.items)
    ? returnFields.subtags.items
    : [];

  const selectedItems = items.filter((item) => item?.selected);

  return selectedItems.map((item, visualIndex) => {
    const itemIndex = Number(item?.index);

    let oldIndex = -1;

    if (Number.isInteger(itemIndex) && oldSubtags[itemIndex]) {
      oldIndex = itemIndex;
    } else if (Number.isInteger(itemIndex) && oldSubtags[itemIndex - 1]) {
      oldIndex = itemIndex - 1;
    } else if (item?.label) {
      oldIndex = oldSubtags.findIndex((subtag) =>
        sameTextValue(subtag, item.label)
      );
    }

    if (oldIndex < 0) {
      oldIndex = visualIndex;
    }

    const oldLabel =
      oldSubtags[oldIndex] ||
      item?.label ||
      `Subetiqueta ${visualIndex + 1}`;

    return {
      id: `slot_${visualIndex}`,
      correctionKey: `slot_${visualIndex}`,
      oldIndex,
      oldLabel,
      message: item?.message || "Esta subetiqueta requiere corrección.",
      raw: item,
    };
  });
}

function getMapLabel(location) {
  if (!location?.latitude || !location?.longitude) {
    return "ubicación";
  }

  return `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`;
}

function buildEditSources({ editData, initialPlace }) {
  const currentData = editData?.currentData || editData?.submission || null;
  const snapshotBeforeReturn = editData?.snapshotBeforeReturn || null;

  const oldSource = snapshotBeforeReturn || currentData || FALLBACK_PLACE;
  const newSource = currentData || snapshotBeforeReturn || FALLBACK_PLACE;

  const returnFields = {
    ...EMPTY_RETURN_FIELDS,
    ...(editData?.returnFields || {}),
  };

  const oldTag = buildSinglePill(
    oldSource.tagLabel || oldSource.tag || initialPlace?.tag
  );

  const newTag = buildSinglePill(
    newSource.tagLabel || newSource.tag || initialPlace?.tag
  );

  const oldPhotos = normalizePhotosForEdit({
    photos: oldSource.photos,
    photosField: returnFields.photos,
  });

  const newPhotos = normalizePhotosForEdit({
    photos: newSource.photos,
    photosField: returnFields.photos,
  });

  const oldOpeningHours = normalizeOpeningHours(
    oldSource.openingHours,
    oldSource.schedule
  );

  const newOpeningHours = normalizeOpeningHours(
    newSource.openingHours,
    newSource.schedule
  );

  return {
    oldPlace: {
      name: oldSource.name || initialPlace?.name || "",
      description: oldSource.description || "",
      tagId: oldSource.tagId || null,
      tag: oldTag,
      subtags: toArray(oldSource.subtags),
      approaches: toArray(oldSource.approaches),
      priceRange: oldSource.price || oldSource.priceLabel || "",
      openingHours: oldOpeningHours,
      schedule: oldOpeningHours.label,
      photos: oldPhotos.length > 0 ? oldPhotos : newPhotos,
      mapLabel: getMapLabel(oldSource.location),
      location: oldSource.location || null,
    },

    newPlace: {
      name: newSource.name || initialPlace?.name || "",
      description: newSource.description || "",
      tagId: newSource.tagId || oldSource.tagId || null,
      tag: newTag,
      subtags: toArray(newSource.subtags),
      approaches: toArray(newSource.approaches),
      priceRange: newSource.price || newSource.priceLabel || "",
      openingHours: newOpeningHours,
      schedule: newOpeningHours.label,
      photos: newPhotos.length > 0 ? newPhotos : oldPhotos,
      mapLabel: getMapLabel(newSource.location),
      location: newSource.location || null,
    },

    returnFields,

    generalMessage: editData?.activeReturn?.generalMessage || "",
  };
}

export default function EditAddedPlacesScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    placeId,
    initialPlace,
    shouldFetchReturnedEditData = false,
  } = route.params || {};

  const [loadingEditData, setLoadingEditData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editDataError, setEditDataError] = useState(null);

  const [name, setName] = useState(FALLBACK_PLACE.name);
  const [description, setDescription] = useState(FALLBACK_PLACE.description);
  const [priceRange, setPriceRange] = useState(FALLBACK_PLACE.priceRange);
  const [openingHours, setOpeningHours] = useState(DEFAULT_OPENING_HOURS);

  const [tag, setTag] = useState(FALLBACK_PLACE.tag);
  const [subtags, setSubtags] = useState(FALLBACK_PLACE.subtags);
  const [subtagCorrections, setSubtagCorrections] = useState({});
  const [activeSubtagCorrectionKey, setActiveSubtagCorrectionKey] =
  useState(null);
  const [activeSubtagItem, setActiveSubtagItem] = useState(null);
  const [approaches, setApproaches] = useState(FALLBACK_PLACE.approaches);

  const [selectedTagId, setSelectedTagId] = useState(null);

  const [tagOptions, setTagOptions] = useState([]);
  const [subtagOptions, setSubtagOptions] = useState([]);
  const [approachOptions, setApproachOptions] = useState([]);
  const [loadingCatalogs, setLoadingCatalogs] = useState(false);

  const [activeOptionModal, setActiveOptionModal] = useState(null);
  const [editingFields, setEditingFields] = useState({});

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [selectedPriceRangeId, setSelectedPriceRangeId] = useState(null);
  const [isFreePrice, setIsFreePrice] = useState(false);

  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);

  const [photoCorrections, setPhotoCorrections] = useState({});
  const [editedLocation, setEditedLocation] = useState(null);

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [deleteSubtagModalVisible, setDeleteSubtagModalVisible] = useState(false);
const [pendingDeleteSubtagRow, setPendingDeleteSubtagRow] = useState(null);

  const editSources = useMemo(
    () =>
      buildEditSources({
        editData,
        initialPlace,
      }),
    [editData, initialPlace]
  );

  const { oldPlace, newPlace, returnFields, generalMessage } = editSources;

  const returnedSubtagRows = useMemo(() => {
  return buildReturnedSubtagRows({
    returnFields,
    oldSubtags: oldPlace.subtags,
  });
}, [returnFields, oldPlace.subtags]);

  const selectedTagLabel = tag?.[0] || "";

  const selectedTagOption = tagOptions.find((option) => {
    const matchesById = option.id === selectedTagId;
    const matchesByLabel = option.label === selectedTagLabel;

    return matchesById || matchesByLabel;
  });

  const resolvedSelectedTagId = selectedTagOption?.id || selectedTagId;

  const handleDeleteSubtag = (row) => {
  if (!row?.correctionKey) return;

  setPendingDeleteSubtagRow(row);
  setDeleteSubtagModalVisible(true);
};

const handleCloseDeleteSubtagModal = () => {
  setDeleteSubtagModalVisible(false);
  setPendingDeleteSubtagRow(null);
};

const confirmDeleteSubtag = () => {
  const row = pendingDeleteSubtagRow;

  if (!row?.correctionKey) {
    setDeleteSubtagModalVisible(false);
    setPendingDeleteSubtagRow(null);
    return;
  }

  setSubtagCorrections((prev) => {
    const nextCorrections = {
      ...prev,
      [row.correctionKey]: {
        type: "delete",
        oldLabel: row.oldLabel,
        oldIndex: row.oldIndex,
      },
    };

    const nextSubtags = buildFinalSubtagsFromCorrections({
      oldSubtags: oldPlace.subtags,
      rows: returnedSubtagRows,
      corrections: nextCorrections,
    });

    if (nextSubtags.length <= 0) {
      Alert.alert(
        "No puedes eliminarla",
        "La propuesta debe conservar al menos una subetiqueta."
      );

      return prev;
    }

    setEditingFields((current) => ({
      ...current,
      subtags: true,
    }));

    setSubtags(nextSubtags);

    return nextCorrections;
  });

  setDeleteSubtagModalVisible(false);
  setPendingDeleteSubtagRow(null);
};

  const selectedTagHasNoApproaches =
    tagDoesNotUseApproaches(resolvedSelectedTagId);

  const selectedTagPriceConfig =
    selectedTagOption?.raw?.priceConfig ||
    selectedTagOption?.raw?.price ||
    null;

  const reviewedSubtagLabels = getSelectedReturnedSubtagLabels(returnFields);

  const blockedTagLabels = returnFields.tag?.selected ? oldPlace.tag : [];

  const filteredTagOptions = filterOptionsByBlockedLabels(
    tagOptions,
    blockedTagLabels
  );

  const blockedSubtagLabels =
    returnFields.subtags?.selected && reviewedSubtagLabels.length > 0
      ? reviewedSubtagLabels
      : returnFields.subtags?.selected
        ? oldPlace.subtags
        : [];

  const filteredSubtagOptions = filterOptionsByBlockedLabels(
    subtagOptions,
    blockedSubtagLabels
  );

  const blockedApproachLabels = returnFields.approaches?.selected
    ? oldPlace.approaches
    : [];

  const filteredApproachOptions = filterOptionsByBlockedLabels(
    approachOptions,
    blockedApproachLabels
  );

  const requiredReviewChecks = useMemo(() => {
    const checks = [];

    if (returnFields.name?.selected) {
      checks.push({
        field: "name",
        valid:
          Boolean(editingFields.name) &&
          isValidName(name) &&
          !sameTextValue(oldPlace.name, name),
        message:
          "El nuevo nombre debe ser diferente al nombre señalado en la corrección.",
      });
    }

    if (returnFields.description?.selected) {
      checks.push({
        field: "description",
        valid:
          Boolean(editingFields.description) &&
          isValidDescription(description) &&
          !sameTextValue(oldPlace.description, description),
        message:
          "La nueva descripción debe ser diferente a la descripción señalada en la corrección.",
      });
    }

    if (returnFields.tag?.selected) {
      checks.push({
        field: "tag",
        valid:
          Boolean(editingFields.tag) &&
          tag.length > 0 &&
          arraysAreDifferent(oldPlace.tag, tag),
        message:
          "Selecciona una etiqueta diferente a la señalada en la corrección.",
      });
    }

    if (returnFields.subtags?.selected) {
      checks.push({
        field: "subtags",
        valid:
          Boolean(editingFields.subtags) &&
          subtags.length > 0 &&
          reviewedSubtagsWereChanged({
            oldSubtags: oldPlace.subtags,
            newSubtags: subtags,
            returnFields,
          }),
        message: "Cambia las subetiquetas señaladas por otras diferentes.",
      });
    }

    if (returnFields.approaches?.selected) {
      if (!selectedTagHasNoApproaches) {
        checks.push({
          field: "approaches",
          valid:
            Boolean(editingFields.approaches) &&
            approaches.length > 0 &&
            arraysAreDifferent(oldPlace.approaches, approaches),
          message:
            "Selecciona un enfoque diferente al señalado en la corrección.",
        });
      }
    }

    if (returnFields.price?.selected) {
      checks.push({
        field: "price",
        valid:
          Boolean(editingFields.price) &&
          normalizeText(priceRange).length > 0 &&
          !sameTextValue(oldPlace.priceRange, priceRange),
        message:
          "Selecciona un rango de precio diferente al señalado en la corrección.",
      });
    }

    if (returnFields.schedule?.selected) {
      checks.push({
        field: "schedule",
        valid:
          Boolean(editingFields.schedule) &&
          isValidOpeningHoursForCorrection(openingHours) &&
          openingHoursAreDifferent(oldPlace.openingHours, openingHours),
        message:
          "El nuevo horario debe ser diferente al horario señalado en la corrección.",
      });
    }

    if (returnFields.photos?.selected) {
  const finalPhotosCount = getFinalPhotosCount({
    oldPhotos: oldPlace.photos,
    photoCorrections,
  });

  const allReviewedPhotosResolved = reviewedPhotosWereResolved({
    oldPlace,
    photoCorrections,
  });

  checks.push({
    field: "photos",
    valid:
      allReviewedPhotosResolved &&
      finalPhotosCount >= MIN_PHOTOS &&
      finalPhotosCount <= MAX_PHOTOS,
    message:
      finalPhotosCount < MIN_PHOTOS
        ? "La propuesta debe conservar al menos 3 fotos."
        : finalPhotosCount > MAX_PHOTOS
          ? "La propuesta no puede tener más de 6 fotos."
          : "Cambia o elimina las fotos marcadas para revisión.",
  });
}
    if (returnFields.location?.selected) {
      checks.push({
        field: "location",
        valid: Boolean(editedLocation),
        message: "Ajusta la ubicación en el mapa.",
      });
    }

    return checks;
  }, [
    returnFields,
    editingFields,
    name,
    description,
    tag,
    subtags,
    approaches,
    priceRange,
    openingHours,
    oldPlace,
    photoCorrections,
    editedLocation,
    selectedTagHasNoApproaches,
  ]);

  const pendingReviewChecks = requiredReviewChecks.filter(
    (check) => !check.valid
  );

  const canSubmitAgain =
    requiredReviewChecks.length > 0 && pendingReviewChecks.length === 0;

  useEffect(() => {
    if (!placeId) return;

    const shouldLoad = Boolean(shouldFetchReturnedEditData);

    if (!shouldLoad) return;

    let isMounted = true;

    setLoadingEditData(true);
    setEditDataError(null);

    getReturnedPlaceSubmissionEditDataService(placeId)
      .then((data) => {
        if (!isMounted) return;

        console.log("Datos de edición devuelta:", data);

        setEditData(data);
      })
      .catch((error) => {
        if (!isMounted) return;

        console.log("Error al cargar datos de edición devuelta:", {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
          baseURL: error.config?.baseURL,
          message: error.message,
        });

        setEditDataError(error);
      })
      .finally(() => {
        if (!isMounted) return;

        setLoadingEditData(false);
      });

    return () => {
      isMounted = false;
    };
  }, [placeId, shouldFetchReturnedEditData]);

  useEffect(() => {
    let isMounted = true;

    setLoadingCatalogs(true);

    getTagsService()
      .then((tags) => {
        if (!isMounted) return;

        setTagOptions(mapCatalogToOptions(tags));
      })
      .catch((error) => {
        console.log("Error al cargar etiquetas:", error);
      })
      .finally(() => {
        if (!isMounted) return;

        setLoadingCatalogs(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setName(newPlace.name);
    setDescription(newPlace.description);
    setPriceRange(newPlace.priceRange);
    setOpeningHours(newPlace.openingHours || DEFAULT_OPENING_HOURS);

    setTag(newPlace.tag);
    setSubtags(newPlace.subtags);
    setApproaches(newPlace.approaches);

    setSelectedTagId(newPlace.tagId || oldPlace.tagId || null);
  }, [
    newPlace.name,
    newPlace.description,
    newPlace.priceRange,
    newPlace.openingHours,
    newPlace.tag,
    newPlace.subtags,
    newPlace.approaches,
    newPlace.tagId,
    oldPlace.tagId,
  ]);

  useEffect(() => {
    if (!selectedTagId) {
      setSubtagOptions([]);
      setApproachOptions([]);
      return;
    }

    let isMounted = true;

    setLoadingCatalogs(true);

    Promise.all([
      getSubtagsByTagId(selectedTagId),
      getApproachesByTagId(selectedTagId),
    ])
      .then(([subtagsResult, approachesResult]) => {
        if (!isMounted) return;

        setSubtagOptions(mapCatalogToOptions(subtagsResult));
        setApproachOptions(mapCatalogToOptions(approachesResult));
      })
      .catch((error) => {
        console.log("Error al cargar subetiquetas/enfoques:", error);
      })
      .finally(() => {
        if (!isMounted) return;

        setLoadingCatalogs(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedTagId]);

  useEffect(() => {
    if (!selectedTagPriceConfig) return;

    const nextRangeId = findRangeIdByPriceLabel(
      selectedTagPriceConfig,
      priceRange || newPlace.priceRange
    );

    setSelectedPriceRangeId(nextRangeId);
    setIsFreePrice(priceRange === "Gratis");
  }, [selectedTagPriceConfig, priceRange, newPlace.priceRange]);

  const handleClose = () => {
    navigation.goBack();
  };

  const clearFieldValue = (fieldKey) => {
    switch (fieldKey) {
      case "name":
        setName("");
        break;

      case "description":
        setDescription("");
        break;

      case "price":
        setPriceRange("");
        break;

      default:
        break;
    }
  };

  const handleEditField = (fieldKey) => {
    setEditingFields((prev) => {
      const isCurrentlyEditing = Boolean(prev[fieldKey]);
      const nextIsEditing = !isCurrentlyEditing;

      if (nextIsEditing) {
        clearFieldValue(fieldKey);
      }

      return {
        ...prev,
        [fieldKey]: nextIsEditing,
      };
    });
  };

  function normalizePhotoKey(value = "") {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");
  }

  function getPhotoIndexFromKey(value = "") {
    const match = String(value).match(/\d+/);

    if (!match) return -1;

    return Number(match[0]) - 1;
  }

  function findOldPhotoIndexByReplacementKey({ photos = [], oldPhotoId }) {
    const normalizedOldPhotoId = normalizePhotoKey(oldPhotoId);

    const directIndex = photos.findIndex((photo) => {
      const candidates = [
        photo.id,
        photo.photoId,
        photo.raw?.photoId,
        photo.raw?.id,
        photo.raw?.original?.fileName,
        photo.raw?.medium?.fileName,
        photo.raw?.thumbnail?.fileName,
        photo.raw?.fileName,
      ].filter(Boolean);

      return candidates.some(
        (candidate) => normalizePhotoKey(candidate) === normalizedOldPhotoId
      );
    });

    if (directIndex >= 0) {
      return directIndex;
    }

    const indexFromKey = getPhotoIndexFromKey(oldPhotoId);

    if (indexFromKey >= 0 && indexFromKey < photos.length) {
      return indexFromKey;
    }

    return -1;
  }

const uploadCorrectedPhotos = async () => {
  const entries = Object.entries(photoCorrections);

  if (entries.length === 0) return [];

  const returnId = editData?.activeReturn?.returnId;

  if (!returnId) {
    throw new Error("Falta returnId para subir fotos corregidas.");
  }

  const uploadedPhotoOperations = await Promise.all(
    entries.map(async ([oldPhotoId, correction]) => {
      const photoIndex = findOldPhotoIndexByReplacementKey({
        photos: oldPlace.photos,
        oldPhotoId,
      });

      if (photoIndex < 0) {
        throw new Error(`No se encontró la foto original: ${oldPhotoId}`);
      }

      const oldPhoto = oldPlace.photos[photoIndex];

      if (correction?.type === "delete") {
        return {
          type: "delete",
          oldPhotoId,
          photoIndex,
          oldPhoto,
        };
      }

      if (correction?.type === "replace") {
        const uploadedPhoto = await uploadCorrectedSubmissionPhotoService({
          submissionId: placeId,
          returnId,
          oldPhoto,
          newPhoto: correction.photo,
          photoIndex,
        });

        return {
          type: "replace",
          oldPhotoId,
          photoIndex,
          oldPhoto,
          photo: uploadedPhoto,
        };
      }

      return null;
    })
  );

  return uploadedPhotoOperations.filter(Boolean);
};

const handleOpenScheduleModal = () => {
  setEditingFields((prev) => ({
    ...prev,
    schedule: true,
  }));

  setScheduleModalVisible(true);
};

  const handleCloseScheduleModal = () => {
    setScheduleModalVisible(false);
  };

  const handleApplyOpeningHours = (nextOpeningHours) => {
    if (
      returnFields.schedule?.selected &&
      !openingHoursAreDifferent(oldPlace.openingHours, nextOpeningHours)
    ) {
      Alert.alert(
        "Horario no válido",
        "Debes ingresar un horario diferente al señalado en la corrección."
      );
      return;
    }

    setOpeningHours(nextOpeningHours);

    setEditingFields((prev) => ({
      ...prev,
      schedule: true,
    }));
  };

 const handleSubmitAgain = async () => {
  const correctionErrors = getCorrectionValidationErrors({
    returnFields,
    oldPlace,
    name,
    description,
    tag,
    subtags,
    approaches,
    priceRange,
    openingHours,
    selectedTagHasNoApproaches,
  });

  if (correctionErrors.length > 0) {
    Alert.alert("Corrección incompleta", correctionErrors[0]);
    return;
  }

  if (!canSubmitAgain) {
    console.log("Aún faltan correcciones:", pendingReviewChecks);

    Alert.alert(
      "Corrección incompleta",
      getFirstPendingMessage(pendingReviewChecks)
    );

    return;
  }

  if (submitting) return;

  try {
    setSubmitting(true);

    const uploadedReplacementPhotos = returnFields.photos?.selected
      ? await uploadCorrectedPhotos()
      : [];

    const correctedFields = removeUndefinedFields({
      name: returnFields.name?.selected ? normalizeText(name) : undefined,

      description: returnFields.description?.selected
        ? normalizeText(description)
        : undefined,

      tag: returnFields.tag?.selected
        ? {
            tagId: resolvedSelectedTagId,
            label: tag[0] || null,
          }
        : undefined,

      subtags: returnFields.subtags?.selected ? subtags : undefined,

      approaches: selectedTagHasNoApproaches
        ? null
        : returnFields.approaches?.selected
          ? approaches
          : undefined,

      price: returnFields.price?.selected
        ? normalizeText(priceRange)
        : undefined,

      openingHours: returnFields.schedule?.selected
        ? openingHours
        : undefined,

      location: returnFields.location?.selected ? editedLocation : undefined,

      photos: returnFields.photos?.selected
        ? uploadedReplacementPhotos
        : undefined,
    });

    const payload = {
      placeId,
      returnId: editData?.activeReturn?.returnId || null,
      correctedFields,
    };

    console.log("PAYLOAD FINAL PARA BACKEND:", payload);

    const result = await resubmitReturnedPlaceSubmissionService({
      submissionId: placeId,
      payload,
    });

    console.log("REENVÍO COMPLETADO:", result);

    setSuccessModalVisible(true);
  } catch (error) {
    console.log("Error al reenviar propuesta:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    Alert.alert(
      "Error",
      error?.response?.data?.message ||
        error?.message ||
        "No se pudo reenviar la propuesta."
    );
  } finally {
    setSubmitting(false);
  }
};

  const handleCloseOptionModal = () => {
    setActiveOptionModal(null);
  };

  const handleOpenTagModal = () => {
  setEditingFields((prev) => ({
    ...prev,
    tag: true,
  }));

  setActiveOptionModal("tag");
};

const handleOpenApproachModal = () => {
  setEditingFields((prev) => ({
    ...prev,
    approaches: true,
  }));

  setActiveOptionModal("approaches");
};


const handleOpenSubtagModal = (row) => {
  if (!row?.correctionKey) return;

  console.log("EDITANDO ROW REAL:", row);

  setActiveSubtagCorrectionKey(row.correctionKey);
  setActiveSubtagItem(row);

  setEditingFields((prev) => ({
    ...prev,
    subtags: true,
  }));

  setActiveOptionModal("subtags");
};

  const handleSelectTag = (option) => {
    if (returnFields.tag?.selected) {
      const oldTagLabel = oldPlace.tag?.[0] || "";

      if (sameTextValue(oldTagLabel, option.label)) {
        Alert.alert(
          "Etiqueta no válida",
          "Debes seleccionar una etiqueta diferente a la señalada en la corrección."
        );
        return;
      }
    }

    const nextTagHasNoApproaches = tagDoesNotUseApproaches(option.id);

    setTag([option.label]);
    setSelectedTagId(option.id);

   setSubtags([]);
    setSubtagCorrections({});
    setActiveSubtagCorrectionKey(null);
    setActiveSubtagItem(null);
    setApproaches([]);

    setEditingFields((prev) => ({
      ...prev,
      tag: true,
      subtags: false,
      approaches: false,
    }));

    if (nextTagHasNoApproaches) {
      setApproaches([]);
      setApproachOptions([]);
    }

    setActiveOptionModal(null);
  };


  const handleSelectSubtag = (option) => {
  if (!selectedTagId) {
    console.log("Selecciona primero una etiqueta.");
    return;
  }

  const row = activeSubtagItem;

  if (!row?.correctionKey) {
    console.log("No hay subetiqueta activa para corregir.");
    return;
  }

  if (sameTextValue(row.oldLabel, option.label)) {
    Alert.alert(
      "Subetiqueta no válida",
      "Debes seleccionar una subetiqueta diferente a la señalada en la corrección."
    );
    return;
  }

  setEditingFields((prev) => ({
    ...prev,
    subtags: true,
  }));

  setSubtagCorrections((prev) => {
    const nextCorrections = {
      ...prev,
      [row.correctionKey]: {
        type: "replace",
        oldLabel: row.oldLabel,
        oldIndex: row.oldIndex,
        label: option.label,
      },
    };

    const nextSubtags = buildFinalSubtagsFromCorrections({
      oldSubtags: oldPlace.subtags,
      rows: returnedSubtagRows,
      corrections: nextCorrections,
    });

    const hasDuplicate = nextSubtags.some((subtag, index) => {
      return nextSubtags.some(
        (otherSubtag, otherIndex) =>
          index !== otherIndex && sameTextValue(subtag, otherSubtag)
      );
    });

    if (hasDuplicate) {
      Alert.alert(
        "Subetiqueta duplicada",
        "No puedes usar la misma subetiqueta dos veces."
      );

      return prev;
    }

    console.log("SUBTAG PINTADA:", {
      row,
      selected: option.label,
      nextCorrections,
      nextSubtags,
    });

    setSubtags(nextSubtags);

    return nextCorrections;
  });

  setActiveOptionModal(null);
  setActiveSubtagCorrectionKey(null);
  setActiveSubtagItem(null);
};

  const handleSelectApproach = (option) => {
    if (!selectedTagId) {
      console.log("Selecciona primero una etiqueta.");
      return;
    }

    if (selectedTagHasNoApproaches) {
      console.log("Esta etiqueta no usa enfoques.");
      setApproaches([]);
      setActiveOptionModal(null);
      return;
    }

    const isBlocked = oldPlace.approaches.some((label) =>
      sameTextValue(label, option.label)
    );

    if (returnFields.approaches?.selected && isBlocked) {
      Alert.alert(
        "Enfoque no válido",
        "Debes seleccionar un enfoque diferente al señalado en la corrección."
      );
      return;
    }

    setApproaches([option.label]);

    setEditingFields((prev) => ({
      ...prev,
      approaches: true,
    }));

    setActiveOptionModal(null);
  };

  const handleOpenPriceModal = () => {
  console.log("DEBUG PRICE MODAL:", {
    selectedTagId,
    tag,
    tagOptions,
    selectedTagOption,
    selectedTagPriceConfig,
  });

  if (!selectedTagPriceConfig) {
    console.log("No hay configuración de precio para esta etiqueta.");
    return;
  }

  const currentRangeId = findRangeIdByPriceLabel(
    selectedTagPriceConfig,
    priceRange || oldPlace.priceRange
  );

  setEditingFields((prev) => ({
    ...prev,
    price: true,
  }));

  setSelectedPriceRangeId(currentRangeId);
  setPriceModalVisible(true);
};

  const handleClosePriceModal = () => {
    setPriceModalVisible(false);
  };

 const handleChangePriceRangeId = (rangeId) => {
  const nextPriceLabel = getRangeLabelById(selectedTagPriceConfig, rangeId);

  setSelectedPriceRangeId(rangeId);
  setIsFreePrice(false);
  setPriceRange(nextPriceLabel);

  setEditingFields((prev) => ({
    ...prev,
    price: true,
  }));
};

const handleToggleFreePrice = () => {
  setIsFreePrice((prev) => {
    const nextIsFree = !prev;

    const nextPriceLabel = nextIsFree
      ? "Gratis"
      : getRangeLabelById(selectedTagPriceConfig, selectedPriceRangeId);

    setPriceRange(nextPriceLabel);

    setEditingFields((current) => ({
      ...current,
      price: true,
    }));

    return nextIsFree;
  });
};
  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };

  return (
    <LayoutScreen
      padding={{ top: 16, left: 16, right: 16, bottom: 16 }}
      bg="#538DE4"
      edges={["top"]}
    >
      <View style={styles.screenCard}>
        <EditHeader title="Revisión requerida" onClose={handleClose} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {loadingEditData ? (
            <Text style={styles.stateText}>Cargando datos de revisión...</Text>
          ) : null}

          {editDataError ? (
            <Text style={styles.errorText}>
              No se pudieron cargar los datos de revisión.
            </Text>
          ) : null}

          {!!generalMessage && (
            <View style={styles.generalMessageBox}>
              <Text style={styles.generalMessageText}>{generalMessage}</Text>
            </View>
          )}

          <EditableTextField
            label="Nombre"
            newLabel="Nuevo nombre"
            oldValue={oldPlace.name}
            value={name}
            onChangeText={setName}
            placeholder="Nombre del lugar"
            helperText={returnFields.name.message || "Texto"}
            reviewField={returnFields.name}
            isEditing={Boolean(editingFields.name)}
            onPressEdit={() => handleEditField("name")}
            maxLength={30}
            minLength={3}
          />

          <EditableTextField
            label="Descripción"
            newLabel="Nueva descripción"
            oldValue={oldPlace.description}
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción"
            helperText={returnFields.description.message || "Texto"}
            reviewField={returnFields.description}
            isEditing={Boolean(editingFields.description)}
            onPressEdit={() => handleEditField("description")}
            multiline
            maxLength={200}
            minLength={80}
          />

   <EditablePillsField
  label="Etiqueta"
  newLabel="Nueva etiqueta"
  pills={oldPlace.tag}
  newPills={tag}
  helperText={returnFields.tag.message || "Texto"}
  reviewField={returnFields.tag}
  isEditing={Boolean(editingFields.tag)}
  onPressEdit={handleOpenTagModal}
/>

<EditableReturnedSubtagsBox
  label="Subetiquetas"
  rows={returnedSubtagRows}
  reviewField={returnFields.subtags}
  subtagCorrections={subtagCorrections}
  onPressEditItem={handleOpenSubtagModal}
  onPressDeleteItem={handleDeleteSubtag}
/>

<EditablePillsField
  label="Enfoque"
  newLabel="Nuevo enfoque"
  pills={oldPlace.approaches}
  newPills={approaches}
  helperText={returnFields.approaches.message || "Texto"}
  reviewField={returnFields.approaches}
  isEditing={Boolean(editingFields.approaches)}
  onPressEdit={() => setActiveOptionModal("approaches")}
/>

<EditableTextField
  label="Rango de precio"
  newLabel="Nuevo rango"
  oldValue={oldPlace.priceRange}
  value={priceRange}
  onChangeText={setPriceRange}
  placeholder="Rango de precio"
  helperText={returnFields.price.message || "Texto"}
  reviewField={returnFields.price}
  isEditing={Boolean(editingFields.price)}
  onPressEdit={handleOpenPriceModal}
  maxLength={40}
/>

   <EditableTextField
  label="Horario"
  newLabel="Nuevo horario"
  oldValue={oldPlace.schedule}
  value={openingHours?.label || "Horario no especificado"}
  onChangeText={() => {}}
  placeholder="Horario"
  helperText={returnFields.schedule.message || "Texto"}
  reviewField={returnFields.schedule}
  isEditing={Boolean(editingFields.schedule)}
  onPressEdit={handleOpenScheduleModal}
  maxLength={80}
/>

         <EditablePhotosBox
  label="Fotos"
  photos={oldPlace.photos}
  reviewField={returnFields.photos}
  helperText={returnFields.photos.message || "Texto"}
  minPhotos={MIN_PHOTOS}
  maxPhotos={MAX_PHOTOS}
  onChangePhotoCorrections={setPhotoCorrections}
/>

          <EditableMapBox
            label="Mapa"
            newLabel="Mapa nuevo"
            oldLocation={oldPlace.location}
            newLocation={newPlace.location}
            reviewField={returnFields.location}
            helperText={
              returnFields.location.message ||
              "Ajusta el pin al acceso principal del lugar."
            }
            isEditing={Boolean(editingFields.location)}
            onPressEdit={() => handleEditField("location")}
            onChangeLocation={setEditedLocation}
          />

          <SubmitAgainBox
            onSubmit={handleSubmitAgain}
            disabled={submitting}
          />
        </ScrollView>

        <EditableOptionModal
          visible={activeOptionModal === "tag"}
          title="Selecciona una etiqueta"
          options={filteredTagOptions}
          selectedValues={tag}
          multiple={false}
          onSelect={handleSelectTag}
          onClose={handleCloseOptionModal}
        />

        <EditableOptionModal
  visible={activeOptionModal === "subtags"}
  title="Selecciona una nueva subetiqueta"
  options={filteredSubtagOptions}
  selectedValues={
    activeSubtagCorrectionKey
      ? [subtagCorrections[activeSubtagCorrectionKey]?.label].filter(Boolean)
      : []
  }
  multiple={false}
  onSelect={handleSelectSubtag}
  onClose={() => {
    setActiveOptionModal(null);
    setActiveSubtagCorrectionKey(null);
    setActiveSubtagItem(null);
  }}
/>

        <EditableOptionModal
          visible={
            activeOptionModal === "approaches" && !selectedTagHasNoApproaches
          }
          title="Selecciona un enfoque"
          options={filteredApproachOptions}
          selectedValues={approaches}
          multiple={false}
          onSelect={handleSelectApproach}
          onClose={handleCloseOptionModal}
        />

        <EditablePriceModal
          visible={priceModalVisible}
          config={selectedTagPriceConfig}
          selectedRangeId={selectedPriceRangeId}
          isFree={isFreePrice}
          onChangeRangeId={handleChangePriceRangeId}
          onToggleFree={handleToggleFreePrice}
          onClose={handleClosePriceModal}
        />

        <EditableScheduleModal
          visible={scheduleModalVisible}
          value={openingHours}
          onApply={handleApplyOpeningHours}
          onClose={handleCloseScheduleModal}
        />

        <ResubmitSuccessModal
          visible={successModalVisible}
          onClose={handleCloseSuccessModal}
        />

        
      </View>
      <DeleteSubtagWarningModal
  visible={deleteSubtagModalVisible}
  subtagLabel={pendingDeleteSubtagRow?.oldLabel || ""}
  onCancel={handleCloseDeleteSubtagModal}
  onConfirm={confirmDeleteSubtag}
/>
    </LayoutScreen>
  );
}