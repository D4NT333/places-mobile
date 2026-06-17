import algoliaClient, {
  ALGOLIA_PLACES_INDEX,
} from "./algolia";

const DEFAULT_LIMIT = 20;

function cleanText(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function normalizePhoto(value) {
  if (typeof value === "string") {
    const url =
      cleanText(value);

    return {
      source:
        url ? "unknown" : "",

      url,

      reference: "",
    };
  }

  if (
    !value ||
    typeof value !== "object"
  ) {
    return {
      source: "",
      url: "",
      reference: "",
    };
  }

  const source =
    cleanText(value?.source);

  const url =
    cleanText(
      value?.thumbnail?.url
    ) ||
    cleanText(
      value?.medium?.url
    ) ||
    cleanText(value?.url) ||
    cleanText(
      value?.downloadURL
    ) ||
    cleanText(value?.uri);

  const reference =
    cleanText(
      value?.reference
    );

  return {
    source,
    url,
    reference,
  };
}

function normalizeSubtags(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return {
          id: item,
          label: item,
        };
      }

      return {
        id:
          cleanText(item?.subtagId) ||
          cleanText(item?.id),

        label:
          cleanText(item?.subtagLabel) ||
          cleanText(item?.label) ||
          cleanText(item?.name),
      };
    })
    .filter((item) => item.id || item.label);
}

function normalizeRating(value) {
  const parsedRating =
    Number(value);

  if (
    !Number.isFinite(parsedRating) ||
    parsedRating < 0
  ) {
    return 0;
  }

  return Math.min(
    parsedRating,
    5
  );
}

function normalizePlaceHit(hit) {
  return {
    id:
      cleanText(hit?.placeId) ||
      cleanText(hit?.objectID),

    placeId:
      cleanText(hit?.placeId) ||
      cleanText(hit?.objectID),

    objectID:
      cleanText(hit?.objectID),

    name:
      cleanText(hit?.name) ||
      "Lugar sin nombre",

    description:
      cleanText(hit?.description),

    address:
      cleanText(hit?.address),

    tagId:
      cleanText(hit?.tagId),

    tagLabel:
      cleanText(hit?.tagLabel),

    subtags:
      normalizeSubtags(
        hit?.subtags
      ),

    approaches:
      Array.isArray(hit?.approaches)
        ? hit.approaches
        : [],

    price:
      hit?.price || null,

    mainPhoto:
      normalizePhoto(
        hit?.mainPhoto
      ),

    averageRating:
  normalizeRating(
    hit?.averageRating ??
      hit?.googleData?.rating
  ),

    isOpenNow:
      typeof hit?.isOpenNow === "boolean"
        ? hit.isOpenNow
        : null,

    location:
      hit?.location || null,
  };
}

export default async function searchPlacesService(
  query,
  options = {}
) {
  const normalizedQuery = cleanText(query);

  if (!normalizedQuery) {
    return [];
  }

  const {
    limit = DEFAULT_LIMIT,
    filters = 'status:"published"',
  } = options;

  const response =
    await algoliaClient.searchSingleIndex({
      indexName:
        ALGOLIA_PLACES_INDEX,

      searchParams: {
        query:
          normalizedQuery,

        hitsPerPage:
          Math.min(
            Math.max(
              Number(limit) || DEFAULT_LIMIT,
              1
            ),
            20
          ),

        filters,

        attributesToRetrieve: [
          "placeId",
          "name",
          "description",
          "address",
          "tagId",
          "tagLabel",
          "googleData",
          "subtags",
          "approaches",
          "price",
          "mainPhoto",
          "averageRating",
          "isOpenNow",
          "location",
        ],
      },
    });

  const hits =
    Array.isArray(response?.hits)
      ? response.hits
      : [];

  return hits.map(
    normalizePlaceHit
  );
}