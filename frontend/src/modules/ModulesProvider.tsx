import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api"; // <-- ton axios instance

export type ApiTheme = {
  slug: string;
  title: string;
  description: string;
  enabled: boolean;
  order: number;
};

export type ApiModule = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  order: number;
  themes: ApiTheme[];
};

type ModulesContextValue = {
  modules: ApiModule[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getModule: (slug: string) => ApiModule | undefined;
  getTheme: (moduleSlug: string, themeSlug: string) => ApiTheme | undefined;
};

const ModulesContext = createContext<ModulesContextValue | undefined>(undefined);

export function ModulesProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<ApiModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<ApiModule[]>("/api/modules/");
      setModules(res.data);
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.message ||
        e?.message ||
        "Erreur inconnue";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const value = useMemo<ModulesContextValue>(() => {
    const getModule = (slug: string) => modules.find((m) => m.slug === slug);
    const getTheme = (moduleSlug: string, themeSlug: string) =>
      getModule(moduleSlug)?.themes?.find((t) => t.slug === themeSlug);

    return {
      modules,
      loading,
      error,
      refresh: fetchModules,
      getModule,
      getTheme,
    };
  }, [modules, loading, error]);

  return <ModulesContext.Provider value={value}>{children}</ModulesContext.Provider>;
}

export function useModules() {
  const ctx = useContext(ModulesContext);
  if (!ctx) throw new Error("useModules must be used within ModulesProvider");
  return ctx;
}