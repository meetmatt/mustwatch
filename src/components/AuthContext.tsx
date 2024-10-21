import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState(null);

  const checkLoginState = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken") as string;
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
        },
      );
      const user = await response.json();
      if (user) {
        setLoggedIn(true);
        setUser(user);
      }
    } catch (_) {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  );
};
