import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AuthCallback() {
  const called = useRef(false);
  const [codeVerifier] = useState(() => {
    const codeVerifier = localStorage.getItem("codeVerifier");
    return codeVerifier || "";
  });
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    (async () => {
      if (called.current) return; // prevent rerender caused by StrictMode
      called.current = true;
      const encodedCodeVerifier = encodeURIComponent(codeVerifier);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_HOST}auth/callback${window.location.search}&codeVerifier=${encodedCodeVerifier}`,
        );
        const { access_token, refresh_token } = await response.json();
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        Navigate({ to: "/movies" });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [codeVerifier]);

  return (
    <>
      <p>Thank you for signing in.</p>
      {codeVerifier && <p>Code verifier: {codeVerifier}</p>}
      {!called.current && <p>Verifying user...</p>}

      {accessToken && (
        <p>
          Access token: <code>{accessToken}</code>
        </p>
      )}

      {refreshToken && (
        <p>
          Refresh token: <code>{refreshToken}</code>
        </p>
      )}
    </>
  );
}
