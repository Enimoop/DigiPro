import { Col, Row } from "react-bootstrap";
import Header from "../components/Header";
import LessonContent from "../components/LessonContent";

export default function LessonPage() {
  return (
    <div>
    <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>Cybersécurité</Header.Pretitle>
                <Header.Title>Créer un mot de passe sécurisé</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>
        <LessonContent />
    </div>
  );
}