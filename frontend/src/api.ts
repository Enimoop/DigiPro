import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:8000" : "",
  withCredentials: true,
});

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
