import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Row,
  Col,
  ProgressBar,
  Container,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import LessonCard from "../components/LessonCard";
import { useModules } from "../modules/ModulesProvider";

export default function ModulePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { loading, error, getModule } = useModules();

  if (!moduleId) return null;

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Impossible de charger les modules : {error}</Alert>;
  }

  const module = getModule(moduleId);
  if (!module) return <div>Module introuvable</div>;

  if (!module.enabled) {
    return (
      <Container className="mt-6 text-center" style={{ maxWidth: 800 }}>
        <div
          className="p-5"
          style={{
            background: "#F6F0FF",
            border: "1px dashed #D9C7FF",
            borderRadius: 16,
          }}
        >
          <h2 className="fw-bold mb-3">🚧 En cours de développement</h2>
          <p className="text-muted fs-5 mb-4">
            Le module <strong>{module.title}</strong> n’est pas encore disponible.
          </p>

          <Button className="btn-purple px-5" onClick={() => navigate("/home")}>
            Retour aux modules
          </Button>
        </div>
      </Container>
    );
  }

  const themes = module.themes ?? [];

  return (
    <div>
      <Header className="mt-md-5">
        <Header.Body>
          <Row className="align-items-center">
            <Col>
              <Header.Pretitle>Module</Header.Pretitle>
              <Header.Title>{module.title}</Header.Title>
            </Col>
          </Row>

          <ProgressBar now={66} className="mt-3" />
        </Header.Body>
      </Header>

      {themes.map((theme, idx) => (
        <LessonCard
          key={theme.slug}
          stepNumber={idx + 1}
          moduleIcon={module.icon}
          theme={{
            id: theme.slug,
            title: theme.title,
            description: theme.description,
            route: `/modules/${module.slug}/${theme.slug}`,
          }}
        />
      ))}
    </div>
  );
}