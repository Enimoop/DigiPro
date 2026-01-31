import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LessonCard() {
  const navigate = useNavigate();

  return (
    <div>
      <Row className="align-items-center g-4 flex-nowrap">
        <Col xs={6} md={8} className="d-flex justify-content-center">
          <div className="text-center text-md-start">
            <h2 className="lesson-title mb-2">
              <span className="lesson-title-underline">Étape 1</span>
            </h2>
            <p className="mb-0 text-muted">Un mot de passe sécurisé</p>
          </div>
        </Col>

        <Col xs={6} md={4} className="d-flex justify-content-center">
          <Card className="module-card lesson-card text-center w-100" style={{ maxWidth: 190 }}>
            <Card.Body className="d-flex flex-column align-items-center p-3">
              <div className="module-icon mb-2">
                <FeatherIcon icon="lock" size={100} />
              </div>

              <div className="d-flex gap-2 mt-2 w-100 justify-content-center">
                <Button size="sm" className="flex-grow-1" onClick={() => navigate("/modules/cybersecurite/password-game")}>
                  Start
                </Button>
                <Button variant="outline-secondary" size="sm" className="flex-grow-1">
                  Infos
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="section-divider" />
    </div>
  );
}
