import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Collapse, Container, Nav, Navbar, Spinner } from "react-bootstrap";
import logo from "../assets/logo.svg";
import AboutModal from "./AboutModal";
import SettingsMenu from "./SettingsMenu";
import { useModules, type ApiModule } from "../contexts/ModulesProvider";
import prefetlogo from "../assets/prefetvaldoise.webp";
import egaliteLogo from "../assets/egalite.webp";
import entrepriselogo from "../assets/entreprise.webp";

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

          <Navbar.Brand>
            <img className="navbar-brand-img" src={logo} alt="DigiPro" />
          </Navbar.Brand>

          <div className="d-flex justify-content-center gap-4 mt-3 mb-3 px-3">
            <img
              src={prefetlogo}
              alt="Préfecture du Val d'Oise"
              style={{ height: 42, width: "auto" }}
            />
            <img
              src={egaliteLogo}
              alt="Egalité des chances"
              style={{ height: 42, width: "auto" }}
            />
            <img
              src={entrepriselogo}
              alt="Entreprises"
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

      <AboutModal show={showAboutModal} onHide={() => setShowAboutModal(false)} />
    </>
  );
}