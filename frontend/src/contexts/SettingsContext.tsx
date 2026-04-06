import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Settings = {
  fontSize: number;       // 14–22
  darkMode: boolean;
  highContrast: boolean;
};

type SettingsContextType = Settings & {
  setFontSize: (v: number) => void;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
};

const STORAGE_KEY = "digipro_settings";

const defaults: Settings = { fontSize: 16, darkMode: false, highContrast: false };

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

const Ctx = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply to <html> so CSS can cascade everywhere
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSize}px`;
    root.classList.toggle("dark-mode", settings.darkMode);
    root.classList.toggle("high-contrast", settings.highContrast);
  }, [settings]);

  const ctx: SettingsContextType = {
    ...settings,
    setFontSize: (v) => setSettings((s) => ({ ...s, fontSize: v })),
    toggleDarkMode: () => setSettings((s) => ({ ...s, darkMode: !s.darkMode })),
    toggleHighContrast: () => setSettings((s) => ({ ...s, highContrast: !s.highContrast })),
  };

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
