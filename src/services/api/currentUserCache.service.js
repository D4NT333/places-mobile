import getCurrentUserService from "./getCurrentUser.service";

let cachedCurrentUser = null;
let pendingCurrentUserPromise = null;

export function getCachedCurrentUser() {
  return cachedCurrentUser;
}

export function clearCurrentUserCache() {
  cachedCurrentUser = null;
  pendingCurrentUserPromise = null;
}

export async function preloadCurrentUser() {
  if (cachedCurrentUser) {
    return cachedCurrentUser;
  }

  if (pendingCurrentUserPromise) {
    return pendingCurrentUserPromise;
  }

  pendingCurrentUserPromise = getCurrentUserService()
    .then((user) => {
      cachedCurrentUser = user;
      return user;
    })
    .finally(() => {
      pendingCurrentUserPromise = null;
    });

  return pendingCurrentUserPromise;
}