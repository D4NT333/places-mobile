import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config";

let subtagsCacheByTagId = {};
let subtagsInFlightByTagId = {};

export async function getSubtagsByTagId(tagId) {
  if (!tagId) {
    throw new Error("getSubtagsByTagId requiere un tagId");
  }

  if (subtagsCacheByTagId[tagId]) {
    console.log("getSubtagsByTagId: memory cache hit ->", tagId);
    return subtagsCacheByTagId[tagId];
  }

  if (subtagsInFlightByTagId[tagId]) {
    console.log("getSubtagsByTagId: reusing in-flight promise ->", tagId);
    return subtagsInFlightByTagId[tagId];
  }

  subtagsInFlightByTagId[tagId] = (async () => {
    const totalStart = Date.now();

    const subtagsQuery = query(
      collection(db, "subtag"),
      where("isActive", "==", true),
      where("tagId", "==", tagId),
      orderBy("sortOrder", "asc")
    );

    const subtagsSnap = await getDocs(subtagsQuery);

    const subtags = subtagsSnap.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        label: data.label,
        tagId: data.tagId,
        sortOrder: data.sortOrder ?? 999,
      };
    });

    subtagsCacheByTagId[tagId] = subtags;

    console.log(
      "getSubtagsByTagId total:",
      tagId,
      Date.now() - totalStart,
      "ms"
    );

    return subtags;
  })();

  try {
    return await subtagsInFlightByTagId[tagId];
  } finally {
    subtagsInFlightByTagId[tagId] = null;
  }
}

export function clearSubtagsCache() {
  subtagsCacheByTagId = {};
  subtagsInFlightByTagId = {};
}