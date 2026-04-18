import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Collapse, Container, Nav, Navbar, Spinner, Modal, Row, Col } from "react-bootstrap";
import logo from "../assets/logo.svg";
import SettingsMenu from "./SettingsMenu";
import { useModules, type ApiModule } from "../contexts/ModulesProvider";
import marianne from "../assets/marianne.svg";
import valdoise from "../assets/valdoise.png";

type NavItem = {
  id: string;
  title: string;
  url?: string;
  icon?: string;
  children?: NavItem[];
  heading?: boolean;
  disabled?: boolean;
};

export default function Sidenav() {
  const location = useLocation();
  const { modules, loading, error } = useModules();
  const [showAboutModal, setShowAboutModal] = useState(false);

  const items: NavItem[] = useMemo(() => {
    const moduleChildren: NavItem[] = (modules ?? []).map((m: ApiModule) => ({
      id: `module-${m.slug}`,
      title: m.title,
      url: `/modules/${m.slug}`,
      icon: m.icon || "grid",
      disabled: !m.enabled,
    }));

    return [
      { id: "home", title: "Home", url: "/home", icon: "home" },
      { id: "modules", title: "Modules", icon: "grid", children: moduleChildren },
    ];
  }, [modules]);

  const activeId = useMemo(() => {
    const findActive = (list: NavItem[]): string | null => {
      for (const it of list) {
        if (it.url && location.pathname.startsWith(it.url)) return it.id;
        if (it.children) {
          const r = findActive(it.children);
          if (r) return r;
        }
      }
      return null;
    };
    return findActive(items) ?? items[0]?.id ?? "";
  }, [items, location.pathname]);

  const [openId, setOpenId] = useState<string>(activeId);

  const isParentOfActive = (node: NavItem, targetId: string): boolean => {
    if (!node.children) return false;
    if (node.children.some((c) => c.id === targetId)) return true;
    return node.children.some((c) => isParentOfActive(c, targetId));
  };

  const isExpanded = (it: NavItem) => {
    if (it.id === openId) return true;
    return isParentOfActive(it, activeId);
  };

  const renderSubitems = (list: NavItem[]) => {
    return list.map((it) => (
      <Nav.Item key={it.id}>
        {it.children?.length ? (
          <>
            <Nav.Link
              role="button"
              onClick={() => setOpenId((prev) => (prev === it.id ? "" : it.id))}
              className="d-flex align-items-center"
            >
              {it.icon && <FeatherIcon icon={it.icon} size="17" className="me-2" />}
              {it.title}
              <FeatherIcon
                icon="chevron-down"
                size="1em"
                className={`ms-auto nav-chevron ${isExpanded(it) ? "active" : ""}`}
              />
            </Nav.Link>

            <Collapse in={isExpanded(it)}>
              <div>
                <div className="nav nav-sm flex-column">
                  {it.children.map((child) => renderSubitems([child]))}
                </div>
              </div>
            </Collapse>
          </>
        ) : (
          <NavLink
            to={it.url || "#"}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active" : ""} ${it.disabled ? "disabled opacity-50" : ""
              }`
            }
            onClick={(e) => {
              if (it.disabled) {
                e.preventDefault();
                return;
              }
              setOpenId(it.id);
            }}
            aria-disabled={it.disabled ? true : undefined}
            tabIndex={it.disabled ? -1 : 0}
          >
            {it.icon && <FeatherIcon icon={it.icon} size="17" className="me-2" />}
            {it.title}
          </NavLink>
        )}
      </Nav.Item>
    ));
  };

  const renderItems = (list: NavItem[]) => {
    return list.map((it, idx) => (
      <div key={it.id}>
        {idx > 0 && <hr className="navbar-divider" />}
        {!it.heading && <Nav className="flex-column">{renderSubitems([it])}</Nav>}
      </div>
    ));
  };

  const footer = (
    <div className="navbar-user mt-auto mb-md-4">
      <Nav className="flex-row justify-content-around">
        <Nav.Link
          data-tour="bottom-about"
          as="button"
          className="navbar-user-link"
          onClick={() => setShowAboutModal(true)}
          style={{ background: "transparent", border: 0 }}
        >
          <FeatherIcon icon="info" size="17" />
        </Nav.Link>

        <NavLink
          data-tour="bottom-profile"
          to="/user"
          className="navbar-user-link nav-link"
        >
          <FeatherIcon icon="user" size="17" />
        </NavLink>

        <div data-tour="bottom-settings">
          <SettingsMenu />
        </div>
      </Nav>
    </div>
  );

  return (
    <>
      <Navbar
        expand="md"
        className="navbar-vertical fixed-start"
        collapseOnSelect
        data-tour="nav-sidebar"
      >
        <Container fluid>
          <Navbar.Toggle data-tour="burger" />

          {/* Logo DigiPro (inchangé) */}
          <Navbar.Brand as={NavLink} to="/dashboard">
            <img className="navbar-brand-img" src={logo} alt="DigiPro" />
          </Navbar.Brand>

          {/* Logos partenaires PLUS GROS */}
          <div className="d-flex justify-content-center gap-4 mt-3 mb-3 px-3">
            <img
              src={marianne}
              alt="République Française"
              style={{ height: 42, width: "auto" }}
            />
            <img
              src={valdoise}
              alt="Val d’Oise"
              style={{ height: 42, width: "auto" }}
            />
          </div>

          <Navbar.Collapse>
            {loading && (
              <div className="d-flex align-items-center gap-2 px-3 py-3 text-muted">
                <Spinner size="sm" />
                <span>Chargement…</span>
              </div>
            )}

            {error && (
              <div className="px-3 py-3 text-danger small">
                Impossible de charger les modules
              </div>
            )}

            {!loading && renderItems(items)}
            {footer}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* À propos Modal */}
      <Modal show={showAboutModal} onHide={() => setShowAboutModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>À propos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-4 mb-5">
            {[
              { name: "Marine Forcioli", role: "Ingénierie Logicielle et Management des SI", icon: "user" },
              { name: "Noah Sochandamandon", role: "Ingénierie Logicielle et Management des SI", icon: "user" },
              { name: "Clément Philippe", role: "Ingénieur Cybersécurité", icon: "user" },
              { name: "Josselin Matthieu", role: "Ingénieur Cybersécurité", icon: "user" },
              { name: "Willem Szwarc-leguillier", role: "IA & BigData", icon: "user" },
              { name: "Amine Kheddaoui", role: "IA & BigData", icon: "user" },
            ].map((person, idx) => (
              <Col xs={12} md={6} key={idx}>
                <div className="text-center">
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: "#F0F1FB",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <FeatherIcon icon={person.icon} size={40} className="text-purple" />
                  </div>
                  <h6 className="mb-1 fw-bold" style={{ fontSize: "1.05rem" }}>{person.name}</h6>
                  <p className="text-muted small">{person.role}</p>
                </div>
              </Col>
            ))}
          </Row>

          {/* Description text */}
          <div className="border-top pt-4">
            <h5 className="fw-bold mb-3">À propos de DigiPro</h5>
            <p className="text-muted mb-0" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
              DigiPro est une plateforme éducative conçue pour apprendre les fondamentaux de l'informatique et de la cybersécurité.
              <br />
              <br />
              Développée par un groupe d'étudiants en Master 2 de l'ESIEE-IT dans le cadre du ProjectLab, elle s'adresse spécifiquement à ceux qui éprouvent des difficultés avec les bases de l'informatique.
              <br />
              <br />
              Grâce à des modules interactifs, des quiz engageants et des jeux éducatifs, DigiPro rend l'apprentissage accessible, ludique et progressif.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}