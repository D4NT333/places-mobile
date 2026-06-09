import { getAuth, onAuthStateChanged } from "firebase/auth";
import client from "../../client";

function waitForFirebaseUser(timeoutMs = 5000) {
  const auth = getAuth();

  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser);
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      unsubscribe();
      reject(new Error("No se pudo obtener el usuario autenticado."));
    }, timeoutMs);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(timeout);
      unsubscribe();

      if (!user) {
        reject(new Error("No hay usuario autenticado."));
        return;
      }

      resolve(user);
    });
  });
}

export default async function getCurrentUserService() {
  const firebaseUser = await waitForFirebaseUser();

  const token = await firebaseUser.getIdToken();

  const response = await client.get("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.user || null;
}