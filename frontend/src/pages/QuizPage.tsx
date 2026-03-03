// src/pages/QuizPage.tsx
import Header from "../components/Header";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import QuizComponent from "../components/QuizComponent";
import { useNavigate, useParams } from "react-router-dom";
import LessonQuizGameStepper from "../components/LessonQuizGameStepper";
import { useModules } from "../modules/ModulesProvider";
import { getQuizDataByThemeSlug } from "../nav/contentLoaders";

export default function QuizPage() {
  const navigate = useNavigate();
  const { moduleId, themeId } = useParams();
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

  const quizData = getQuizDataByThemeSlug(themeId);
  if (!quizData) return <div>Aucune donnée de quiz pour ce thème.</div>;

  const themesWithGame = [
    "passwords",
  ];

  const hasGame = themesWithGame.includes(themeId);

  return (
    <>
      <Header className="mt-md-5">
        <Header.Body>
          <Row className="align-items-center">
            <Col>
              <Header.Pretitle>{module.title}</Header.Pretitle>
              <Header.Title>{theme.title}</Header.Title>
            </Col>
            <Col xs="auto">
              <LessonQuizGameStepper current="quiz" />
            </Col>
          </Row>
        </Header.Body>
      </Header>

      <QuizComponent
        questions={quizData.questions}
        onFinish={({ correct, total }) => {
          console.log("Résultat:", correct, "/", total);
        }}
        onGoToGame={
          hasGame
            ? () => navigate(`/modules/${moduleId}/${themeId}/game`)
            : undefined
        }
      />
    </>
  );
}