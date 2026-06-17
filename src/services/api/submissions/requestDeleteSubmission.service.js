import { getAuth } from "firebase/auth";
import client from "../client";

const VALID_TYPES = [
  "place",
  "photo",
  "description",
];

export default async function requestDeleteSubmissionService({
  type,
  submissionId,
}) {
  if (!VALID_TYPES.includes(type)) {
    throw new Error("Tipo de propuesta inválido.");
  }

  if (!submissionId) {
    throw new Error("Falta el identificador de la propuesta.");
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay un usuario autenticado.");
  }

  const token = await user.getIdToken();

  const response = await client.patch(
    `/api/submissions/${type}/${submissionId}/delete-request`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}