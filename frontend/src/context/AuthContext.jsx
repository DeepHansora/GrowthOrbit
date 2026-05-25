import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "../services/authService.js";
import { getToken, removeToken, saveToken } from "../services/tokenService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(Boolean(getToken()));

  useEffect(() => {
    async function loadUserFromToken() {
      if (!token) {
        setUser(null);
        setIsCheckingAuth(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(token);
        setUser(currentUser);
      } catch {
        removeToken();
        setToken(null);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    loadUserFromToken();
  }, [token]);

  function login(accessToken) {
    saveToken(accessToken);
    setIsCheckingAuth(true);
    setToken(accessToken);
  }

  function logout() {
    removeToken();
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token) && (Boolean(user) || isCheckingAuth),
      isCheckingAuth,
      login,
      logout
    }),
    [token, user, isCheckingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
