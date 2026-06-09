import { auth } from "../../../../firebase/config";
import client from "../../../client";

export default async function getMyPlaceSubmissionDetailService(submissionId) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay usuario autenticado.");
  }

  if (!submissionId) {
    throw new Error("Falta submissionId para obtener el detalle.");
  }

  const token = await user.getIdToken();

  const response = await client.get(
    `/api/place-submissions/my-places/${submissionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}