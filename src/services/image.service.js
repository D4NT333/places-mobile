import * as ImagePicker from "expo-image-picker";

export default async function pickSingleImage() {
  try {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      throw new Error("Permiso denegado");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      selectionLimit: 1,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets?.[0] || null;
  } catch (error) {
    console.log("Error en pickSingleImage:", error);
    throw error;
  }
}