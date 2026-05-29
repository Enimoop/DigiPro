import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function PublicTestIndexPage() {
  return (
    <div className="main-content">
      <Container fluid className="py-5">
        <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>TEST PUBLIC</Header.Pretitle>
                <Header.Title>Routes de test sobriété</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>

        <Card>
          <Card.Body>
            <p className="text-muted mb-4">
              Ces routes sont mockées pour les mesures EcoIndex sans authentification.
            </p>

            <ListGroup>
              <ListGroup.Item action as={Link} to="/public-test/lesson">
                /public-test/lesson
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/public-test/quiz">
                /public-test/quiz
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/public-test/profile">
                /public-test/profile
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/public-test/game">
                /public-test/game
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/public-resources">
                /public-resources (cours + quiz réels)
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
