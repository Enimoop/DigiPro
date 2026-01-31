import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Collapse, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.svg";

type NavItem = {
  id: string;
  title: string;
  url?: string;
  icon?: string;
  children?: NavItem[];
  heading?: boolean; 
};

type Props = {
  items: NavItem[];
};

export default function Sidenav({ items }: Props) {
  const location = useLocation();

  const activeId = useMemo(() => {
    const findActive = (list: NavItem[]): string | null => {
      for (const it of list) {
        if (it.url && location.pathname === it.url) return it.id;
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

  const renderItems = (list: NavItem[]) => {
    return list.map((it, idx) => (
      <div key={it.id}>
        {idx > 0 && <hr className="navbar-divider" />}

        {it.heading && <h6 className="navbar-heading">{it.title}</h6>}

        {!it.heading && (
          <Nav className="flex-column">
            {renderSubitems([it])}
          </Nav>
        )}
      </div>
    ));
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
              `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
            }
            onClick={() => setOpenId(it.id)}
          >
            {it.icon && <FeatherIcon icon={it.icon} size="17" className="me-2" />}
            {it.title}
          </NavLink>
        )}
      </Nav.Item>
    ));
  };

  const footer = (
  <div className="navbar-user mt-auto mb-md-4">
    <Nav className="flex-row justify-content-around">
      <Nav.Link as="button" className="navbar-user-link" style={{ background: "transparent", border: 0 }}>
        <FeatherIcon icon="bell" size="17" />
      </Nav.Link>

      <NavLink to="/user" className="navbar-user-link nav-link">
        <FeatherIcon icon="user" size="17" />
      </NavLink>

      <Nav.Link as="button" className="navbar-user-link" style={{ background: "transparent", border: 0 }}>
        <FeatherIcon icon="search" size="17" />
      </Nav.Link>
    </Nav>
  </div>
);


  return (
    <Navbar expand="md" className="navbar-vertical fixed-start" collapseOnSelect>
      <Container fluid>
        <Navbar.Toggle />

        <Navbar.Brand as={NavLink} to="/dashboard">
          <img className="navbar-brand-img" src={logo} alt="DigiPro" />
        </Navbar.Brand>

        <Navbar.Collapse>
          {renderItems(items)}
          {footer}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
