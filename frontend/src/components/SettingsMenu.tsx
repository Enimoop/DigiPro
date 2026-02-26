import { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Nav } from "react-bootstrap";
import { useSettings } from "../settings/SettingsContext";

export default function SettingsMenu() {
  const { fontSize, setFontSize, darkMode, toggleDarkMode, highContrast, toggleHighContrast } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <Nav.Link
        as="button"
        className="navbar-user-link"
        style={{ background: "transparent", border: 0 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Paramètres"
      >
        <FeatherIcon icon="settings" size="17" />
      </Nav.Link>

      {open && (
        <div className="settings-popup">
          <h6 className="mb-3">Paramètres</h6>

          {/* Font size */}
          <Form.Label className="d-flex justify-content-between mb-1" style={{ fontSize: "0.8rem" }}>
            <span>Taille de police</span>
            <span>{fontSize}px</span>
          </Form.Label>
          <Form.Range
            min={12}
            max={24}
            step={1}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="mb-3"
          />

          {/* Dark mode */}
          <Form.Check
            type="switch"
            id="setting-dark"
            label="Mode nuit"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="mb-2"
          />

          {/* High contrast */}
          <Form.Check
            type="switch"
            id="setting-contrast"
            label="Haut contraste"
            checked={highContrast}
            onChange={toggleHighContrast}
          />
        </div>
      )}
    </div>
  );
}
