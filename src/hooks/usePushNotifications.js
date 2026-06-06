import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";

import { registerForPushNotificationsService } from "../services/notifications/registerForPushNotifications.service";
import { savePushTokenService } from "../services/notifications/savePushToken.service";

export function usePushNotifications(user) {
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    if (!user) return;

    const setupPushNotifications = async () => {
      try {
        const result = await registerForPushNotificationsService();

        if (!result.ok) {
          console.log("Push notifications no activadas:", result.reason);
          return;
        }

        const idToken = await user.getIdToken();

        await savePushTokenService({
          idToken,
          expoPushToken: result.token,
        });

        console.log("Expo push token guardado:", result.token);
      } catch (error) {
        console.log("Error configurando push notifications:", error);
      }
    };

    setupPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notificación recibida:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Usuario tocó la notificación:", response);

        const data = response.notification.request.content.data;

        console.log("Data de notificación:", data);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }

      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [user]);
}