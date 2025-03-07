import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = localStorage.getItem("authToken");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  const verifyToken = (token:string): Promise<boolean> => {
    return fetch("http://localhost:8080/api/auth/verifyToken", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error("Error verifying token", error);
        return false;
      });
  };

  useEffect(() => {
    if (authToken) {
      // Verifica la validità del token chiamando l'endpoint del backend
      verifyToken(authToken)
        .then((isValid) => {
          setIsValidToken(isValid); // Imposta lo stato in base alla validità del token
        })
        .catch(() => {
          setIsValidToken(false); // In caso di errore, considera il token non valido
        });
    } else {
      setIsValidToken(false); // Se non c'è un token, considera non valido
    }
  }, [authToken]);

  if (isValidToken === null) {
    return <div>Loading...</div>; }

  if (!isValidToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
