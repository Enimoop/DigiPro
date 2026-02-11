import Card from "react-bootstrap/Card";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import type { ModuleItem } from "../nav/modulesData";

type Props = { module: ModuleItem };

export default function ModuleComponent({ module }: Props) {
  const navigate = useNavigate();

  const go = () => navigate(module.route);

  return (
    <Card
      className="module-card text-center h-100 module-clickable"
      role="button"
      tabIndex={0}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      }}
    >
      <Card.Body className="d-flex flex-column align-items-center p-4">
        {/* Top */}
        <div className="w-100">
          <div className="icon-circle bg-purple-soft text-purple mb-3 mx-auto">
            <FeatherIcon icon={module.icon} className="feather-lg" />
          </div>

          <Card.Title as="h4" className="mb-2">
            {module.title}
          </Card.Title>

          <p className="text-muted mb-4 module-desc">
            {module.description ?? "Découvrir ce module et progresser pas à pas."}
          </p>
        </div>

        <div className="mt-auto">
          <span className="btn btn-sm btn-light btn-start">
            Commencer <FeatherIcon icon="arrow-right" className="ms-2 feather-xs" />
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}
