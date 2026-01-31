import Header from "../components/Header";
import { Row, Col, ProgressBar } from "react-bootstrap";
import LessonCard from "../components/LessonCard";

export default function CyberPage() {
  return (
    <div>
          <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>Module</Header.Pretitle>
                <Header.Title>Cybersécurité</Header.Title>
              </Col>
            </Row>
            <ProgressBar now={66} className="mt-3" />
          </Header.Body>
        </Header>
        <LessonCard />
        </div>
      );
}