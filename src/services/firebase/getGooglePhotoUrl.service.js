import client from "../api/client";

function cleanText(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export default async function getGooglePhotoUrlService(
  reference,
  options = {}
) {
  const normalizedReference =
    cleanText(reference);

  if (!normalizedReference) {
    return "";
  }

  const requestedWidth =
    Number(options?.maxWidthPx);

  const maxWidthPx =
    Number.isInteger(requestedWidth)
      ? Math.min(
          Math.max(requestedWidth, 100),
          1200
        )
      : 400;

  const response =
    await client.get(
      "/api/search/google",
      {
        params: {
          reference:
            normalizedReference,

          maxWidthPx,
        },
      }
    );

  return cleanText(
    response.data?.photoUrl
  );
}