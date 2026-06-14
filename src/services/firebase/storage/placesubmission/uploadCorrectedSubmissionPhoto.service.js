import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";

import { storage } from "../../config";

async function uriToBlob(uri) {
  const response = await fetch(uri);
  return await response.blob();
}

function getFileExtension(uri = "") {
  const cleanUri = String(uri).split("?")[0];
  const extension = cleanUri.split(".").pop();

  if (!extension || extension.length > 5) return "jpg";

  return extension.toLowerCase();
}

function getMimeType(extension) {
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";

  return "image/jpeg";
}

function getPhotoNumber({ photoIndex, oldPhoto }) {
  if (Number.isInteger(photoIndex) && photoIndex >= 0) {
    return photoIndex + 1;
  }

  const labelMatch = String(oldPhoto?.label || "").match(/\d+/);
  if (labelMatch) return Number(labelMatch[0]);

  const idMatch = String(oldPhoto?.id || oldPhoto?.photoId || "").match(/\d+/);
  if (idMatch) return Number(idMatch[0]);

  return 1;
}

function getOldPhotoPath(rawPhoto = {}) {
  return (
    rawPhoto.original?.path ||
    rawPhoto.medium?.path ||
    rawPhoto.thumbnail?.path ||
    rawPhoto.storagePath ||
    rawPhoto.mediumPath ||
    rawPhoto.thumbnailPath ||
    rawPhoto.path ||
    ""
  );
}

function extractUserIdFromOldPhoto(oldPhoto = {}) {
  const rawPhoto = oldPhoto?.raw || oldPhoto || {};
  const storagePath = getOldPhotoPath(rawPhoto);

  const parts = String(storagePath).split("/");

  // submissions/{userId}/placeSubmissions/{submissionId}/...
  if (parts[0] === "submissions" && parts[1]) {
    return parts[1];
  }

  return null;
}

function getOldPhotoUrl(rawPhoto = {}, preferredSize = "medium") {
  if (!rawPhoto) return null;

  if (typeof rawPhoto === "string") return rawPhoto;

  if (preferredSize === "thumbnail") {
    return (
      rawPhoto.thumbnailUrl ||
      rawPhoto.thumbnail?.url ||
      rawPhoto.previewURL ||
      rawPhoto.displayUrl ||
      rawPhoto.mediumUrl ||
      rawPhoto.medium?.url ||
      rawPhoto.originalUrl ||
      rawPhoto.original?.url ||
      rawPhoto.thumbnailURL ||
      rawPhoto.mediumURL ||
      rawPhoto.downloadURL ||
      rawPhoto.url ||
      rawPhoto.imageUrl ||
      rawPhoto.uri ||
      null
    );
  }

  if (preferredSize === "original") {
    return (
      rawPhoto.originalUrl ||
      rawPhoto.original?.url ||
      rawPhoto.fullUrl ||
      rawPhoto.downloadURL ||
      rawPhoto.displayUrl ||
      rawPhoto.mediumUrl ||
      rawPhoto.medium?.url ||
      rawPhoto.thumbnailUrl ||
      rawPhoto.thumbnail?.url ||
      rawPhoto.mediumURL ||
      rawPhoto.thumbnailURL ||
      rawPhoto.url ||
      rawPhoto.imageUrl ||
      rawPhoto.uri ||
      null
    );
  }

  return (
    rawPhoto.displayUrl ||
    rawPhoto.mediumUrl ||
    rawPhoto.medium?.url ||
    rawPhoto.originalUrl ||
    rawPhoto.original?.url ||
    rawPhoto.thumbnailUrl ||
    rawPhoto.thumbnail?.url ||
    rawPhoto.mediumURL ||
    rawPhoto.downloadURL ||
    rawPhoto.thumbnailURL ||
    rawPhoto.url ||
    rawPhoto.imageUrl ||
    rawPhoto.uri ||
    null
  );
}

function buildCorrectionPaths({
  userId,
  submissionId,
  returnId,
  photoNumber,
  extension,
}) {
  const basePath = `submissions/${userId}/placeSubmissions/${submissionId}/corrections/${returnId}`;

  return {
    originalPath: `${basePath}/original/photo-${photoNumber}.${extension}`,
    mediumPath: `${basePath}/medium/photo-${photoNumber}-medium.jpg`,
    thumbnailPath: `${basePath}/thumbnail/photo-${photoNumber}-thumbnail.jpg`,
  };
}

async function uploadImageVariant({ uri, storagePath, mimeType }) {
  const blob = await uriToBlob(uri);
  const imageRef = ref(storage, storagePath);

  await uploadBytes(imageRef, blob, {
    contentType: mimeType,
  });

  return await getDownloadURL(imageRef);
}

async function createMediumImage(uri) {
  return await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1000 } }],
    {
      compress: 0.82,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );
}

async function createThumbnailImage(uri) {
  return await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 300 } }],
    {
      compress: 0.75,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );
}

export default async function uploadCorrectedSubmissionPhotoService({
  submissionId,
  returnId,
  userId,
  oldPhoto,
  newPhoto,
  photoIndex,
  operationType = "replace",
}) {
  if (!submissionId) {
    throw new Error("Falta submissionId para subir la foto corregida.");
  }

  if (!returnId) {
    throw new Error("Falta returnId para subir la foto corregida.");
  }

  if (!newPhoto?.uri) {
    throw new Error("La nueva foto no tiene uri.");
  }

  const rawOldPhoto = oldPhoto?.raw || oldPhoto || {};
  const resolvedUserId = userId || extractUserIdFromOldPhoto(rawOldPhoto);

  if (!resolvedUserId) {
    console.log("NO SE PUDO RESOLVER USER ID PARA FOTO:", {
      operationType,
      userId,
      oldPhoto,
      rawOldPhoto,
      detectedPath: getOldPhotoPath(rawOldPhoto),
    });

    throw new Error("No se pudo obtener userId para subir la foto.");
  }

  const photoNumber = getPhotoNumber({
    photoIndex,
    oldPhoto,
  });

  const extension = getFileExtension(newPhoto.uri);
  const mimeType = getMimeType(extension);

  const { originalPath, mediumPath, thumbnailPath } = buildCorrectionPaths({
    userId: resolvedUserId,
    submissionId,
    returnId,
    photoNumber,
    extension,
  });

  const mediumImage = await createMediumImage(newPhoto.uri);
  const thumbnailImage = await createThumbnailImage(newPhoto.uri);

  const [originalUrl, mediumUrl, thumbnailUrl] = await Promise.all([
    uploadImageVariant({
      uri: newPhoto.uri,
      storagePath: originalPath,
      mimeType,
    }),
    uploadImageVariant({
      uri: mediumImage.uri,
      storagePath: mediumPath,
      mimeType: "image/jpeg",
    }),
    uploadImageVariant({
      uri: thumbnailImage.uri,
      storagePath: thumbnailPath,
      mimeType: "image/jpeg",
    }),
  ]);

  const originalFileName = `photo-${photoNumber}.${extension}`;
  const mediumFileName = `photo-${photoNumber}-medium.jpg`;
  const thumbnailFileName = `photo-${photoNumber}-thumbnail.jpg`;

  const oldPhotoId =
    rawOldPhoto.photoId ||
    oldPhoto?.id ||
    null;

  const nextPhotoId =
    operationType === "add"
      ? `photo_${photoNumber}`
      : oldPhotoId || `photo_${photoNumber}`;

  const correctedFrom =
    operationType === "add"
      ? null
      : {
          photoId: oldPhotoId,

          original: {
            url: getOldPhotoUrl(rawOldPhoto, "original"),
            path: rawOldPhoto.original?.path || rawOldPhoto.storagePath || null,
          },

          medium: {
            url: getOldPhotoUrl(rawOldPhoto, "medium"),
            path: rawOldPhoto.medium?.path || rawOldPhoto.mediumPath || null,
          },

          thumbnail: {
            url: getOldPhotoUrl(rawOldPhoto, "thumbnail"),
            path: rawOldPhoto.thumbnail?.path || rawOldPhoto.thumbnailPath || null,
          },
        };

  return {
    photoId: nextPhotoId,

    original: {
      url: originalUrl,
      path: originalPath,
      fileName: originalFileName,
      width: newPhoto.width || null,
      height: newPhoto.height || null,
      size: newPhoto.fileSize || null,
      mimeType,
    },

    medium: {
      url: mediumUrl,
      path: mediumPath,
      fileName: mediumFileName,
      width: mediumImage.width || null,
      height: mediumImage.height || null,
      mimeType: "image/jpeg",
    },

    thumbnail: {
      url: thumbnailUrl,
      path: thumbnailPath,
      fileName: thumbnailFileName,
      width: thumbnailImage.width || null,
      height: thumbnailImage.height || null,
      mimeType: "image/jpeg",
    },

    source: "user",
    uploadedAt: new Date().toISOString(),

    correctionReturnId: returnId,
    correctionOperationType: operationType,

    correctedFrom,

    // Aliases temporales para no romper código viejo mientras migras
    displayUrl: mediumUrl || originalUrl || thumbnailUrl,
    mediumUrl,
    thumbnailUrl,
    originalUrl,

    downloadURL: originalUrl,
    mediumURL: mediumUrl,
    thumbnailURL: thumbnailUrl,

    storagePath: originalPath,
    mediumPath,
    thumbnailPath,

    fileName: originalFileName,
    mediumFileName,
    thumbnailFileName,

    width: newPhoto.width || null,
    height: newPhoto.height || null,

    mediumWidth: mediumImage.width || null,
    mediumHeight: mediumImage.height || null,

    thumbnailWidth: thumbnailImage.width || null,
    thumbnailHeight: thumbnailImage.height || null,

    correctedAt: new Date().toISOString(),
  };
}