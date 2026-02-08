import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Row, Col, ProgressBar } from "react-bootstrap";
import LessonCard from "../components/LessonCard";
import { modulesData } from "../nav/modulesData";
import { themesByModules } from "../nav/themesByModules";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ModulePage() {
  const { moduleId } = useParams();
  if (!moduleId) return null;

  const module = modulesData.find((m) =>
    m.route.endsWith(moduleId ?? "")

  );

  const themes = themesByModules[moduleId as keyof typeof themesByModules] ?? [];
  const navigate = useNavigate();

  if (!module) {
    return <div>Module introuvable</div>;
  }

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

          <Button
            className="btn-purple px-5"
            onClick={() => navigate("/home")}
          >
            Retour aux modules
          </Button>
        </div>
      </Container>
    );
  }

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
          key={theme.id}
          stepNumber={idx + 1}
          moduleIcon={module.icon}
          theme={theme}
        />
      ))}
    </div>
  );
}
