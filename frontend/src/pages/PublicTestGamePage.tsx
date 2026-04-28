import { Button, Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import Header from "../components/Header";

const EMAIL_PREVIEW = {
  from: "support@banque-securite.com",
  subject: "Action requise sous 24h",
  body: "Votre compte est temporairement suspendu. Cliquez ici pour vérifier vos informations.",
};

export default function PublicTestGamePage() {
  return (
    <div className="main-content">
      <Container fluid className="py-5">
        <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>JEU</Header.Pretitle>
                <Header.Title>Détection de phishing (mock)</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>

        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">Progression</span>
              <span className="text-muted small">1 / 5</span>
            </div>
            <ProgressBar now={20} />
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header>
            <strong>Email reçu</strong>
          </Card.Header>
          <Card.Body>
            <div className="mb-2"><strong>De:</strong> {EMAIL_PREVIEW.from}</div>
            <div className="mb-2"><strong>Objet:</strong> {EMAIL_PREVIEW.subject}</div>
            <div className="text-muted">{EMAIL_PREVIEW.body}</div>
          </Card.Body>
        </Card>

        <Row className="g-3">
          <Col md={6}>
            <Button variant="danger" className="w-100" disabled>
              Phishing
            </Button>
          </Col>
          <Col md={6}>
            <Button variant="success" className="w-100" disabled>
              Légitime
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
