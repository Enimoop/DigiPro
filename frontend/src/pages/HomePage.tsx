import Header from "../components/Header";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import ModuleComponent from "../components/ModuleComponent";
import { useModules } from "../modules/ModulesProvider";

export default function HomePage() {
  const { modules, loading, error } = useModules();

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

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <Spinner />
        </div>
      )}

      {error && <Alert variant="danger">Impossible de charger les modules: {error}</Alert>}

      {!loading && !error && (
        <Row className="g-5">
          {modules.map((m) => (
            <Col key={m.slug} xs={12} sm={6} lg={4}>
              <ModuleComponent module={m} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}