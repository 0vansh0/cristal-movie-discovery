import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Download,
  Globe,
  Monitor,
  Moon,
  Palette,
  PlayCircle,
  Save,
  Shield,
  Sun,
  Trash2,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { getProfile, updatePreferences, getUserStats } from "../services/userService";
import "./SettingsPage.css";

const defaultSettings = {
  language: "English",
  notifications: true,
  autoplay: true,
  adultContent: false,
  homePage: "Home",
  themeStyle: "Dark",
};

function loadSettings() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("cristalSettings") || "null"
    );

    return saved && typeof saved === "object"
      ? { ...defaultSettings, ...saved }
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function SettingRow({ icon, title, description, children }) {
  return (
    <div className="settings-row">
      <div className="settings-row-info">
        <span className="settings-row-icon">{icon}</span>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="settings-row-control">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${checked ? "is-on" : ""}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState(loadSettings);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadRemoteSettings() {
      try {
        const profile = await getProfile().catch(() => null);
        const stats = await getUserStats().catch(() => ({}) );
        const preferences = profile?.preferences || {};

        if (!active) return;

        setSettings((current) => ({
          ...defaultSettings,
          ...current,
          ...preferences,
          stats,
        }));
      } catch {
        // local storage stays as fallback when backend is unavailable
      }
    }

    loadRemoteSettings();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setSettings((current) => ({
      ...current,
      themeStyle:
        theme === "dark" ? "Dark" : "Light",
    }));
  }, [theme]);

  function updateSetting(key, value) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
    setSaveMessage("");
  }

  function chooseTheme(value) {
    updateSetting("themeStyle", value);

    if (
      (value === "Dark" && theme !== "dark") ||
      (value === "Light" && theme === "dark")
    ) {
      toggleTheme();
    }
  }

  async function saveSettings() {
    localStorage.setItem(
      "cristalSettings",
      JSON.stringify(settings)
    );

    try {
      await updatePreferences({
        language: settings.language,
        notifications: settings.notifications,
        autoplay: settings.autoplay,
        adultContent: settings.adultContent,
        homePage: settings.homePage,
        themeStyle: settings.themeStyle,
      });
    } catch {
      // keep local persistence even if backend is unavailable
    }

    setSaveMessage("Saved");
    window.setTimeout(() => setSaveMessage(""), 2200);
  }

  function exportData() {
    const data = {
      settings,
      favorites: localStorage.getItem("cristal-favorites") || "[]",
      watchlist: localStorage.getItem("cristal-watchlist") || "[]",
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cristal-data.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="settings-page">
      <section className="settings-shell">
        <motion.header
          className="settings-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="settings-kicker">YOUR PREFERENCES</p>
          <h1>Settings</h1>
          <p>Small choices that make CRISTAL feel more like yours.</p>
        </motion.header>

        <div className="settings-content">
          <section className="settings-section">
            <div className="settings-section-heading">
              <span>01</span>
              <div>
                <h2>Appearance</h2>
                <p>Choose how the app looks when you open it.</p>
              </div>
            </div>

            <SettingRow
              icon={theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              title="Theme"
              description="Switch between a darker and lighter reading experience."
            >
              <button type="button" className="settings-outline-button" onClick={() => chooseTheme(theme === "dark" ? "Light" : "Dark")}>
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </SettingRow>

            <SettingRow
              icon={<Monitor size={18} />}
              title="Starting page"
              description="Choose the first page you see."
            >
              <select className="settings-select" value={settings.homePage} onChange={(event) => updateSetting("homePage", event.target.value)}>
                <option>Home</option>
                <option>Movies</option>
                <option>TV Shows</option>
                <option>Trending</option>
                <option>Watchlist</option>
              </select>
            </SettingRow>
          </section>

          <section className="settings-section">
            <div className="settings-section-heading">
              <span>02</span>
              <div>
                <h2>Watching</h2>
                <p>Control the parts of the experience that move.</p>
              </div>
            </div>

            <SettingRow icon={<Globe size={18} />} title="Language" description="Choose the language used around the app.">
              <select className="settings-select" value={settings.language} onChange={(event) => updateSetting("language", event.target.value)}>
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>Japanese</option>
              </select>
            </SettingRow>

            <SettingRow icon={<Bell size={18} />} title="Notifications" description="Get occasional alerts about movies you may like.">
              <Toggle checked={settings.notifications} onChange={() => updateSetting("notifications", !settings.notifications)} label="Toggle notifications" />
            </SettingRow>

            <SettingRow icon={<PlayCircle size={18} />} title="Autoplay trailers" description="Let trailers begin automatically when available.">
              <Toggle checked={settings.autoplay} onChange={() => updateSetting("autoplay", !settings.autoplay)} label="Toggle trailer autoplay" />
            </SettingRow>

            <SettingRow icon={<Shield size={18} />} title="Adult content" description="Include mature results in searches and recommendations.">
              <Toggle checked={settings.adultContent} onChange={() => updateSetting("adultContent", !settings.adultContent)} label="Toggle adult content" />
            </SettingRow>
          </section>

          <section className="settings-section">
            <div className="settings-section-heading">
              <span>03</span>
              <div>
                <h2>Theme style</h2>
                <p>Pick the visual tone you prefer.</p>
              </div>
            </div>

            <div className="theme-options">
              {["Dark", "Light", "System"].map((item) => (
                <button key={item} type="button" onClick={() => item !== "System" && chooseTheme(item)} className={settings.themeStyle === item ? "active" : ""}>
                  <Palette size={17} />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="settings-section settings-account-section">
            <div className="settings-section-heading">
              <span>04</span>
              <div>
                <h2>Account</h2>
                <p>Manage your local CRISTAL data.</p>
              </div>
            </div>

            <div className="settings-account-actions">
              <button type="button" onClick={exportData}><Download size={17} /> Export data</button>
              <button type="button" className="danger"><Trash2 size={17} /> Delete local data</button>
            </div>
          </section>
        </div>

        <footer className="settings-footer">
          {saveMessage && <span role="status">{saveMessage}</span>}
          <button type="button" className="settings-save-button" onClick={saveSettings}><Save size={17} /> Save changes</button>
        </footer>
      </section>
    </main>
  );
}