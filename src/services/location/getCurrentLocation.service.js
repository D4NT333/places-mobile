import * as Location from "expo-location";

export default async function getCurrentLocationService() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permiso de ubicación denegado");
  }

  const currentLocation = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
 
  return {
    latitude: currentLocation.coords.latitude,
    longitude: currentLocation.coords.longitude,
    accuracy: currentLocation.coords.accuracy,
  };
}