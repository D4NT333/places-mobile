import getPlacesFeedService from "../api/getPlacesFeed.service";

const PAGE_SIZE = 20;

let homeFeedWarmupPromise = null;
let homeFeedWarmupDone = false;

let cachedHomeFeed = {
  places: [],
  nextCursor: null,
  hasMore: true,
  fetchedAt: null,
};

export async function warmHomeFeedCache() {
  if (homeFeedWarmupDone) {
    console.log("warmHomeFeedCache: cache ya precalentada");
    return cachedHomeFeed;
  }

  if (homeFeedWarmupPromise) {
    console.log("warmHomeFeedCache: reutilizando warmup en curso");
    return homeFeedWarmupPromise;
  }

  homeFeedWarmupPromise = (async () => {
    const start = Date.now();

    console.log("warmHomeFeedCache: iniciando");

    const result = await getPlacesFeedService({
      limit: PAGE_SIZE,
      cursor: null,
    });

    cachedHomeFeed = {
      places: result.places,
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
      fetchedAt: Date.now(),
    };

    homeFeedWarmupDone = true;

    console.log(
      "warmHomeFeedCache: completado en",
      Date.now() - start,
      "ms"
    );

    return cachedHomeFeed;
  })();

  try {
    return await homeFeedWarmupPromise;
  } catch (error) {
    console.log("warmHomeFeedCache error:", error);
    throw error;
  } finally {
    homeFeedWarmupPromise = null;
  }
}

export function getCachedHomeFeed() {
  if (!homeFeedWarmupDone) {
    return null;
  }

  return cachedHomeFeed;
}

export function clearHomeFeedCache() {
  homeFeedWarmupPromise = null;
  homeFeedWarmupDone = false;

  cachedHomeFeed = {
    places: [],
    nextCursor: null,
    hasMore: true,
    fetchedAt: null,
  };
}