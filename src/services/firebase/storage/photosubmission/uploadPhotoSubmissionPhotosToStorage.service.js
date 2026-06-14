import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import * as ImageManipulator from "expo-image-manipulator";

import { storage, auth } from "../../config";

const MIN_PHOTOS = 1;
const MAX_PHOTOS = 6;

function getFileExtension(photo) {
  if (photo?.fileName?.includes(".")) {
    return photo.fileName
      .split(".")
      .pop()
      .toLowerCase();
  }

  const extensionByMimeType = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/heic": "heic",
    "image/heif": "heif",
  };

  return extensionByMimeType[photo?.mimeType] || "jpg";
}

function getContentTypeByExtension(extension) {
  const contentTypeByExtension = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    heic: "image/heic",
    heif: "image/heif",
  };

  return contentTypeByExtension[extension] || "image/jpeg";
}

function getSafeResizeWidth(currentWidth, maxWidth) {
  if (
    typeof currentWidth !== "number" ||
    !Number.isFinite(currentWidth) ||
    currentWidth <= 0
  ) {
    return maxWidth;
  }

  return Math.min(currentWidth, maxWidth);
}

function sanitizeStorageSegment(value) {
  return String(value || "")
    .trim()
    .replace(/[\/\\?#\[\]]/g, "_");
}

async function uriToBlob(uri) {
  const response = await fetch(uri);

  if (!response) {
    throw new Error(
      "No fue posible leer una de las fotografías seleccionadas."
    );
  }

  return response.blob();
}

async function uploadSingleImageVersion({
  uri,
  storagePath,
  contentType,
  metadata,
}) {
  const blob = await uriToBlob(uri);
  const storageReference = ref(storage, storagePath);

  try {
    const snapshot = await uploadBytes(
      storageReference,
      blob,
      {
        contentType,
        customMetadata: metadata,
      }
    );

    const downloadURL =
      await getDownloadURL(storageReference);

    return {
      storagePath: snapshot.metadata.fullPath,
      downloadURL,
      size:
        snapshot.metadata.size ??
        blob.size ??
        null,
    };
  } finally {
    if (typeof blob.close === "function") {
      blob.close();
    }
  }
}

async function createImageVersions(photo) {
  const originalUri = photo.uri;

  const mediumResizeWidth = getSafeResizeWidth(
    photo?.width,
    1000
  );

  const thumbnailResizeWidth = getSafeResizeWidth(
    photo?.width,
    300
  );

  const mediumResult =
    await ImageManipulator.manipulateAsync(
      originalUri,
      [
        {
          resize: {
            width: mediumResizeWidth,
          },
        },
      ],
      {
        compress: 0.75,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

  const thumbnailResult =
    await ImageManipulator.manipulateAsync(
      originalUri,
      [
        {
          resize: {
            width: thumbnailResizeWidth,
          },
        },
      ],
      {
        compress: 0.65,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

  return {
    original: {
      uri: originalUri,
      width: photo?.width ?? null,
      height: photo?.height ?? null,
    },

    medium: {
      uri: mediumResult.uri,
      width: mediumResult.width ?? null,
      height: mediumResult.height ?? null,
    },

    thumbnail: {
      uri: thumbnailResult.uri,
      width: thumbnailResult.width ?? null,
      height: thumbnailResult.height ?? null,
    },
  };
}

export async function deleteUploadedFiles(
  storagePaths
) {
  if (!Array.isArray(storagePaths)) {
    return;
  }

  const validPaths =
    storagePaths.filter(Boolean);

  if (validPaths.length === 0) {
    return;
  }

  await Promise.allSettled(
    validPaths.map((storagePath) =>
      deleteObject(
        ref(storage, storagePath)
      )
    )
  );
}

export async function deleteUploadedPhotoSubmissionPhotos(
  uploadedPhotos = []
) {
  const storagePaths =
    uploadedPhotos.flatMap(
      (photo) => [
        photo?.original?.path,
        photo?.medium?.path,
        photo?.thumbnail?.path,
      ]
    );

  await deleteUploadedFiles(
    storagePaths
  );
}

export default async function uploadPhotoSubmissionPhotosToStorageService({
  photos = [],
  placeId,
  photoSubmissionId,
}) {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error("No hay usuario autenticado.");
  }

  if (!placeId) {
    throw new Error(
      "Falta el identificador del lugar."
    );
  }

  if (!photoSubmissionId) {
    throw new Error(
      "Falta photoSubmissionId para subir las fotos."
    );
  }

  if (!Array.isArray(photos)) {
    throw new Error(
      "Las fotografías seleccionadas no son válidas."
    );
  }

  if (photos.length < MIN_PHOTOS) {
    throw new Error(
      "Debes seleccionar al menos una fotografía."
    );
  }

  if (photos.length > MAX_PHOTOS) {
    throw new Error(
      `Solo puedes enviar un máximo de ${MAX_PHOTOS} fotografías.`
    );
  }

  const safeUid = sanitizeStorageSegment(uid);
  const safePlaceId = sanitizeStorageSegment(placeId);
  const safeSubmissionId =
    sanitizeStorageSegment(photoSubmissionId);

  const basePath = [
    "submissions",
    safeUid,
    "photoSubmissions",
    safePlaceId,
    safeSubmissionId,
  ].join("/");

  const uploadedPhotos = [];
  const uploadedStoragePaths = [];

  try {
    for (
      let index = 0;
      index < photos.length;
      index += 1
    ) {
      const photo = photos[index];

      if (!photo?.uri) {
        throw new Error(
          `La foto en la posición ${index + 1} no tiene URI.`
        );
      }

      const position = String(index + 1).padStart(
        2,
        "0"
      );

      const photoId = `photo_${position}`;

      const originalExtension =
        getFileExtension(photo);

      const originalContentType =
        photo?.mimeType ||
        getContentTypeByExtension(
          originalExtension
        );

      const originalFileName =
        `photo_${position}.${originalExtension}`;

      const mediumFileName =
        `photo_${position}.jpg`;

      const thumbnailFileName =
        `photo_${position}.jpg`;

      const originalStoragePath =
        `${basePath}/original/${originalFileName}`;

      const mediumStoragePath =
        `${basePath}/medium/${mediumFileName}`;

      const thumbnailStoragePath =
        `${basePath}/thumbnail/${thumbnailFileName}`;

      const versions =
        await createImageVersions(photo);

      const commonMetadata = {
        uid: String(uid),
        submissionType: "photo",
        placeId: String(placeId),
        photoSubmissionId: String(
          photoSubmissionId
        ),
        photoId,
        order: String(index),
        originalFileName:
          photo?.fileName || originalFileName,
        source: "mobile_photo_submission",
      };

      const originalUpload =
        await uploadSingleImageVersion({
          uri: versions.original.uri,
          storagePath: originalStoragePath,
          contentType: originalContentType,
          metadata: {
            ...commonMetadata,
            version: "original",
          },
        });

      uploadedStoragePaths.push(
        originalUpload.storagePath
      );

      const mediumUpload =
        await uploadSingleImageVersion({
          uri: versions.medium.uri,
          storagePath: mediumStoragePath,
          contentType: "image/jpeg",
          metadata: {
            ...commonMetadata,
            version: "medium",
          },
        });

      uploadedStoragePaths.push(
        mediumUpload.storagePath
      );

      const thumbnailUpload =
        await uploadSingleImageVersion({
          uri: versions.thumbnail.uri,
          storagePath: thumbnailStoragePath,
          contentType: "image/jpeg",
          metadata: {
            ...commonMetadata,
            version: "thumbnail",
          },
        });

      uploadedStoragePaths.push(
        thumbnailUpload.storagePath
      );

      uploadedPhotos.push({
        photoId,
        order: index,

        original: {
          url: originalUpload.downloadURL,
          path: originalUpload.storagePath,
          fileName: originalFileName,
          width: versions.original.width,
          height: versions.original.height,
          size:
            photo?.fileSize ??
            originalUpload.size,
          mimeType: originalContentType,
        },

        medium: {
          url: mediumUpload.downloadURL,
          path: mediumUpload.storagePath,
          fileName: mediumFileName,
          width: versions.medium.width,
          height: versions.medium.height,
          size: mediumUpload.size,
          mimeType: "image/jpeg",
        },

        thumbnail: {
          url: thumbnailUpload.downloadURL,
          path: thumbnailUpload.storagePath,
          fileName: thumbnailFileName,
          width: versions.thumbnail.width,
          height: versions.thumbnail.height,
          size: thumbnailUpload.size,
          mimeType: "image/jpeg",
        },

        source: "user",
        uploadedAt: new Date().toISOString(),
      });
    }

    return uploadedPhotos;
  } catch (error) {
    console.error(
      "Error subiendo propuesta de fotografías:",
      error
    );

    /*
     * Si falla una versión, eliminamos lo que haya
     * alcanzado a subirse durante este intento.
     */
    await deleteUploadedFiles(
      uploadedStoragePaths
    );

    throw error;
  }
}