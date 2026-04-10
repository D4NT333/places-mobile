import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config";

export async function getStorageFileUrlService(path) {
  const fileRef = ref(storage, path);
  const url = await getDownloadURL(fileRef);
  return url;
}