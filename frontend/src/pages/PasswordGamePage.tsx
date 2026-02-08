import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useMemo, useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";

import { zxcvbn } from "@zxcvbn-ts/core";
import { dictionary, adjacencyGraphs } from "@zxcvbn-ts/language-common";

export default function PasswordGamePage() {
  const [password, setPassword] = useState("");

  // règles
  const hasMinLength = password.length >= 12;
  const hasNumber = /\d/.test(password);
  const hasUpperAndLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const scoreLabels = [
  "Très faible",
  "Faible",
  "Moyen",
  "Fort",
  "Très fort",
];

const scoreColors = [
  "text-danger",
  "text-warning",
  "text-secondary",
  "text-primary",
  "text-success",
];

  const zxcvbnResult = useMemo(() => {

    (zxcvbn as any).options?.setOptions?.({
      dictionary,
      graphs: adjacencyGraphs,
    });

    if (!password) return null;
    return zxcvbn(password);
  }, [password]);

  const estimateLabel = useMemo(() => {
    if (!zxcvbnResult) return "—";


    const seconds =
      zxcvbnResult.crackTimesSeconds.offlineSlowHashing1e4PerSecond;

    return formatDuration(seconds);
  }, [zxcvbnResult]);
  const scoreText = scoreLabels[zxcvbnResult?.score ?? 0];

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={10} lg={8} xl={6} className="text-center">
          <h1 className="mb-2">Créer votre mot de passe</h1>
          <p className="text-muted mb-4">En suivant les règles vues précédemment</p>

          <div className="d-flex justify-content-center mb-4">
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ maxWidth: 360 }}
            />
          </div>

          <Row className="justify-content-center g-4 mb-5">
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Form.Check type="switch" label="12 caractères minimum" checked={hasMinLength} disabled />
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Form.Check type="switch" label="Contient un chiffre" checked={hasNumber} disabled />
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Form.Check type="switch" label="Majuscule et minuscule" checked={hasUpperAndLower} disabled />
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Form.Check type="switch" label="Caractère spécial" checked={hasSpecialChar} disabled />
            </Col>
          </Row>

          <div className="d-flex justify-content-center">
            <Card style={{ minWidth: 320 }}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col className="text-start">
                    <h6 className="text-uppercase text-muted mb-2">
                      Temps estimé pour cracker le mdp
                    </h6>
                    <span className="h2 mb-0">{estimateLabel}</span>
                    {zxcvbnResult && (
                      <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                        <span className={`h2 mb-0 ${scoreColors[zxcvbnResult.score]}`}>
                          Score: {scoreText}
                        </span>
                      </div>
                    )}
                  </Col>
                  <Col xs="auto">
                    <FeatherIcon icon="clock" size="20" className="text-muted" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function formatDuration(seconds: number) {
  if (!isFinite(seconds) || seconds <= 0) return "—";
  if (seconds < 1) return "< 1s";
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const year = 365 * day;

  if (seconds < minute) return `${Math.round(seconds)}s`;
  if (seconds < hour) return `${Math.round(seconds / minute)} min`;
  if (seconds < day) return `${Math.round(seconds / hour)} h`;
  if (seconds < year) return `${Math.round(seconds / day)} j`;
  return `${Math.round(seconds / year)} ans`;
}
