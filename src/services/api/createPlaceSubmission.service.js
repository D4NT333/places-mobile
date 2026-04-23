import client from "./client";

export default async function createPlaceSubmissionService(payload) {
  try {
    const response = await client.post("/api/place-submissions", payload);
    return response.data;
  } catch (error) {
    console.error(
      "createPlaceSubmissionService error:",
      error?.response?.data || error.message
    );
    throw error;
  }
}