import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:8000" : "",
  withCredentials: true,
});

// ---- Progress API ----

export type UserProgress = {
  id: number;
  theme: number;
  theme_slug: string;
  theme_title: string;
  module_slug: string;
  completed: boolean;
  progress_pct: number;
  started_at: string;
  updated_at: string;
};

/**
 * Create or start progress tracking for a theme
 * Initializes started_at automatically on creation
 */
export const startThemeProgress = async (themeId: number): Promise<UserProgress> => {
  const res = await api.post(`/api/progress/${themeId}/`, {
    completed: false,
    progress_pct: 0,
  });
  return res.data;
};

/**
 * Update quiz score for a theme
 */
export const updateQuizScore = async (
  themeId: number,
  scorePercent: number
): Promise<UserProgress> => {
  const res = await api.put(`/api/progress/${themeId}/`, {
    progress_pct: scorePercent,
  });
  return res.data;
};

/**
 * Mark a theme as completed (game finished)
 */
export const completeTheme = async (themeId: number): Promise<UserProgress> => {
  const res = await api.put(`/api/progress/${themeId}/`, {
    completed: true,
  });
  return res.data;
};

/**
 * Get all progress for the current user
 */
export const getUserProgress = async (): Promise<UserProgress[]> => {
  const res = await api.get("/api/progress/");
  return res.data;
};

/**
 * Get progress for a specific theme
 */
export const getThemeProgress = async (themeId: number): Promise<UserProgress> => {
  const res = await api.get(`/api/progress/${themeId}/`);
  return res.data;
};

export type MeUser = {
  id: number;
  username: string;
  email: string | null;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
  has_seen_onboarding: boolean;
};

export type UpdateProfilePayload = {
  first_name: string;
  last_name: string;
  email: string;
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export const updateProfileInfo = async (payload: UpdateProfilePayload): Promise<MeUser> => {
  const res = await api.patch("/api/me/profile/", payload);
  return res.data;
};

export const changeUserPassword = async (payload: ChangePasswordPayload): Promise<{ detail: string }> => {
  const res = await api.post("/api/me/password/", payload);
  return res.data;
};

// ---- Auth API ----

let isRefreshing = false;
let queue: Array<(ok: boolean) => void> = [];

function flush(ok: boolean) {
  queue.forEach((cb) => cb(ok));
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    const is401 = error.response?.status === 401;
    const code = error.response?.data?.code;
    const isExpired = code === "token_not_valid";

    const url = original?.url || "";
    const isAuthRoute =
      url.includes("/api/auth/login/") ||
      url.includes("/api/auth/refresh/") ||
      url.includes("/api/auth/logout/") ||
      url.includes("/api/csrf/");

    if (!is401 || !isExpired || isAuthRoute) return Promise.reject(error);
    if (original._retry) return Promise.reject(error);
    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((ok) => (ok ? resolve(api(original)) : reject(error)));
      });
    }

    isRefreshing = true;
    try {
      await api.post("/api/auth/refresh/");
      flush(true);
      return api(original);
    } catch (e) {
      flush(false);
      window.location.href = "/login";
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
