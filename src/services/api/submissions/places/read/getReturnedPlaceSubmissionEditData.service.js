import client from "../../../client";
import { auth } from "../../../../firebase/config";

export default async function getReturnedPlaceSubmissionEditDataService(
  submissionId
) {
  if (!submissionId) {
    throw new Error("Falta submissionId para cargar datos de edición.");
  }

  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay usuario autenticado para cargar datos de edición.");
  }

  const token = await user.getIdToken();

  const response = await client.get(
    `/api/place-submissions/my-places/returned/${submissionId}/edit`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data?.data || null;
}