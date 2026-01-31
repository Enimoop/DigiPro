import { api } from "../api";

/* =======================
   Types
======================= */

type Credentials = {
  username: string;
  password: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

type User = {
  id: number;
  username: string;
  email: string | null;
  is_staff?: boolean;
};

/* =======================
   CSRF
======================= */

export async function initCsrf(): Promise<void> {
  // Pose le cookie csrftoken
  await api.get("/api/csrf/");
}

/* =======================
   Auth
======================= */

export async function login({
  username,
  password,
}: Credentials): Promise<void> {
  await initCsrf();
  await api.post("/api/auth/login/", { username, password });
}

export async function register({
  username,
  email,
  password,
}: RegisterPayload): Promise<void> {
  await initCsrf();
  await api.post("/api/auth/register/", { username, email, password });

  // option : auto-login
  await login({ username, password });
}

export async function logout(): Promise<void> {
  await initCsrf();
  await api.post("/api/auth/logout/");
}

export async function fetchMe(): Promise<User> {
  const res = await api.get<User>("/api/me/");
  return res.data;
}
