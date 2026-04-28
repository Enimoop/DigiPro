import { useEffect, useState } from "react";
import Header from "../components/Header";
import MaskedPasswordInput from "../components/MaskedPasswordInput";
import { Accordion, Badge, Button, Col, Container, Form, ProgressBar, Row, Spinner } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useModules } from "../contexts/ModulesProvider";
import { changeUserPassword, getUserProgress, updateProfileInfo } from "../api";
import { useAuth } from "../auth/AuthContext";
import type { UserProgress } from "../api";

export default function UserPage() {
  const { user, refreshUser, logout } = useAuth();
  const { modules, loading: modulesLoading } = useModules();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getUserProgress();
        setProgress(data);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      } finally {
        setProgressLoading(false);
      }
    };

    fetchProgress();
  }, []);

  useEffect(() => {
    setFirstName(user?.first_name || "");
    setLastName(user?.last_name || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileSaving(true);
    setProfileMessage(null);
    setProfileError(null);

    try {
      await updateProfileInfo({
        first_name: firstName,
        last_name: lastName,
        email,
      });
      await refreshUser();
      setProfileMessage("Profil mis à jour.");
    } catch (error: any) {
      const apiError =
        error?.response?.data?.email?.[0] ||
        error?.response?.data?.detail ||
        "Impossible de mettre à jour le profil.";
      setProfileError(apiError);
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordSaving(true);
    setPasswordMessage(null);
    setPasswordError(null);

    try {
      await changeUserPassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setPasswordMessage("Mot de passe mis à jour.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const data = error?.response?.data;
      const apiError =
        data?.current_password?.[0] ||
        data?.new_password?.[0] ||
        data?.confirm_password?.[0] ||
        data?.detail ||
        "Impossible de mettre à jour le mot de passe.";
      setPasswordError(apiError);
    } finally {
      setPasswordSaving(false);
    }
  };

  const progressMap = Object.fromEntries(progress.map((item) => [item.theme, item]));

  const moduleStats = modules.map((module) => {
    const moduleThemes = module.themes || [];
    const completedCount = moduleThemes.filter((theme) => progressMap[theme.id]?.completed).length;
    const totalCount = moduleThemes.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      module,
      completedCount,
      totalCount,
      progressPercent,
    };
  });

  return (
    <div className="main-content">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Header className="mt-md-5">
              <Header.Body>
                <Row className="align-items-center">
                  <Col>
                    <Header.Title>Mon profil</Header.Title>
                  </Col>
                </Row>
              </Header.Body>
            </Header>

            <form onSubmit={handleProfileSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="form-group">
                    <Form.Label className="mb-1">Adresse mail</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                </Col>
              </Row>
              {profileError && <div className="text-danger mb-3">{profileError}</div>}
              {profileMessage && <div className="text-success mb-3">{profileMessage}</div>}
              <Button type="submit" disabled={profileSaving}>
                {profileSaving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </form>

            <hr className="my-5" />
            <Header.Secondary>Changer de mot de passe</Header.Secondary>

            <form onSubmit={handlePasswordSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Mot de passe actuel</Form.Label>
                    <MaskedPasswordInput
                      value={currentPassword}
                      onValueChange={setCurrentPassword}
                      required
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Nouveau mot de passe</Form.Label>
                    <MaskedPasswordInput
                      value={newPassword}
                      onValueChange={setNewPassword}
                      required
                    />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <MaskedPasswordInput
                      value={confirmPassword}
                      onValueChange={setConfirmPassword}
                      required
                    />
                  </div>
                </Col>
              </Row>

              {passwordError && <div className="text-danger mb-3">{passwordError}</div>}
              {passwordMessage && <div className="text-success mb-3">{passwordMessage}</div>}
              <Button type="submit" disabled={passwordSaving}>
                {passwordSaving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </form>

            <hr className="my-5" />
            <Header.Secondary>Mes Progrès</Header.Secondary>

              {modulesLoading || progressLoading ? (
                <div className="py-4 d-flex justify-content-center">
                  <Spinner />
                </div>
              ) : (
                <div className="mt-4">
                  <Accordion defaultActiveKey="0">
                    {moduleStats.map(({ module, completedCount, totalCount, progressPercent }, idx) => (
                      <Accordion.Item eventKey={String(idx)} key={module.slug}>
                        <Accordion.Header>
                          <Row className="w-100 align-items-center g-3">
                            <Col md={6}>
                              <div className="d-flex align-items-center gap-3">
                                <FeatherIcon icon={module.icon || "grid"} size={20} />
                                <div>
                                  <div className="fw-bold">{module.title}</div>
                                  <div className="text-muted small">
                                    {completedCount}/{totalCount} thèmes complétés
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md={6}>
                              <ProgressBar
                                now={progressPercent}
                                label={`${progressPercent}%`}
                                style={{ height: 20 }}
                              />
                            </Col>
                          </Row>
                        </Accordion.Header>

                        <Accordion.Body>
                          <div>
                            {module.themes?.map((theme) => {
                              const themeProgress = progressMap[theme.id];

                              return (
                                <div
                                  key={theme.id}
                                  className="d-flex justify-content-between align-items-center py-2 border-top"
                                >
                                  <div>
                                    <div className="fw-semibold">{theme.title}</div>
                                    {themeProgress && (
                                      <div className="small text-muted mt-1">
                                        Quiz: {themeProgress.progress_pct}%
                                      </div>
                                    )}
                                  </div>

                                  {themeProgress?.completed ? (
                                    <Badge bg="success" className="d-flex align-items-center gap-1">
                                      <FeatherIcon icon="check" size={14} /> Complété
                                    </Badge>
                                  ) : themeProgress ? (
                                    <Badge bg="warning" className="d-flex align-items-center gap-1">
                                      <FeatherIcon icon="clock" size={14} /> En cours
                                    </Badge>
                                  ) : (
                                    <Badge bg="secondary">Non commencé</Badge>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              )}


              <hr className="mb-5" />
              <Row className="justify-content-between align-items-center mb-5">
                <Col xs={12} md={6}>
                  <h4>Déconnexion</h4>
                  <p className="small text-muted mb-md-0">
                    Se déconnecter de votre session sur cet appareil.
                  </p>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-secondary" onClick={() => void logout()}>
                    Se déconnecter
                  </Button>
                </Col>
              </Row>

              <hr className="mb-5" />
              {/* Partie sur la suppression du compte */}
              <Row className="justify-content-between">
                <Col xs={12} md={6} className="col-12 col-md-6">
                  <h4>Supprimer votre compte</h4>
                  <p className="small text-muted mb-md-0">
                    Supprimer votre compte est une action permanente et il ne sera pas possible de le récupérer une fois supprimé.
                  </p>
                </Col>
                <Col xs="auto">
                  <Button variant="danger">Supprimer</Button>
                </Col>
              </Row>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

