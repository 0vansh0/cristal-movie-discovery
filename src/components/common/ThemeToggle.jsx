import { Moon } from "lucide-react";

// Theme toggle removed — app is dark-only.
export default function ThemeToggle() {
  return (
    <div
      className="theme-toggle-static"
      aria-hidden="true"
      title="Dark theme only"
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}
    >
      <Moon size={16} />
    </div>
  );
}
