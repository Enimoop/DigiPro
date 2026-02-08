import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";

export default function UserPage() {
  return (
    <div>
          <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>Overview</Header.Pretitle>
                <Header.Title>Account</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>
        </div>
      );
}