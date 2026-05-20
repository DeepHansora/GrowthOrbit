import { createContext, useContext } from "react";

// Placeholder for future app-wide state such as logged-in user data.
const AppContext = createContext(null);

export function AppProvider({ children }) {
  return <AppContext.Provider value={{ appName: "GrowthOrbit" }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
