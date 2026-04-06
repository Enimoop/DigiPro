import { useState } from "react";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import Header from "./Header";
import LessonQuizGameStepper from "./LessonQuizGameStepper";
import { PHISHING_EMAILS } from "../nav/phishingEmails";

type Props = {
  themeId?: string;
};

const EMAILS = PHISHING_EMAILS;

export default function PhishingGameComponent({ }: Props) {
  const navigate = useNavigate();
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [answered, setAnswered] = useState(false);

  const currentEmail = EMAILS[currentEmailIndex];
  const progress = ((currentEmailIndex + 1) / EMAILS.length) * 100;

  const handleAnswer = (answer: "phishing" | "ok") => {
    const isCorrect = answer === (currentEmail.isPhishing ? "phishing" : "ok");

    setFeedback(isCorrect ? "correct" : "wrong");
    setAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleContinue = () => {
    if (currentEmailIndex < EMAILS.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
      setFeedback(null);
      setAnswered(false);
    } else {
      setGameFinished(true);
    }
  };

  if (gameFinished) {
    return (
      <>
        <Header className="mt-md-5">
          <Header.Body>
            <Row className="align-items-center">
              <Col>
                <Header.Pretitle>Jeu</Header.Pretitle>
                <Header.Title>Détection de Phishing</Header.Title>
              </Col>
              <Col xs="auto">
                <LessonQuizGameStepper current="game" />
              </Col>
            </Row>
          </Header.Body>
        </Header>

        <Container fluid className="d-flex align-items-center" style={{ minHeight: "calc(100vh - 300px)" }}>
          <Row className="justify-content-center w-100">
            <Col xs={12} md={8} lg={6} className="text-center">
              <div className="mb-4">
                <FeatherIcon icon="check-circle" size={64} className="text-success" />
              </div>
              <h2 className="mb-3">Excellent !</h2>
              <p className="text-muted mb-4">
                Tu as identifié {score} email(s) correctement sur {EMAILS.length}.
              </p>

              <div className="d-flex gap-2 justify-content-center">
                <Button variant="primary" onClick={() => navigate("/home")}>
                  Retour aux modules
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header className="mt-md-5">
        <Header.Body>
          <Row className="align-items-center">
            <Col>
              <Header.Pretitle>Jeu</Header.Pretitle>
              <Header.Title>Détection de Phishing</Header.Title>
            </Col>
            <Col xs="auto">
              <LessonQuizGameStepper current="game" />
            </Col>
          </Row>
        </Header.Body>
      </Header>

      <Container fluid className="d-flex align-items-center" style={{ minHeight: "calc(100vh - 300px)" }}>
        <Row className="justify-content-center w-100">
          <Col xs={12} md={10} lg={8} xl={7}>
            {/* Progression */}
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Progression</span>
                <span className="text-muted small">
                  {currentEmailIndex + 1} / {EMAILS.length}
                </span>
              </div>
              <ProgressBar now={progress} className="phishing-progress" />
            </div>

            <h2 className="text-center mb-4">Cet email est-il du phishing ?</h2>

            {/* Email réaliste */}
            <div
              className={`phishing-email-container ${feedback ? `feedback-${feedback}` : ""}`}
              style={{
                opacity: feedback ? 1 : 1,
              }}
            >
              {/* Barre d'en-tête email */}
              <div className="phishing-email-header">
                <div className="phishing-email-from">
                  <div className="phishing-avatar">
                    {currentEmail.from.charAt(0)}
                  </div>
                  <div>
                    <div className="phishing-email-name">{currentEmail.from}</div>
                    <div className="phishing-email-addr">{currentEmail.fromEmail}</div>
                  </div>
                </div>
                <span className="phishing-email-time">Aujourd'hui</span>
              </div>

              {/* Sujet */}
              <div className="phishing-email-subject">{currentEmail.subject}</div>

              {/* Corps */}
              <div className="phishing-email-body">{currentEmail.body}</div>
            </div>

            {/* Feedback et justification */}
            {feedback && (
              <div className={`alert alert-${feedback === "correct" ? "success" : "danger"} mt-4`}>
                <strong>
                  {feedback === "correct" ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."}
                </strong>
                <p className="mb-2 mt-2">
                  {currentEmail.isPhishing ? "C'était bien du phishing" : "C'était un email légitime"}
                </p>

                {/* Red flags (indices) */}
                {currentEmail.redFlags.length > 0 && (
                  <div className="phishing-red-flags-inline">
                    <strong className="d-block mb-2">🚩 Signaux d'alerte :</strong>
                    <ul className="mb-0">
                      {currentEmail.redFlags.map((flag, i) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Boutons d'action */}
            <Row className="g-2 mt-5">
              {!answered ? (
                <>
                  <Col xs={6}>
                    <Button
                      variant="outline-danger"
                      className="w-100"
                      onClick={() => handleAnswer("phishing")}
                    >
                      Phishing
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button
                      variant="outline-success"
                      className="w-100"
                      onClick={() => handleAnswer("ok")}
                    >
                      Légitime
                    </Button>
                  </Col>
                </>
              ) : (
                <Col xs={12}>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleContinue}
                  >
                    Prochain email
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
