import { useState, type FormEvent } from "react";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.svg";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (e: any) {
      setError(
        e?.response?.data
          ? typeof e.response.data === "string"
            ? e.response.data
            : JSON.stringify(e.response.data)
          : e?.message || "Erreur"
      );
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
        <div style={{ maxWidth: 420 }} className="w-100">
          <h1 className="display-4 text-center mb-3">S'inscrire</h1>
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
                  <Form.Label>Mot de passe</Form.Label>
                </Col>
                <Col xs="auto">
                  <Form.Text className="small text-muted">
                    Utilisez un mot de passe fort
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

            <div className="form-group mb-4">
              <Row>
                <Col>
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                </Col>
                <Col xs="auto">
                  <Form.Text className="small text-muted">
                    Utilisez un mot de passe fort
                  </Form.Text>
                </Col>
              </Row>

              <InputGroup>
                <Form.Control
                  type={showPwd ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Confirm your password"
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

            {error && <div className="text-danger text-center mb-3">{error}</div>}

            <Button type="submit" size="lg" className="w-100 mb-3">
              Sign up
            </Button>

            <p className="text-center">
              <small className="text-muted text-center">
                Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link>.
              </small>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
