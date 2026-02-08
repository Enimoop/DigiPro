import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Row, Col, ProgressBar } from "react-bootstrap";
import LessonCard from "../components/LessonCard";
import { modulesData } from "../nav/modulesData";
import { themesByModules } from "../nav/themesByModules";

export default function ModulePage() {
  const { moduleId } = useParams();
  if (!moduleId) return null;

  const module = modulesData.find((m) =>
    m.route.endsWith(moduleId ?? "")

  );

  const themes = themesByModules[moduleId as keyof typeof themesByModules] ?? [];

  if (!module) {
    return <div>Module introuvable</div>;
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
