// src/pages/LessonPage.tsx
import { Col, Row, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import LessonContent from "../components/LessonContent";
import LessonQuizGameStepper from "../components/LessonQuizGameStepper";
import { useModules } from "../contexts/ModulesProvider";
import { getLessonDataByThemeSlug } from "../nav/contentLoaders";
import { startThemeProgress, getThemeProgress } from "../api";

export default function LessonPage() {
  const { moduleId, themeId } = useParams(); 
  const { loading, error, getModule, getTheme } = useModules();

  useEffect(() => {
    const recordStart = async () => {
      const theme = getTheme(moduleId!, themeId!);
      if (theme && theme.id) {
        try {
          await getThemeProgress(theme.id);
        } catch (err: any) {
          if (err?.response?.status === 404) {
            try {
              await startThemeProgress(theme.id);
            } catch (createErr) {
              console.error("Failed to record progress start:", createErr);
            }
          } else {
            console.error("Error checking progress:", err);
          }
        }
      }
    };

    if (!loading && moduleId && themeId) {
      recordStart();
    }
  }, [loading, moduleId, themeId, getTheme]);

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