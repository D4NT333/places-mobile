import { auth } from "../../../../firebase/config";
import getMyPlaceSubmissionsService from "./getMyPlaceSubmissions.service";

const CACHE_TTL_MS = 5 * 60 * 1000;

const EMPTY_CACHE = {
  items: [],
  nextCursor: null,
  hasMore: true,
  loadingInitial: false,
  loadingMore: false,
  error: null,
  hydratedAt: null,
};

const cachesByUser = new Map();
const listeners = new Set();

function getCurrentUserId() {
  return auth.currentUser?.uid || null;
}

function createEmptyCache() {
  return {
    ...EMPTY_CACHE,
    items: [],
  };
}

function getCacheKey() {
  const uid = getCurrentUserId();

  if (!uid) {
    return "anonymous";
  }

  return `user:${uid}`;
}

function getCurrentCache() {
  const cacheKey = getCacheKey();

  if (!cachesByUser.has(cacheKey)) {
    cachesByUser.set(cacheKey, createEmptyCache());
  }

  return cachesByUser.get(cacheKey);
}

function setCurrentCache(nextCache) {
  const cacheKey = getCacheKey();

  cachesByUser.set(cacheKey, {
    ...nextCache,
    items: [...(nextCache.items || [])],
  });
}

function notify() {
  listeners.forEach((listener) => {
    listener(getAddedPlacesCacheSnapshot());
  });
}

export function subscribeAddedPlacesCache(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getAddedPlacesCacheSnapshot() {
  const cache = getCurrentCache();

  return {
    ...cache,
    items: [...cache.items],
  };
}

function isCacheFresh() {
  const cache = getCurrentCache();

  if (!cache.hydratedAt) return false;

  const age = Date.now() - cache.hydratedAt;

  return age < CACHE_TTL_MS;
}

export async function preloadAddedPlacesSubmissions() {
  const uid = getCurrentUserId();

  if (!uid) {
    setCurrentCache(createEmptyCache());
    notify();
    return getAddedPlacesCacheSnapshot();
  }

  const cache = getCurrentCache();

  if (cache.loadingInitial) {
    return getAddedPlacesCacheSnapshot();
  }

  if (cache.items.length > 0 && isCacheFresh()) {
    return getAddedPlacesCacheSnapshot();
  }

  setCurrentCache({
    ...cache,
    loadingInitial: true,
    error: null,
  });

  notify();

  try {
    const result = await getMyPlaceSubmissionsService({
      limit: 10,
    });

    setCurrentCache({
      items: result.items || [],
      nextCursor: result.nextCursor || null,
      hasMore: Boolean(result.hasMore),
      loadingInitial: false,
      loadingMore: false,
      error: null,
      hydratedAt: Date.now(),
    });

    notify();

    return getAddedPlacesCacheSnapshot();
  } catch (error) {
    const currentCache = getCurrentCache();

    setCurrentCache({
      ...currentCache,
      loadingInitial: false,
      error,
    });

    notify();

    throw error;
  }
}

export async function loadMoreAddedPlacesSubmissions() {
  const uid = getCurrentUserId();

  if (!uid) {
    return getAddedPlacesCacheSnapshot();
  }

  const cache = getCurrentCache();

  if (cache.loadingMore) {
    return getAddedPlacesCacheSnapshot();
  }

  if (!cache.hasMore) {
    return getAddedPlacesCacheSnapshot();
  }

  if (!cache.nextCursor) {
    return getAddedPlacesCacheSnapshot();
  }

  setCurrentCache({
    ...cache,
    loadingMore: true,
    error: null,
  });

  notify();

  try {
    const result = await getMyPlaceSubmissionsService({
      limit: 10,
      cursor: cache.nextCursor,
    });

    const currentCache = getCurrentCache();

    setCurrentCache({
      ...currentCache,
      items: [...currentCache.items, ...(result.items || [])],
      nextCursor: result.nextCursor || null,
      hasMore: Boolean(result.hasMore),
      loadingMore: false,
      error: null,
      hydratedAt: Date.now(),
    });

    notify();

    return getAddedPlacesCacheSnapshot();
  } catch (error) {
    const currentCache = getCurrentCache();

    setCurrentCache({
      ...currentCache,
      loadingMore: false,
      error,
    });

    notify();

    throw error;
  }
}

export async function refreshAddedPlacesSubmissions() {
  const uid = getCurrentUserId();

  if (!uid) {
    setCurrentCache(createEmptyCache());
    notify();
    return getAddedPlacesCacheSnapshot();
  }

  const cache = getCurrentCache();

  if (cache.loadingInitial) {
    return getAddedPlacesCacheSnapshot();
  }

  setCurrentCache({
    ...cache,
    loadingInitial: true,
    error: null,
  });

  notify();

  try {
    const result = await getMyPlaceSubmissionsService({
      limit: 10,
    });

    setCurrentCache({
      items: result.items || [],
      nextCursor: result.nextCursor || null,
      hasMore: Boolean(result.hasMore),
      loadingInitial: false,
      loadingMore: false,
      error: null,
      hydratedAt: Date.now(),
    });

    notify();

    return getAddedPlacesCacheSnapshot();
  } catch (error) {
    const currentCache = getCurrentCache();

    setCurrentCache({
      ...currentCache,
      loadingInitial: false,
      error,
    });

    notify();

    throw error;
  }
}

export function removeAddedPlaceFromCache(placeId) {
  const cache = getCurrentCache();

  setCurrentCache({
    ...cache,
    items: cache.items.filter((item) => item.id !== placeId),
  });

  notify();
}

export function clearAddedPlacesSubmissionsCache() {
  const cacheKey = getCacheKey();

  cachesByUser.set(cacheKey, createEmptyCache());

  notify();
}

export function clearAllAddedPlacesSubmissionsCaches() {
  cachesByUser.clear();

  notify();
}