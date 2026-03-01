import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "../api";

/* =======================
   Types
======================= */

export type User = {
  id: number;
  username: string;
  email: string | null;
  is_staff?: boolean;
  has_seen_onboarding: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;

  shouldShowOnboarding: boolean;

  dismissOnboarding: () => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

/* =======================
   Context
======================= */

const AuthContext = createContext<AuthContextType | null>(null);

/* =======================
   Provider
======================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadMe(): Promise<void> {
    try {
      const res = await api.get<User>("/api/me/");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await api.get("/api/csrf/");
        await loadMe();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const shouldShowOnboarding = useMemo(() => {
    return !!user && user.has_seen_onboarding === false;
  }, [user]);

  async function login(email: string, password: string): Promise<void> {
    await api.get("/api/csrf/");
    await api.post("/api/auth/login/", { email, password });
    await loadMe();
  }

  async function register(email: string, password: string): Promise<void> {
    await api.get("/api/csrf/");
    await api.post("/api/auth/register/", { email, password });
    await login(email, password);
  }

  async function logout(): Promise<void> {
    await api.post("/api/auth/logout/");
    setUser(null);
  }

  async function dismissOnboarding(): Promise<void> {
    try {
      await api.get("/api/csrf/");

      await api.post("/api/onboarding/complete/");

      setUser((prev) =>
        prev ? { ...prev, has_seen_onboarding: true } : prev
      );
    } catch (e) {
      console.error("Failed to complete onboarding", e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        shouldShowOnboarding,
        dismissOnboarding,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =======================
   Hook
======================= */

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}