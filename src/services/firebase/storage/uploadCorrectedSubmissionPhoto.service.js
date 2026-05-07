import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";

import { storage } from "../config";

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

  return 1;
}

function extractUserIdFromOldPhoto(oldPhoto = {}) {
  const rawPhoto = oldPhoto?.raw || oldPhoto || {};
  const storagePath = rawPhoto.storagePath || "";

  const parts = String(storagePath).split("/");

  // submissions/{userId}/placeSubmissions/{submissionId}/...
  if (parts[0] === "submissions" && parts[1]) {
    return parts[1];
  }

  return null;
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
    storagePath: `${basePath}/original/photo-${photoNumber}.${extension}`,
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
  oldPhoto,
  newPhoto,
  photoIndex,
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
  const userId = extractUserIdFromOldPhoto(rawOldPhoto);

  if (!userId) {
    throw new Error("No se pudo obtener userId desde la foto anterior.");
  }

  const photoNumber = getPhotoNumber({
    photoIndex,
    oldPhoto,
  });

  const extension = getFileExtension(newPhoto.uri);
  const mimeType = getMimeType(extension);

  const { storagePath, mediumPath, thumbnailPath } = buildCorrectionPaths({
    userId,
    submissionId,
    returnId,
    photoNumber,
    extension,
  });

  const mediumImage = await createMediumImage(newPhoto.uri);
  const thumbnailImage = await createThumbnailImage(newPhoto.uri);

  const [downloadURL, mediumURL, thumbnailURL] = await Promise.all([
    uploadImageVariant({
      uri: newPhoto.uri,
      storagePath,
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

  return {
    downloadURL,
    mediumURL,
    thumbnailURL,

    storagePath,
    mediumPath,
    thumbnailPath,

    fileName: `photo-${photoNumber}.${extension}`,
    mediumFileName: `photo-${photoNumber}-medium.jpg`,
    thumbnailFileName: `photo-${photoNumber}-thumbnail.jpg`,

    mimeType,

    width: newPhoto.width || null,
    height: newPhoto.height || null,

    mediumWidth: mediumImage.width || null,
    mediumHeight: mediumImage.height || null,

    thumbnailWidth: thumbnailImage.width || null,
    thumbnailHeight: thumbnailImage.height || null,

    correctionReturnId: returnId,
    correctedFrom: {
      storagePath: rawOldPhoto.storagePath || null,
      mediumPath: rawOldPhoto.mediumPath || null,
      thumbnailPath: rawOldPhoto.thumbnailPath || null,
      downloadURL: rawOldPhoto.downloadURL || null,
      mediumURL: rawOldPhoto.mediumURL || null,
      thumbnailURL: rawOldPhoto.thumbnailURL || null,
    },
    correctedAt: new Date().toISOString(),
  };
}