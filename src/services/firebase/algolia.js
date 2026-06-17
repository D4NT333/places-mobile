import { algoliasearch } from "algoliasearch";

const ALGOLIA_APP_ID =
  process.env.EXPO_PUBLIC_ALGOLIA_APP_ID;

const ALGOLIA_SEARCH_API_KEY =
  process.env.EXPO_PUBLIC_ALGOLIA_SEARCH_API_KEY;

export const ALGOLIA_PLACES_INDEX =
  process.env.EXPO_PUBLIC_ALGOLIA_PLACES_INDEX ||
  "places";

if (
  !ALGOLIA_APP_ID ||
  !ALGOLIA_SEARCH_API_KEY
) {
  console.warn(
    "Faltan las variables públicas de Algolia."
  );
}

const algoliaClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY
);

export default algoliaClient;