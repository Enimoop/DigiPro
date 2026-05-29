import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../components/Header";

export default function PublicTestProfilePage() {
  return (
    <div className="main-content">
      <Container fluid className="py-5">
        <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>PROFIL</Header.Pretitle>
                <Header.Title>Mon profil (mock)</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>

        <Card className="mb-4">
          <Card.Header>
            <strong>Informations personnelles</strong>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control value="Marine" readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control value="Dupont" readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control value="marine.dupont@example.com" readOnly />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="purple" disabled>
                  Sauvegarder
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <strong>Mot de passe</strong>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe actuel</Form.Label>
                  <Form.Control type="password" value="***********" readOnly />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nouveau mot de passe</Form.Label>
                  <Form.Control type="password" value="***********" readOnly />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmer</Form.Label>
                  <Form.Control type="password" value="***********" readOnly />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-danger" disabled>
                Supprimer le compte
              </Button>
              <Button variant="outline-secondary" disabled>
                Se déconnecter
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
