import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";
import QuizComponent from "../components/QuizComponent";
import { useNavigate, useParams } from "react-router-dom";

import { modulesData } from "../nav/modulesData";
import { themesByModules } from "../nav/themesByModules";
import { quizByTheme } from "../nav/QuizByTheme";

export default function QuizPage() {
  const navigate = useNavigate();
  const { moduleId, themeId } = useParams();

  if (!moduleId || !themeId) {
    return <div>Page invalide</div>;
  }

  const module = modulesData.find((m) => m.id === moduleId);
  const themes = themesByModules[moduleId as keyof typeof themesByModules] ?? [];
  const theme = themes.find((t) => t.id === themeId);

  // 🔥 récup du quiz data depuis themeId
  const questions = quizByTheme[themeId as keyof typeof quizByTheme];

  if (!module || !theme) {
    return <div>Module ou thème introuvable</div>;
  }

  if (!questions) {
    return <div>Aucune donnée de quiz pour ce thème.</div>;
  }

  return (
    <>
      <Header className="mt-md-5">
        <Header.Body>
          <Row className="align-items-center">
            <Col>
              <Header.Pretitle>{module.title}</Header.Pretitle>
              <Header.Title>{theme.title}</Header.Title>
            </Col>
          </Row>
        </Header.Body>
      </Header>

      <QuizComponent
        questions={questions}
        onFinish={({ correct, total }) => {
          console.log("Résultat:", correct, "/", total);
        }}
        onGoToGame={() => navigate(`/modules/${moduleId}/${themeId}/game`)}
      />
    </>
  );
}
