import client from "../api/client";

export async function savePushTokenService({ idToken, expoPushToken }) {
  const response = await client.post(
    "/api/notifications/push-token",
    {
      expoPushToken,
      platform: "android",
    },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  return response.data;
}