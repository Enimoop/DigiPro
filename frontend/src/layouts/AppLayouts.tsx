// layouts/AppLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { navData } from "../nav/navData";
import { Col, Container } from "react-bootstrap";

const HIDE_NAV_ON = ["/login", "/register", "/reset-password"];

export default function AppLayout() {
  const { pathname } = useLocation();
  const hideNav = HIDE_NAV_ON.some((p) => pathname.startsWith(p));

  if (hideNav) return <Outlet />;

  return (
    <>
      <Sidenav items={navData as any} />
      <div className="main-content">
        <Container fluid>
          <div className="justify-content-center row">
            <Col xs={12} lg={10} xl={8}>
              <Outlet />
            </Col>
          </div>
        </Container>
      </div>
    </>
  );
}
