import getMyPlaceSubmissionDetailService from "./getMyPlaceSubmissionDetail.service";

const CACHE_TTL_MS = 5 * 60 * 1000;

let detailCache = {};

function isFresh(entry) {
  if (!entry?.hydratedAt) return false;

  return Date.now() - entry.hydratedAt < CACHE_TTL_MS;
}

export function getPlaceSubmissionDetailFromCache(submissionId) {
  const entry = detailCache[submissionId];

  if (!entry) return null;

  return entry.data || null;
}

export async function getOrFetchPlaceSubmissionDetail(submissionId) {
  const entry = detailCache[submissionId];

  if (entry?.data && isFresh(entry)) {
    return entry.data;
  }

  const response = await getMyPlaceSubmissionDetailService(submissionId);

  const data = response.data || null;

  detailCache = {
    ...detailCache,
    [submissionId]: {
      data,
      hydratedAt: Date.now(),
    },
  };

  return data;
}

export function clearPlaceSubmissionDetailCache(submissionId) {
  if (!submissionId) {
    detailCache = {};
    return;
  }

  const nextCache = { ...detailCache };
  delete nextCache[submissionId];
  detailCache = nextCache;
}