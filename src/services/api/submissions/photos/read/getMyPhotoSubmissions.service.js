import { getAuth } from "firebase/auth";
import client from "../../../client";

const STATUS_MAP = {
  approved: "approved",
  accepted: "approved",

  rejected: "rejected",

  in_review: "in_review",
  pending: "in_review",
};

function formatSubmittedAt(value) {
  if (!value) {
    return "Sin fecha de envío";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha de envío";
  }

  const formattedDate = date.toLocaleDateString(
    "es-MX",
    {
      day: "numeric",
      month: "long",
    }
  );

  return `Enviado el ${formattedDate}`;
}

function normalizePhotoSubmission(item) {
  const id =
    item.submissionId ||
    item.id;

  const status =
    STATUS_MAP[item.status] ||
    "in_review";

  const mediumUrl =
    typeof item.mediumUrl === "string"
      ? item.mediumUrl
      : "";

  return {
    id,

    submissionId: id,

    placeId:
      item.placeId ||
      "",

    name:
      item.placeName ||
      "Lugar sin nombre",

    status,

    imageUrl: mediumUrl,

    mediumUrl,

    rejectionReason:
      typeof item.rejectionReason === "string"
        ? item.rejectionReason
        : "",

    createdAt:
      item.createdAt ||
      null,

    submittedAtLabel:
      formatSubmittedAt(
        item.createdAt
      ),
  };
}

export default async function getMyPhotoSubmissionsService() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "No hay un usuario autenticado."
    );
  }

  const token = await user.getIdToken();

  const response = await client.get(
    "/api/photo-submissions/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const submissions = Array.isArray(
    response.data?.submissions
  )
    ? response.data.submissions
    : [];

  return submissions.map(
    normalizePhotoSubmission
  );
}