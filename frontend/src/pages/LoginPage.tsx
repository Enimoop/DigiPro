import { useState, type FormEvent } from "react";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";

// Imports des assets
import logo from "../assets/logo.svg";
import marianneLogo from "../assets/marianne.svg";
import valdoiseLogo from "../assets/valdoise.png";
// Import de votre image de fond locale
import fond2 from "../assets/fond2.png";

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
      navigate("/home");
    } catch {
      setError("Identifiants invalides");
    }
  }

  return (
    <div 
      className="container-fluid d-flex align-items-center justify-content-center min-vh-100"
      style={{
        // Utilisation de l'image importée 'fond2' avec un léger voile sombre pour la lisibilité
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fond2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Conteneur vertical bridé à 420px pour aligner parfaitement le bloc et les logos */}
      <div className="d-flex flex-column align-items-center w-100" style={{ maxWidth: 420 }}>
        
        {/* Bloc central blanc (Formulaire de connexion) */}
        <div className="w-100 bg-white p-4 p-md-5 rounded shadow-lg">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="DigiPro"
              style={{ width: 180, height: "auto" }}
            />
          </div>

          <h1 className="h2 text-center mb-3">Se Connecter</h1>
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

            <div className="form-group mb-4">
              <Row className="mb-1">
                <Col>
                  <Form.Label className="small fw-bold">Mot de Passe</Form.Label>
                </Col>
                <Col xs="auto">
                  {/* Curseur par défaut ici car ce n'est pas un lien cliquable */}
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
                  onClick={() => setShowPwd((v) => !v)}
                  style={{ cursor: "pointer" }} // On garde le curseur main sur l'oeil car il est cliquable
                >
                  <FeatherIcon icon={showPwd ? "eye-off" : "eye"} size="1em" />
                </InputGroup.Text>
              </InputGroup>
            </div>

            {error && (
              <div className="text-danger text-center mb-3 small">{error}</div>
            )}

            <Button type="submit" size="lg" className="w-100 mb-4 shadow-sm">
              Se Connecter
            </Button>

            <p className="text-center mb-0">
              <small className="text-muted">
                Vous n'avez pas encore de compte ?{" "}
                <Link to="/register" className="fw-bold">Inscrivez-vous</Link>.
              </small>
            </p>
          </Form>
        </div>

        {/* Barre des logos partenaires alignée sur la largeur 420px */}
        <div 
          className="d-flex justify-content-around align-items-center mt-4 p-3 rounded shadow-sm w-100" 
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <img 
            src={marianneLogo} 
            alt="République Française" 
            style={{ height: "55px", width: "auto" }} 
          />
          <div style={{ width: "1px", height: "40px", backgroundColor: "#dee2e6" }}></div>
          <img 
            src={valdoiseLogo} 
            alt="Val d'Oise Le Département" 
            style={{ height: "50px", width: "auto" }} 
          />
        </div>

      </div>
    </div>
  );
}
