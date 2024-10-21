import { useEffect, useState } from "react";
import { Button } from "flowbite-react";

export default function AuthLogin() {
  const [codeVerifier, setCodeVerifier] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async () => {
    try {
      setMessage("You are being redirected to Google...");
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}auth/login`,
      );
      const { redirect_uri, code_verifier } = await response.json();

      setCodeVerifier(code_verifier);

      console.log("Redirecting", redirect_uri);
      window.location.assign(redirect_uri);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    console.log("Saving codeVerifier", codeVerifier);
    localStorage.setItem("codeVerifier", codeVerifier);
  }, [codeVerifier]);

  return (
    <>
      <h3>Login to Dashboard</h3>
      {message.length > 0 ? (
        <p>{message}</p>
      ) : (
        <Button onClick={handleLogin}>Sign in with Google</Button>
      )}
    </>
  );
}
