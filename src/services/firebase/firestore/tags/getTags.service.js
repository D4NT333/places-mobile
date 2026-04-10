import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config";
import { icons } from "../../../../../assets/icons";

const TAG_ICON_MAP = {
  tag_art: icons.art,
  tag_entertainment: icons.entertainment,
  tag_gastronomy: icons.gastronomy,
  tag_learning: icons.learning,
  tag_lodging: icons.lodging,
  tag_nature: icons.nature,
  tag_service: icons.service,
  tag_shopping: icons.shopping,
  tag_sport: icons.sport,
};

function normalizePriceConfig(priceConfig) {
  return {
    hasFreeOption: priceConfig?.hasFreeOption ?? false,
    defaultValue: priceConfig?.defaultValue ?? 0,
    ranges: Array.isArray(priceConfig?.ranges) ? priceConfig.ranges : [],
  };
}

// =========================
// CACHE EN MEMORIA
// =========================
let tagsCache = null;
let inFlightPromise = null;
let lastFetchTime = 0;

// Puedes cambiar esto:
// 10 minutos = 10 * 60 * 1000
// toda la sesión = Infinity
const TAGS_CACHE_TTL_MS = Infinity;

function isCacheValid() {
  if (!tagsCache) return false;
  return Date.now() - lastFetchTime < TAGS_CACHE_TTL_MS;
}

async function fetchTagsFromFirestore() {
  const totalStart = Date.now();

  const firestoreStart = Date.now();
  const tagsQuery = query(
    collection(db, "tag"),
    where("isActive", "==", true),
    orderBy("sortOrder", "asc")
  );

  const tagsSnap = await getDocs(tagsQuery);
  console.log("Firestore tags:", Date.now() - firestoreStart, "ms");

  const tags = tagsSnap.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      label: data.label,
      iconSource: TAG_ICON_MAP[docSnap.id] ?? null,
      price: normalizePriceConfig(data.priceConfig),
      sortOrder: data.sortOrder ?? 999,
    };
  });

  tagsCache = tags;
  lastFetchTime = Date.now();

  console.log("getTags total:", Date.now() - totalStart, "ms");

  return tags;
}

export async function getTagsService({ forceRefresh = false } = {}) {
  // 1. Si ya hay cache válida, úsala
  if (!forceRefresh && isCacheValid()) {
    console.log("getTagsService: memory cache hit");
    return tagsCache;
  }

  // 2. Si ya hay una consulta corriendo, reutilízala
  if (!forceRefresh && inFlightPromise) {
    console.log("getTagsService: reusing in-flight promise");
    return inFlightPromise;
  }

  // 3. Si no hay cache ni consulta corriendo, ahora sí consulta Firestore
  console.log("getTagsService: fetching from Firestore");

  inFlightPromise = fetchTagsFromFirestore();

  try {
    const result = await inFlightPromise;
    return result;
  } catch (error) {
    console.log("getTagsService error:", error);
    throw error;
  } finally {
    inFlightPromise = null;
  }
}

// Precargar cache sin bloquear la UI
export function warmTagsCache() {
  if (isCacheValid()) {
    console.log("warmTagsCache: cache ya válida");
    return;
  }

  if (inFlightPromise) {
    console.log("warmTagsCache: ya hay una consulta en curso");
    return;
  }

  getTagsService().catch((error) => {
    console.log("warmTagsCache error:", error);
  });
}

// Por si algún día quieres limpiar manualmente
export function clearTagsCache() {
  tagsCache = null;
  inFlightPromise = null;
  lastFetchTime = 0;
}