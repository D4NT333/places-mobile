import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsService() {
  if (!Device.isDevice) {
    return {
      ok: false,
      token: null,
      reason: "Las notificaciones push requieren un dispositivo físico.",
    };
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return {
      ok: false,
      token: null,
      reason: "El usuario no concedió permiso de notificaciones.",
    };
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ||
    Constants?.easConfig?.projectId;

  if (!projectId) {
    return {
      ok: false,
      token: null,
      reason: "No se encontró el projectId de EAS.",
    };
  }

  const tokenResponse = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#538DE4",
    });
  }

  return {
    ok: true,
    token: tokenResponse.data,
    reason: null,
  };
}