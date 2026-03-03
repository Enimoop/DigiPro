// layouts/AppLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { Col, Container } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";
import OnboardingTour from "../components/OnBoardingTour";

const HIDE_NAV_ON = ["/login", "/register", "/reset-password"];

export default function AppLayout() {
  const { pathname } = useLocation();
  const hideNav = HIDE_NAV_ON.some((p) => pathname.startsWith(p));

  const { shouldShowOnboarding, dismissOnboarding } = useAuth();
  const isMobile = window.matchMedia("(max-width: 991px)").matches;

  if (hideNav) return <Outlet />;

  return (
    <>
      <div
        data-tour="tour-center"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: 1,
          height: 1,
          pointerEvents: "none",
          opacity: 0,
        }}
      />

      <OnboardingTour
        open={shouldShowOnboarding}
        isMobile={isMobile}
        onClose={dismissOnboarding}
      />

      <Sidenav />

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