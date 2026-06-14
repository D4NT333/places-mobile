import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";
import { storage, auth } from "../../config";

function getFileExtension(photo) {
  if (photo?.fileName && photo.fileName.includes(".")) {
    return photo.fileName.split(".").pop().toLowerCase();
  }

  if (photo?.mimeType === "image/png") return "png";
  if (photo?.mimeType === "image/webp") return "webp";

  return "jpg";
}

function getContentTypeByExtension(extension) {
  const map = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };

  return map[extension] || "image/jpeg";
}

function getSafeResizeWidth(currentWidth, maxWidth) {
  if (!currentWidth || typeof currentWidth !== "number") {
    return maxWidth;
  }

  return currentWidth > maxWidth ? maxWidth : currentWidth;
}

async function uriToBlob(uri) {
  const response = await fetch(uri);
  return await response.blob();
}

async function uploadSingleImageVersion({
  uri,
  storagePath,
  contentType,
  metadata,
}) {
  const blob = await uriToBlob(uri);
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, blob, {
    contentType,
    customMetadata: metadata,
  });

  const downloadURL = await getDownloadURL(storageRef);

  return {
    storagePath,
    downloadURL,
  };
}

async function createImageVersions(photo) {
  const originalUri = photo.uri;

  const mediumResizeWidth = getSafeResizeWidth(photo?.width, 1000);
  const thumbnailResizeWidth = getSafeResizeWidth(photo?.width, 300);

  const mediumResult = await ImageManipulator.manipulateAsync(
    originalUri,
    [{ resize: { width: mediumResizeWidth } }],
    {
      compress: 0.75,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  const thumbnailResult = await ImageManipulator.manipulateAsync(
    originalUri,
    [{ resize: { width: thumbnailResizeWidth } }],  
    {
      compress: 0.65,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  return {
    originalUri,
    mediumUri: mediumResult.uri,
    thumbnailUri: thumbnailResult.uri,

    mediumWidth: mediumResult.width ?? null,
    mediumHeight: mediumResult.height ?? null,

    thumbnailWidth: thumbnailResult.width ?? null,
    thumbnailHeight: thumbnailResult.height ?? null,
  };
}

export default async function uploadPlaceSubmissionPhotosToStorageService({
  photos = [],
  placeSubmissionId,
}) {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error("No hay usuario autenticado.");
  }

  if (!placeSubmissionId) {
    throw new Error("Falta placeSubmissionId para subir fotos.");
  }

  if (!Array.isArray(photos) || photos.length === 0) {
    return [];
  }

  const uploadedPhotos = [];

  for (let index = 0; index < photos.length; index += 1) {
    const photo = photos[index];

    if (!photo?.uri) {
      throw new Error(`La foto en posición ${index} no tiene uri.`);
    }

    const originalExtension = getFileExtension(photo);
    const originalContentType =
      photo?.mimeType || getContentTypeByExtension(originalExtension);

    const originalFileName = `photo-${index + 1}.${originalExtension}`;
    const mediumFileName = `photo-${index + 1}-medium.jpg`;
    const thumbnailFileName = `photo-${index + 1}-thumbnail.jpg`;

    const basePath = `submissions/${uid}/placeSubmissions/${placeSubmissionId}`;

    const originalStoragePath = `${basePath}/original/${originalFileName}`;
    const mediumStoragePath = `${basePath}/medium/${mediumFileName}`;
    const thumbnailStoragePath = `${basePath}/thumbnail/${thumbnailFileName}`;

    const {
      originalUri,
      mediumUri,
      thumbnailUri,
      mediumWidth,
      mediumHeight,
      thumbnailWidth,
      thumbnailHeight,
    } = await createImageVersions(photo);

    const commonMetadata = {
      uid,
      submissionType: "place",
      placeSubmissionId,
      originalFileName: photo?.fileName || originalFileName,
      source: "mobile_place_submission",
    };

    const originalUpload = await uploadSingleImageVersion({
      uri: originalUri,
      storagePath: originalStoragePath,
      contentType: originalContentType,
      metadata: {
        ...commonMetadata,
        version: "original",
      },
    });

    const mediumUpload = await uploadSingleImageVersion({
      uri: mediumUri,
      storagePath: mediumStoragePath,
      contentType: "image/jpeg",
      metadata: {
        ...commonMetadata,
        version: "medium",
      },
    });

    const thumbnailUpload = await uploadSingleImageVersion({
      uri: thumbnailUri,
      storagePath: thumbnailStoragePath,
      contentType: "image/jpeg",
      metadata: {
        ...commonMetadata,
        version: "thumbnail",
      },
    });

    uploadedPhotos.push({
      photoId: `photo_${index + 1}`,

      original: {
        url: originalUpload.downloadURL,
        path: originalUpload.storagePath,
        fileName: photo?.fileName || originalFileName,
        width: photo?.width ?? null,
        height: photo?.height ?? null,
        size: photo?.fileSize ?? null,
        mimeType: originalContentType,
      },

      medium: {
        url: mediumUpload.downloadURL,
        path: mediumUpload.storagePath,
        fileName: mediumFileName,
        width: mediumWidth,
        height: mediumHeight,
        mimeType: "image/jpeg",
      },

      thumbnail: {
        url: thumbnailUpload.downloadURL,
        path: thumbnailUpload.storagePath,
        fileName: thumbnailFileName,
        width: thumbnailWidth,
        height: thumbnailHeight,
        mimeType: "image/jpeg",
      },

      source: "user",
      uploadedAt: new Date().toISOString(),
    });
  }

  return uploadedPhotos;
}