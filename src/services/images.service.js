import * as ImagePicker from "expo-image-picker";

export default async function pickImages() {
  try {
    const t0 = Date.now();

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log("Permisos:", Date.now() - t0, "ms");

    if (!permissionResult.granted) {
      throw new Error("Permiso denegado");
    }

    const t1 = Date.now();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: 6,
    });

    console.log("Picker completo:", Date.now() - t1, "ms");

    if (result.canceled) {
      return [];
    }

    console.log("Assets devueltos:", result.assets?.length ?? 0);

    return result.assets;
  } catch (error) {
    console.error("Error en pickImages:", error);
    throw error;
  }
}