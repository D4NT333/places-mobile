import getMyPlaceSubmissionsService from "./getMyPlaceSubmissions.service";

const CACHE_TTL_MS = 5 * 60 * 1000;

let cache = {
  items: [],
  nextCursor: null,
  hasMore: true,
  loadingInitial: false,
  loadingMore: false,
  error: null,
  hydratedAt: null,
};

const listeners = new Set();

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
  return {
    ...cache,
    items: [...cache.items],
  };
}

function isCacheFresh() {
  if (!cache.hydratedAt) return false;

  const age = Date.now() - cache.hydratedAt;

  return age < CACHE_TTL_MS;
}

export async function preloadAddedPlacesSubmissions() {
  if (cache.loadingInitial) {
    return getAddedPlacesCacheSnapshot();
  }

  if (cache.items.length > 0 && isCacheFresh()) {
    return getAddedPlacesCacheSnapshot();
  }

  cache = {
    ...cache,
    loadingInitial: true,
    error: null,
  };

  notify();

  try {
    const result = await getMyPlaceSubmissionsService({
      limit: 10,
    });

    cache = {
      items: result.items || [],
      nextCursor: result.nextCursor || null,
      hasMore: Boolean(result.hasMore),
      loadingInitial: false,
      loadingMore: false,
      error: null,
      hydratedAt: Date.now(),
    };

    notify();

    return getAddedPlacesCacheSnapshot();
  } catch (error) {
    cache = {
      ...cache,
      loadingInitial: false,
      error,
    };

    notify();

    throw error;
  }
}

export async function loadMoreAddedPlacesSubmissions() {
  if (cache.loadingMore) {
    return getAddedPlacesCacheSnapshot();
  }

  if (!cache.hasMore) {
    return getAddedPlacesCacheSnapshot();
  }

  if (!cache.nextCursor) {
    return getAddedPlacesCacheSnapshot();
  }

  cache = {
    ...cache,
    loadingMore: true,
    error: null,
  };

  notify();

  try {
    const result = await getMyPlaceSubmissionsService({
      limit: 10,
      cursor: cache.nextCursor,
    });

    cache = {
      ...cache,
      items: [...cache.items, ...(result.items || [])],
      nextCursor: result.nextCursor || null,
      hasMore: Boolean(result.hasMore),
      loadingMore: false,
      error: null,
      hydratedAt: Date.now(),
    };

    notify();

    return getAddedPlacesCacheSnapshot();
  } catch (error) {
    cache = {
      ...cache,
      loadingMore: false,
      error,
    };

    notify();

    throw error;
  }
}

export async function refreshAddedPlacesSubmissions() {
  if (cache.loadingInitial) {
    return getAddedPlacesCacheSnapshot();
  }

  cache = {
    ...cache,
    loadingInitial: true,
    error: null,
  };

  notify();

  try {
    const result = await getMyPlaceSubmissionsService({
      limit: 10,
    });

    cache = {
      items: result.items || [],
      nextCursor: result.nextCursor || null,
      hasMore: Boolean(result.hasMore),
      loadingInitial: false,
      loadingMore: false,
      error: null,
      hydratedAt: Date.now(),
    };

    notify();

    return getAddedPlacesCacheSnapshot();
  } catch (error) {
    cache = {
      ...cache,
      loadingInitial: false,
      error,
    };

    notify();

    throw error;
  }
}

export function removeAddedPlaceFromCache(placeId) {
  cache = {
    ...cache,
    items: cache.items.filter((item) => item.id !== placeId),
  };

  notify();
}

export function clearAddedPlacesSubmissionsCache() {
  cache = {
    items: [],
    nextCursor: null,
    hasMore: true,
    loadingInitial: false,
    loadingMore: false,
    error: null,
    hydratedAt: null,
  };

  notify();
}