import { getTagsService } from "./firestore/tags/getTags.service";
import { getSubtagsByTagId } from "./firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "./firestore/approaches/getApproachesByTagId.service";

let catalogsWarmupPromise = null;
let catalogsWarmupDone = false;

export async function warmCatalogsCache() {
  if (catalogsWarmupDone) {
    console.log("warmCatalogsCache: cache ya precalentada");
    return;
  }

  if (catalogsWarmupPromise) {
    console.log("warmCatalogsCache: reutilizando warmup en curso");
    return catalogsWarmupPromise;
  }

  catalogsWarmupPromise = (async () => {
    const totalStart = Date.now();

    console.log("warmCatalogsCache: iniciando");

    const tags = await getTagsService();

    await Promise.all(
      tags.map(async (tag) => {
        await Promise.all([
          getSubtagsByTagId(tag.id),
          getApproachesByTagId(tag.id),
        ]);
      })
    );

    catalogsWarmupDone = true;

    console.log(
      "warmCatalogsCache: completado en",
      Date.now() - totalStart,
      "ms"
    );
  })();

  try {
    return await catalogsWarmupPromise;
  } catch (error) {
    console.log("warmCatalogsCache error:", error);
    throw error;
  } finally {
    catalogsWarmupPromise = null;
  }
}

export function clearCatalogsWarmupState() {
  catalogsWarmupPromise = null;
  catalogsWarmupDone = false;
}