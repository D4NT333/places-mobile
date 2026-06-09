import { auth } from "../../../../firebase/config";
import client from "../../../client";

export default async function getMyPlaceSubmissionsService({
  limit = 10,
  cursor = null,
} = {}) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay usuario autenticado.");
  }

  const token = await user.getIdToken();

  const params = {
    limit,
  };

  if (cursor) {
    params.cursor = cursor;
  }

  const response = await client.get("/api/place-submissions/my-places", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}