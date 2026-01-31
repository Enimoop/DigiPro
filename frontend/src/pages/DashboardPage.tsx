import { useAuth } from "../auth/AuthContext";
import Header from "../components/Header";
export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (

    
    <div>
      <Header className="pb-4">
        <Header.Body>
          <Header.Pretitle>OVERVIEW</Header.Pretitle>
          <Header.Title>Account</Header.Title>
        </Header.Body>
      </Header>
      <h1>Dashboard</h1>

      <p>
        Connecté en tant que <b>{user?.username}</b>
      </p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
