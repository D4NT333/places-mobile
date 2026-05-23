import client from "./client";

export default async function checkLoginMethodService({
  email,
  requestedProvider,
}) {
  const cleanEmail = email.trim().toLowerCase();

  const response = await client.post("/api/auth/check-login-method", {
    email: cleanEmail,
    requestedProvider,
  });

  return response.data;
}