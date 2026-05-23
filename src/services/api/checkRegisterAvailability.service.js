import client from "./client";

export default async function checkRegisterAvailabilityService({ email, name }) {
  const response = await client.post("/api/auth/register/availability", {
    email,
    name,
  });

  return response.data;
}