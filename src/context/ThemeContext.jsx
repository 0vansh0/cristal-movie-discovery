import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Force dark-only theme
  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("dark");
    root.classList.remove("light");

    try {
      localStorage.setItem("cristal-theme", "dark");
    } catch (e) {
      // ignore
    }
  }, []);

  const value = {
    theme: "dark",
    setTheme: () => {},
    toggleTheme: () => {},
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
