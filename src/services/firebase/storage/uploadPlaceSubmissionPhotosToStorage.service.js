import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../config";

function getFileExtension(photo) {
  if (photo?.fileName && photo.fileName.includes(".")) {
    return photo.fileName.split(".").pop().toLowerCase();
  }

  if (photo?.mimeType === "image/png") return "png";
  if (photo?.mimeType === "image/webp") return "webp";

  return "jpg";
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

    const extension = getFileExtension(photo);
    const fileName = `photo-${index + 1}.${extension}`;
    const storagePath = `submissions/${uid}/placeSubmissions/${placeSubmissionId}/${fileName}`;

    const response = await fetch(photo.uri);
    const blob = await response.blob();

    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, blob, {
      contentType: photo?.mimeType || "image/jpeg",
      customMetadata: {
        uid,
        submissionType: "place",
        placeSubmissionId,
        originalFileName: photo?.fileName || fileName,
        source: "mobile_place_submission",
      },
    });

    const downloadURL = await getDownloadURL(storageRef);

    uploadedPhotos.push({
      storagePath,
      downloadURL,
      fileName: photo?.fileName || fileName,
      mimeType: photo?.mimeType || "image/jpeg",
      width: photo?.width ?? null,
      height: photo?.height ?? null,
      fileSize: photo?.fileSize ?? null,
    });
  }

  return uploadedPhotos;
}