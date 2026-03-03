import Card from "react-bootstrap/Card";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
  stepNumber: number;
  moduleIcon: string;
  theme: {
    id: string;
    title: string;
    description: string;
    route: string;
  };
};

export default function LessonCard({ stepNumber, moduleIcon, theme }: Props) {
  const navigate = useNavigate();

  const go = () => {
    navigate(`${theme.route}/lesson`);
  };

  return (
    <div>
      <Row className="align-items-center g-4 flex-nowrap">
        <Col xs={6} md={8} className="d-flex justify-content-center">
          <div className="text-center text-md-start">
            <h2 className="lesson-title mb-2">
              <span className="lesson-title-underline">Étape {stepNumber}</span>
            </h2>
            <p className="mb-0 text-muted">{theme.description}</p>
          </div>
        </Col>

        <Col xs={6} md={4} className="d-flex justify-content-center">
          <Card
            className="module-card text-center h-100 module-clickable lesson-card w-100"
            style={{ maxWidth: 240 }}
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
              <div className="w-100">
                <div className="icon-circle bg-purple-soft text-purple mb-3 mx-auto">
                  <FeatherIcon icon={moduleIcon || "grid"} className="feather-lg" />
                </div>

                <Card.Title as="h4" className="mb-2">
                  {theme.title}
                </Card.Title>
              </div>

              <div className="mt-auto">
                {/* même style de bouton que modules */}
                <span className="btn btn-sm btn-start">
                  Commencer
                  <FeatherIcon icon="arrow-right" className="ms-2 feather-xs" />
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="section-divider" />
    </div>
  );
}