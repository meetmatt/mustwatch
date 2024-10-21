import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const called = useRef(false);
  const [codeVerifier] = useState(() => {
    const codeVerifier = localStorage.getItem("codeVerifier");
    return codeVerifier || "";
  });
  const navigate = useNavigate();

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
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        localStorage.removeItem("codeVerifier");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    })();
  }, [codeVerifier]);

  return;
}
