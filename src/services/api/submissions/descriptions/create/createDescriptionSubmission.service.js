import { getAuth } from "firebase/auth";
import client from "../../../client";

export default async function createDescriptionSubmissionService({
  placeId,
  proposedDescription,
}) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Debes iniciar sesión para enviar una propuesta.");
  }

  const token = await user.getIdToken();

  const response = await client.post(
    `/api/places/${placeId}/description-submissions`,
    {
      proposedDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}