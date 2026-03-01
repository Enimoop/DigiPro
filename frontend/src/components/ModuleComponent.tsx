import Card from "react-bootstrap/Card";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";

type Module = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
};

type Props = {
  module: Module;
  tourId?: string;
};

export default function ModuleComponent({ module, tourId }: Props) {
  const navigate = useNavigate();

  const go = () => {
    if (!module.enabled) return;
    navigate(`/modules/${module.slug}`);
  };

  return (
    <Card
      data-tour={tourId}
      className={`module-card text-center h-100 module-clickable ${
        !module.enabled ? "opacity-50" : ""
      }`}
      role="button"
      tabIndex={module.enabled ? 0 : -1}
      onClick={go}
      onKeyDown={(e) => {
        if (!module.enabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      }}
    >
      <Card.Body className="d-flex flex-column align-items-center p-4">
        <div className="w-100">
          <div className="icon-circle bg-purple-soft text-purple mb-3 mx-auto">
            <FeatherIcon icon={module.icon || "box"} className="feather-lg" />
          </div>

          <Card.Title as="h4" className="mb-2">
            {module.title}
          </Card.Title>

          <p className="text-muted mb-4 module-desc">
            {module.description || "Découvrir ce module et progresser pas à pas."}
          </p>
        </div>

        <div className="mt-auto">
          <span
            className={`btn btn-sm ${
              module.enabled ? "btn-light" : "btn-secondary"
            } btn-start`}
          >
            {module.enabled ? "Commencer" : "Bientôt disponible"}
            {module.enabled && (
              <FeatherIcon icon="arrow-right" className="ms-2 feather-xs" />
            )}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}