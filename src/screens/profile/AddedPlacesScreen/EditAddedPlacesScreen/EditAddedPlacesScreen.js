import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";

import {
  EditHeader,
  EditableTextField,
  EditablePillsField,
  EditablePhotosBox,
  EditableMapBox,
  SubmitAgainBox,
  EditableOptionModal,
  EditablePriceModal,
  ResubmitSuccessModal,
} from "./Components";

import getReturnedPlaceSubmissionEditDataService from "../../../../services/api/getReturnedPlaceSubmissionEditData.service";

import { getTagsService } from "../../../../services/firebase/firestore/tags/getTags.service";
import { getSubtagsByTagId } from "../../../../services/firebase/firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "../../../../services/firebase/firestore/approaches/getApproachesByTagId.service";

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

const FALLBACK_PLACE = {
  id: "fallback",
  name: "",
  description: "",
  tag: [],
  subtags: [],
  approaches: [],
  priceRange: "",
  schedule: "?",
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

function arraysAreDifferent(a = [], b = []) {
  const cleanA = Array.isArray(a) ? a.filter(Boolean) : [];
  const cleanB = Array.isArray(b) ? b.filter(Boolean) : [];

  if (cleanA.length !== cleanB.length) return true;

  return cleanA.some((item, index) => item !== cleanB[index]);
}

function hasTextChanged(oldValue, newValue) {
  return normalizeText(oldValue) !== normalizeText(newValue);
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
  if (typeof photo === "string") return photo;

  return (
    photo.previewURL ||
    photo.thumbnailURL ||
    photo.mediumURL ||
    photo.downloadURL ||
    photo.url ||
    photo.imageUrl ||
    photo.uri ||
    null
  );
}

function normalizePhotosForEdit({ photos = [], photosField }) {
  const needsPhotosReview = Boolean(photosField?.selected);

  if (!Array.isArray(photos) || photos.length === 0) {
    return [];
  }

  return photos.map((photo, index) => ({
    id: photo.id || photo.fileName || `photo-${index + 1}`,
    label: `Foto${index + 1}`,
    url: getPhotoUrl(photo),
    selected: needsPhotosReview,
    message: needsPhotosReview
      ? photosField?.message || "Esta foto requiere revisión."
      : "",
    raw: photo,
  }));
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

  return {
        oldPlace: {
        name: oldSource.name || initialPlace?.name || "",
        description: oldSource.description || "",
        tagId: oldSource.tagId || null,
        tag: oldTag,
        subtags: toArray(oldSource.subtags),
        approaches: toArray(oldSource.approaches),
        priceRange: oldSource.price || oldSource.priceLabel || "",
        schedule: oldSource.schedule || "?",
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
        schedule: newSource.schedule || "?",
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
    source,
    shouldFetchReturnedEditData = false,
  } = route.params || {};

  const [loadingEditData, setLoadingEditData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editDataError, setEditDataError] = useState(null);

  const [name, setName] = useState(FALLBACK_PLACE.name);
  const [description, setDescription] = useState(FALLBACK_PLACE.description);
  const [priceRange, setPriceRange] = useState(FALLBACK_PLACE.priceRange);
  const [schedule, setSchedule] = useState(FALLBACK_PLACE.schedule);

  const [tag, setTag] = useState(FALLBACK_PLACE.tag);
  const [subtags, setSubtags] = useState(FALLBACK_PLACE.subtags);
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

  const [replacementPhotos, setReplacementPhotos] = useState({});
  const [editedLocation, setEditedLocation] = useState(null);

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const editSources = useMemo(
    () =>
      buildEditSources({
        editData,
        initialPlace,
      }),
    [editData, initialPlace]
  );

  const { oldPlace, newPlace, returnFields, generalMessage } = editSources;

  const selectedTagLabel = tag?.[0] || "";

const selectedTagOption = tagOptions.find((option) => {
  const matchesById = option.id === selectedTagId;
  const matchesByLabel = option.label === selectedTagLabel;

  return matchesById || matchesByLabel;
});

const resolvedSelectedTagId = selectedTagOption?.id || selectedTagId;

const selectedTagHasNoApproaches =
  tagDoesNotUseApproaches(resolvedSelectedTagId);

const selectedTagPriceConfig =
  selectedTagOption?.raw?.priceConfig ||
  selectedTagOption?.raw?.price ||
  null;

  const approachPillsToShow = selectedTagHasNoApproaches

  ? ["Sin enfoque"]
  : approaches;

 const requiredReviewChecks = useMemo(() => {
  const checks = [];

  if (returnFields.name?.selected) {
    checks.push({
      field: "name",
      valid:
        Boolean(editingFields.name) &&
        isValidName(name) &&
        hasTextChanged(oldPlace.name, name),
      message: "Corrige el nombre.",
    });
  }

  if (returnFields.description?.selected) {
    checks.push({
      field: "description",
      valid:
        Boolean(editingFields.description) &&
        isValidDescription(description) &&
        hasTextChanged(oldPlace.description, description),
      message: "Corrige la descripción.",
    });
  }

  if (returnFields.tag?.selected) {
    checks.push({
      field: "tag",
      valid:
        Boolean(editingFields.tag) &&
        tag.length > 0 &&
        arraysAreDifferent(oldPlace.tag, tag),
      message: "Selecciona una nueva etiqueta.",
    });
  }

  if (returnFields.subtags?.selected) {
    checks.push({
      field: "subtags",
      valid:
        Boolean(editingFields.subtags) &&
        subtags.length > 0 &&
        arraysAreDifferent(oldPlace.subtags, subtags),
      message: "Selecciona nuevas subetiquetas.",
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
      message: "Selecciona un nuevo enfoque.",
    });
  }
  }

  if (returnFields.price?.selected) {
    checks.push({
      field: "price",
      valid:
        Boolean(editingFields.price) &&
        normalizeText(priceRange).length > 0 &&
        hasTextChanged(oldPlace.priceRange, priceRange),
      message: "Selecciona un nuevo rango de precio.",
    });
  }

  if (returnFields.schedule?.selected) {
    checks.push({
      field: "schedule",
      valid:
        Boolean(editingFields.schedule) &&
        normalizeText(schedule).length > 0 &&
        hasTextChanged(oldPlace.schedule, schedule),
      message: "Corrige el horario.",
    });
  }

  if (returnFields.photos?.selected) {
    const reviewedPhotos = oldPlace.photos.filter((photo) => photo.selected);

    const allReviewedPhotosChanged =
      reviewedPhotos.length > 0 &&
      reviewedPhotos.every((photo) => Boolean(replacementPhotos[photo.id]));

    checks.push({
      field: "photos",
      valid: allReviewedPhotosChanged,
      message: "Cambia las fotos marcadas para revisión.",
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
  schedule,
  oldPlace,
  replacementPhotos,
  editedLocation,
  selectedTagHasNoApproaches,
]);

const pendingReviewChecks = requiredReviewChecks.filter((check) => !check.valid);

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
  setSchedule(newPlace.schedule);

  setTag(newPlace.tag);
  setSubtags(newPlace.subtags);
  setApproaches(newPlace.approaches);

  setSelectedTagId(newPlace.tagId || oldPlace.tagId || null);
}, [
  newPlace.name,
  newPlace.description,
  newPlace.priceRange,
  newPlace.schedule,
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

    case "schedule":
      setSchedule("");
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

 const handleSubmitAgain = () => {
  if (!canSubmitAgain) {
    console.log("Aún faltan correcciones:", pendingReviewChecks);
    return;
  }

  const payload = {
    placeId,
    returnId: editData?.activeReturn?.returnId || null,

    correctedFields: {
      name: returnFields.name?.selected ? name : undefined,

      description: returnFields.description?.selected
        ? description
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

      price: returnFields.price?.selected ? priceRange : undefined,

      schedule: returnFields.schedule?.selected ? schedule : undefined,

      location: returnFields.location?.selected ? editedLocation : undefined,

      photos: returnFields.photos?.selected
        ? Object.entries(replacementPhotos).map(([oldPhotoId, newPhoto]) => ({
            oldPhotoId,
            newPhoto,
          }))
        : undefined,
    },
  };

  console.log("PAYLOAD LISTO PARA REENVIAR:", payload);

  setSuccessModalVisible(true);
};

  const handleCloseOptionModal = () => {
    setActiveOptionModal(null);
  };

  const handleSelectTag = (option) => {
  const nextTagHasNoApproaches = tagDoesNotUseApproaches(option.id);

  setTag([option.label]);
  setSelectedTagId(option.id);

  setSubtags([]);
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

  setEditingFields((prev) => ({
    ...prev,
    subtags: true,
  }));

  setSubtags((prev) => {
    const exists = prev.includes(option.label);

    if (exists) {
      return prev.filter((item) => item !== option.label);
    }

    if (prev.length >= 2) {
      return [prev[1], option.label];
    }

    return [...prev, option.label];
  });
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

  setSelectedPriceRangeId(currentRangeId);
  setPriceModalVisible(true);
};

const handleClosePriceModal = () => {
  setPriceModalVisible(false);
};

const handleChangePriceRangeId = (rangeId) => {
  setSelectedPriceRangeId(rangeId);
  setIsFreePrice(false);

  const nextPriceLabel = getRangeLabelById(selectedTagPriceConfig, rangeId);

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
          maxLength={60}
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
            onPressEdit={() => setActiveOptionModal("tag")}
          />

          <EditablePillsField
            label="Subetiqueta"
            newLabel="Nueva subetiqueta"
            pills={oldPlace.subtags}
            newPills={subtags}
            helperText={returnFields.subtags.message || "Texto"}
            reviewField={returnFields.subtags}
            isEditing={Boolean(editingFields.subtags)}
            onPressEdit={() => setActiveOptionModal("subtags")}
          />

            {!selectedTagHasNoApproaches && (
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
            )}
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
              value={schedule}
              onChangeText={setSchedule}
              placeholder="Horario"
              helperText={returnFields.schedule.message || "Texto"}
              reviewField={returnFields.schedule}
              isEditing={Boolean(editingFields.schedule)}
              onPressEdit={() => handleEditField("schedule")}
              maxLength={80}
            />

         <EditablePhotosBox
          label="Fotos"
          photos={oldPlace.photos}
          reviewField={returnFields.photos}
          helperText={returnFields.photos.message || "Texto"}
          onChangeReplacementPhotos={setReplacementPhotos}
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
            disabled={!canSubmitAgain}
          />
        </ScrollView>

        <EditableOptionModal
          visible={activeOptionModal === "tag"}
          title="Selecciona una etiqueta"
          options={tagOptions}
          selectedValues={tag}
          multiple={false}
          onSelect={handleSelectTag}
          onClose={handleCloseOptionModal}
        />

        <EditableOptionModal
          visible={activeOptionModal === "subtags"}
          title="Selecciona subetiquetas"
          options={subtagOptions}
          selectedValues={subtags}
          multiple
          onSelect={handleSelectSubtag}
          onClose={handleCloseOptionModal}
        />

        <EditableOptionModal
          visible={activeOptionModal === "approaches" && !selectedTagHasNoApproaches}
          title="Selecciona un enfoque"
          options={approachOptions}
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

        <ResubmitSuccessModal
          visible={successModalVisible}
          onClose={handleCloseSuccessModal}
        />
      </View>
    </LayoutScreen>
  );
}