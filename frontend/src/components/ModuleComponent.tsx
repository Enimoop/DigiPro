import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import type { ModuleItem } from "../nav/modulesData";
type Props = { module: ModuleItem };


export default function ModuleComponent({ module }: Props) {
  const navigate = useNavigate();
  return (
     <Card className="module-card text-center h-1000">
      <Card.Body className="d-flex flex-column align-items-center justify-content-between p-4 ">
        <div>
          <div className="module-icon mb-3">
            <FeatherIcon icon={module.icon} size={150} />
          </div>

          <Card.Title as="h2" className="mb-0">
            {module.title}
          </Card.Title>
        </div>

        <Button size="sm" variant="purple" className="mt-3" onClick={() => navigate(module.route)}>
          Commencer
        </Button>
      </Card.Body>
    </Card>
  );
}
