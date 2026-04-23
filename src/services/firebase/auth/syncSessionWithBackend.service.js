import client from "../../api/client";

export default async function syncSessionWithBackendService({ idToken }) {
  try {
    const response = await client.post(
      "/api/auth/session",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "syncSessionWithBackendService error:",
      error?.response?.data || error.message
    );
    throw error;
  }
}