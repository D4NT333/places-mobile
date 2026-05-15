import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

import { clearAllAddedPlacesSubmissionsCaches } from "../../api/addedPlacesSubmissionsCache.service";

export default async function logoutService() {
  clearAllAddedPlacesSubmissionsCaches();

  await signOut(auth);

  return {
    success: true,
  };
}