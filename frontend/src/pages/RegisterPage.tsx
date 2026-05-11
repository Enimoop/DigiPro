import { useState, type FormEvent } from "react";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";
import { isUnsafeInput } from "../utils/inputSafety";

// Imports des assets
import logo from "../assets/logo.svg";
import prefetlogo from "../assets/prefetvaldoise.webp";
import egaliteLogo from "../assets/egalite.webp";
import entrepriselogo from "../assets/entreprise.webp";
import fond2 from "../assets/fond2.webp";
const MIN_PASSWORD_LENGTH = 12;

function getRegisterErrorMessage(error: any): string {
  const data = error?.response?.data;

  const firstValue = (value: unknown): string | null => {
    if (typeof value === "string") return value;
    if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    return null;
  };

  const apiMessage =
    firstValue(data?.email) ||
    firstValue(data?.detail) ||
    firstValue(data?.non_field_errors) ||
    (typeof data === "string" ? data : null);

  if (!apiMessage) {
    return error?.message || "Erreur";
  }

  if (
    apiMessage === "Impossible de creer un compte avec cet email." ||
    apiMessage.toLowerCase().includes("already used") ||
    apiMessage.toLowerCase().includes("deja utilise")
  ) {
    return "Impossible de créer le compte avec cet email.";
  }

  return apiMessage;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPwd, setShowPwd] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (isUnsafeInput(email) || isUnsafeInput(password) || isUnsafeInput(passwordConfirm)) {
      setError("Les champs ne doivent pas contenir de balises HTML.");
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError("Le mot de passe doit contenir au moins 12 caractères.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await register(email, password, passwordConfirm);
      navigate("/home");
    } catch (e: any) {
      setError(getRegisterErrorMessage(e));
    }
  }

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fond2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Conteneur vertical bridé à 420px */}
      <div className="d-flex flex-column align-items-center w-100" style={{ maxWidth: 420 }}>

        {/* Bloc central blanc */}
        <div className="w-100 bg-white p-4 p-md-5 rounded shadow-lg">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="DigiPro"
              style={{ width: 180, height: "auto" }}
            />
          </div>

          <h1 className="h2 text-center mb-3">S'inscrire</h1>
          <p className="text-muted text-center mb-4 small">
            Les compétences numériques à la portée de tous.
          </p>

          <Form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <Form.Label className="small fw-bold">Adresse email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@adresse.com"
                required
              />
            </div>

            <div className="form-group mb-3">
              <Row className="mb-1">
                <Col>
                  <Form.Label className="small fw-bold">Mot de passe</Form.Label>
                </Col>
                <Col xs="auto">
                  <Form.Text className="small text-muted">12 caractères minimum</Form.Text>
                </Col>
              </Row>
              <InputGroup>
                <Form.Control
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  minLength={MIN_PASSWORD_LENGTH}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowPwd((v) => !v)}
                  style={{ cursor: "pointer" }}
                >
                  <FeatherIcon icon={showPwd ? "eye-off" : "eye"} size="1em" />
                </InputGroup.Text>
              </InputGroup>
            </div>

            <div className="form-group mb-4">
              <Form.Label className="small fw-bold">Confirmer le mot de passe</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPwd ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Confirmez votre mot de passe"
                  minLength={MIN_PASSWORD_LENGTH}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowPwd((v) => !v)}
                  style={{ cursor: "pointer" }}
                >
                  <FeatherIcon icon={showPwd ? "eye-off" : "eye"} size="1em" />
                </InputGroup.Text>
              </InputGroup>
            </div>

            {error && (
              <div className="text-danger text-center mb-3 small">{error}</div>
            )}

            <Button type="submit" size="lg" className="w-100 mb-4 shadow-sm">
              Créer mon compte
            </Button>

            <p className="text-center mb-0">
              <small className="text-muted">
                Vous avez déjà un compte ?{" "}
                <Link to="/login" className="fw-bold">Connectez-vous</Link>.
              </small>
            </p>
          </Form>
        </div>

        {/* Barre des logos partenaires alignée (420px) */}
        <div
          className="d-flex justify-content-around align-items-center mt-4 p-3 rounded shadow-sm w-100"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <img
            src={prefetlogo}
            alt="Préfecture du Val d'Oise"
            style={{ height: "55px", width: "auto" }}
          />
          <div style={{ width: "1px", height: "40px", backgroundColor: "#dee2e6" }}></div>
          <img
            src={egaliteLogo}
            alt="Egalité des chances"
            style={{ height: "55px", width: "auto" }}
          />
          <div style={{ width: "1px", height: "40px", backgroundColor: "#dee2e6" }}></div>
          <img
            src={entrepriselogo}
            alt="Entreprises"
            style={{ height: "50px", width: "auto" }}
          />
        </div>

      </div>
    </div>
  );
}
