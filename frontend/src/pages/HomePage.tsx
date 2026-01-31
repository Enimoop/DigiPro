import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";
import ModuleComponent from "../components/ModuleComponent";
import { modulesData } from "../nav/modulesData";

export default function HomePage() {
  return (
    <div>
          <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>Home</Header.Pretitle>
                <Header.Title>Modules</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>
         <Row className="g-5">
        {modulesData.map((m) => (
          <Col key={m.id} xs={12} sm={6} md={4}>
            <ModuleComponent module={m} />
          </Col>
        ))}
      </Row>


        </div>
      );
}