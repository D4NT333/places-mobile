import client from "../api/client";

export async function sendTestNotificationService({ idToken }) {
  const response = await client.post(
    "/api/notifications/test",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  return response.data;
}