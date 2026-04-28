import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import QuizComponent from "../components/QuizComponent";

const questions = [
  {
    id: "q1",
    question: "Quel élément est le plus suspect dans un email ?",
    options: [
      "Une signature complète",
      "Une demande urgente de mot de passe",
      "Une adresse officielle connue",
      "Un rappel de réunion",
    ] as const,
    correctIndex: 1 as const,
    explanation:
      "Les demandes urgentes de mot de passe sont un signal fort de phishing.",
  },
  {
    id: "q2",
    question: "Avant de cliquer sur un lien, que faut-il faire ?",
    options: [
      "Cliquer vite pour vérifier",
      "Le transférer à un collègue",
      "Survoler le lien pour vérifier l'URL",
      "Répondre à l'expéditeur",
    ] as const,
    correctIndex: 2 as const,
    explanation:
      "Le survol du lien permet de voir l'URL réelle et de détecter un domaine frauduleux.",
  },
  {
    id: "q3",
    question: "Que faire si tu as un doute sur un email ?",
    options: [
      "Saisir tes identifiants pour tester",
      "Ignorer totalement sans signaler",
      "Signaler au support ou à la DSI",
      "Partager sur messagerie instantanée",
    ] as const,
    correctIndex: 2 as const,
    explanation:
      "Le bon réflexe est de signaler le message afin de protéger les autres utilisateurs.",
  },
] as const;

export default function PublicTestQuizPage() {
  return (
    <div className="main-content">
      <Container fluid className="py-5">
        <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>QUIZ</Header.Pretitle>
                <Header.Title>Quiz public de test</Header.Title>
              </Col>
            </Row>
          </Header.Body>
        </Header>

        <QuizComponent questions={questions} />
      </Container>
    </div>
  );
}
