import * as Location from "expo-location";

export async function getCurrentLocationService() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permiso de ubicación denegado");
  }

  const currentLocation = await Location.getCurrentPositionAsync({});
 
  return {
    latitude: currentLocation.coords.latitude,
    longitude: currentLocation.coords.longitude,
    accuracy: currentLocation.coords.accuracy,
  };
}