import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config";

let approachesCacheByTagId = {};
let approachesInFlightByTagId = {};

export async function getApproachesByTagId(tagId) {
  if (!tagId) {
    throw new Error("getApproachesByTagId requiere un tagId");
  }

  if (approachesCacheByTagId[tagId]) {
    console.log("getApproachesByTagId: memory cache hit ->", tagId);
    return approachesCacheByTagId[tagId];
  }

  if (approachesInFlightByTagId[tagId]) {
    console.log("getApproachesByTagId: reusing in-flight promise ->", tagId);
    return approachesInFlightByTagId[tagId];
  }

  approachesInFlightByTagId[tagId] = (async () => {
    const totalStart = Date.now();

    const approachesQuery = query(
      collection(db, "approach"),
      where("isActive", "==", true),
      where("tagId", "==", tagId),
      orderBy("sortOrder", "asc")
    );

    const approachesSnap = await getDocs(approachesQuery);

    const approaches = approachesSnap.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        label: data.label,
        tagId: data.tagId,
        sortOrder: data.sortOrder ?? 999,
      };
    });

    approachesCacheByTagId[tagId] = approaches;

    console.log(
      "getApproachesByTagId total:",
      tagId,
      Date.now() - totalStart,
      "ms"
    );

    return approaches;
  })();

  try {
    return await approachesInFlightByTagId[tagId];
  } finally {
    approachesInFlightByTagId[tagId] = null;
  }
}

export function clearApproachesCache() {
  approachesCacheByTagId = {};
  approachesInFlightByTagId = {};
}