import { useState, type FormEvent } from "react";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.svg";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPwd, setShowPwd] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Identifiants invalides");
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div style={{ maxWidth: 420 }} className="w-100">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="DigiPro"
            style={{ width: 200, height: "auto" }}
          />
        </div>

        <h1 className="display-4 text-center mb-3">Se Connecter</h1>
        <p className="text-muted text-center mb-5">
          Les compétences numériques à la portée de tous.
        </p>

        <Form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nom@adresse.com"
              required
            />
          </div>

          <div className="form-group mb-4">
            <Row>
              <Col>
                <Form.Label>Mot de Passe</Form.Label>
              </Col>
              <Col xs="auto">
                <Form.Text className="small text-muted">
                  Mot de passe oublié ?
                </Form.Text>
              </Col>
            </Row>

            <InputGroup>
              <Form.Control
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
              />
              <InputGroup.Text
                  role="button"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPwd((v) => !v)}
                  style={{ cursor: "pointer" }}
                >
                  <FeatherIcon icon={showPwd ? "eye-off" : "eye"} size="1em" />
              </InputGroup.Text>
            </InputGroup>
          </div>

          {error && (
            <div className="text-danger text-center mb-3">{error}</div>
          )}

          <Button type="submit" size="lg" className="w-100 mb-3">
            Sign in
          </Button>

          <p className="text-center">
            <small className="text-muted">
              Vous n'avez pas encore de compte ?{" "}
              <Link to="/register">Inscrivez-vous</Link>.
            </small>
          </p>
        </Form>
      </div>
    </div>
  );
}
