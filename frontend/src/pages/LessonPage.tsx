// src/pages/LessonPage.tsx
import { Col, Row, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import LessonContent from "../components/LessonContent";
import LessonQuizGameStepper from "../components/LessonQuizGameStepper";
import { useModules } from "../modules/ModulesProvider";
import { getLessonDataByThemeSlug } from "../nav/contentLoaders";

export default function LessonPage() {
  const { moduleId, themeId } = useParams(); // slugs
  const { loading, error, getModule, getTheme } = useModules();

  if (!moduleId || !themeId) return <div>Page invalide</div>;

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Impossible de charger les modules : {error}
      </Alert>
    );
  }

  const module = getModule(moduleId);
  const theme = getTheme(moduleId, themeId);

  if (!module || !theme) return <div>Module ou thème introuvable</div>;

  const lessonData = getLessonDataByThemeSlug(themeId);
  if (!lessonData) return <div>Aucun contenu de leçon pour ce thème.</div>;

  return (
    <div>
      <Header className="mt-md-5">
        <Header.Body>
          <Row className="align-items-center">
            <Col>
              <Header.Pretitle>{module.title}</Header.Pretitle>
              <Header.Title>{theme.title}</Header.Title>
            </Col>
            <Col xs="auto">
              <LessonQuizGameStepper current="lesson" />
            </Col>
          </Row>
        </Header.Body>
      </Header>

      <LessonContent lessonData={lessonData} />
    </div>
  );
}