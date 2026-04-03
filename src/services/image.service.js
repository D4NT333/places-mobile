import * as ImagePicker from "expo-image-picker";

export default async function pickImages() {
  try {
    // pedir permisos
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      throw new Error("Permiso denegado");
    }

    // abrir galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (result.canceled) {
      return [];
    }

    return result.assets; // 🔥 aquí vienen las imágenes
  } catch (error) {
    console.error("Error en pickImages:", error);
    throw error;
  }
}