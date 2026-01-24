import { useAuth } from "../auth/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Dashboard</h1>

      <p>
        Connecté en tant que <b>{user?.username}</b>
      </p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
