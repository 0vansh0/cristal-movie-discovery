import { useEffect, useState } from "react";
import Button from "./UI/Button";

const ThemeToggle = ({ compact = false }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((s) => !s);

  return (
    <Button
      variant={compact ? "ghost" : "secondary"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={compact ? "h-9 w-9 p-0 text-base" : "h-11 w-11 p-0 text-lg"}
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
};

export default ThemeToggle;