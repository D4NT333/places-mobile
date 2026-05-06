import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
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
} from "./Components";

import getReturnedPlaceSubmissionEditDataService from "../../../../services/api/getReturnedPlaceSubmissionEditData.service";

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

const MOCK_TAG_OPTIONS = [
  { id: "tag_gastronomy", label: "Gastronomía" },
  { id: "tag_art", label: "Arte" },
  { id: "tag_nature", label: "Naturaleza" },
  { id: "tag_entertainment", label: "Entretenimiento" },
];

const MOCK_SUBTAG_OPTIONS = [
  { id: "subtag_mexican", label: "Mexicana" },
  { id: "subtag_vegan", label: "Vegana" },
  { id: "subtag_cafe", label: "Café" },
  { id: "subtag_birria", label: "Birriería" },
  { id: "subtag_fast_food", label: "Comida rápida" },
  { id: "subtag_desserts", label: "Postres" },
];

const MOCK_APPROACH_OPTIONS = [
  { id: "approach_local", label: "Local" },
  { id: "approach_popular", label: "Popular" },
  { id: "approach_accessible", label: "Accesibilidad" },
  { id: "approach_quiet", label: "Tranquilo" },
];

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function buildSinglePill(value) {
  if (!value) return [];

  return [value];
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

  const [activeOptionModal, setActiveOptionModal] = useState(null);
  const [editingFields, setEditingFields] = useState({});

  const editSources = useMemo(
    () =>
      buildEditSources({
        editData,
        initialPlace,
      }),
    [editData, initialPlace]
  );

  const { oldPlace, newPlace, returnFields, generalMessage } = editSources;

  useEffect(() => {
    if (!placeId) return;

    const shouldLoad =
      source === "added_places" && shouldFetchReturnedEditData;

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

        console.log("Error al cargar datos de edición devuelta:", error);

        setEditDataError(error);
      })
      .finally(() => {
        if (!isMounted) return;

        setLoadingEditData(false);
      });

    return () => {
      isMounted = false;
    };
  }, [placeId, source, shouldFetchReturnedEditData]);

  useEffect(() => {
    setName(newPlace.name);
    setDescription(newPlace.description);
    setPriceRange(newPlace.priceRange);
    setSchedule(newPlace.schedule);
    setTag(newPlace.tag);
    setSubtags(newPlace.subtags);
    setApproaches(newPlace.approaches);
  }, [
    newPlace.name,
    newPlace.description,
    newPlace.priceRange,
    newPlace.schedule,
    newPlace.tag,
    newPlace.subtags,
    newPlace.approaches,
  ]);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleEditField = (fieldKey) => {
    setEditingFields((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey],
    }));
  };

  const handleSubmitAgain = () => {
    console.log("Enviar de nuevo lugar:", {
      placeId,
      returnId: editData?.activeReturn?.returnId,
      name,
      description,
      tag,
      subtags,
      approaches,
      priceRange,
      schedule,
    });
  };

  const handleCloseOptionModal = () => {
    setActiveOptionModal(null);
  };

  const handleSelectTag = (option) => {
    setTag([option.label]);

    setEditingFields((prev) => ({
      ...prev,
      tag: true,
    }));

    setActiveOptionModal(null);
  };

  const handleSelectSubtag = (option) => {
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
    setApproaches([option.label]);

    setEditingFields((prev) => ({
      ...prev,
      approaches: true,
    }));

    setActiveOptionModal(null);
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
            onPressEdit={() => handleEditField("price")}
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
          />

          <EditablePhotosBox
            label="Fotos"
            photos={oldPlace.photos}
            reviewField={returnFields.photos}
            helperText={returnFields.photos.message || "Texto"}
          />

          <EditableMapBox
            label="Mapa"
            newLabel="Mapa nuevo"
            mapLabel={oldPlace.mapLabel}
            newMapLabel={newPlace.mapLabel}
            reviewField={returnFields.location}
            helperText={
              returnFields.location.message ||
              "Ajusta el pin al acceso principal del lugar."
            }
            isEditing={Boolean(editingFields.location)}
            onPressEdit={() => handleEditField("location")}
          />

          <SubmitAgainBox onSubmit={handleSubmitAgain} />
        </ScrollView>

        <EditableOptionModal
          visible={activeOptionModal === "tag"}
          title="Selecciona una etiqueta"
          options={MOCK_TAG_OPTIONS}
          selectedValues={tag}
          multiple={false}
          onSelect={handleSelectTag}
          onClose={handleCloseOptionModal}
        />

        <EditableOptionModal
          visible={activeOptionModal === "subtags"}
          title="Selecciona subetiquetas"
          options={MOCK_SUBTAG_OPTIONS}
          selectedValues={subtags}
          multiple
          onSelect={handleSelectSubtag}
          onClose={handleCloseOptionModal}
        />

        <EditableOptionModal
          visible={activeOptionModal === "approaches"}
          title="Selecciona un enfoque"
          options={MOCK_APPROACH_OPTIONS}
          selectedValues={approaches}
          multiple={false}
          onSelect={handleSelectApproach}
          onClose={handleCloseOptionModal}
        />
      </View>
    </LayoutScreen>
  );
}