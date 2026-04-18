import { useEffect, useState } from "react";
import { Row, Col, Container, Accordion, ProgressBar, Badge, Spinner, Alert } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthContext";
import { useModules } from "../contexts/ModulesProvider";
import { getUserProgress } from "../api";
import type { UserProgress } from "../api";

export default function DashboardPage() {
  const { user } = useAuth();
  const { modules, loading: modulesLoading } = useModules();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);

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

  if (modulesLoading || progressLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner />
      </div>
    );
  }

  // Create a map of progress by theme ID for quick lookup
  const progressMap = Object.fromEntries(
    progress.map((p) => [p.theme, p])
  );

  // Calculate module statistics
  const moduleStats = modules.map((module) => {
    const moduleThemes = module.themes || [];
    const completedCount = moduleThemes.filter(
      (theme) => progressMap[theme.id]?.completed
    ).length;
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
    <div>
      <Header className="pb-4">
        <Header.Body>
          <Header.Pretitle>OVERVIEW</Header.Pretitle>
          <Header.Title>Ma progression</Header.Title>
        </Header.Body>
      </Header>

      <Container>
        <p className="mb-4">
          Connecté en tant que <b>{user?.username}</b>
        </p>

        <Accordion defaultActiveKey="0" className="mb-5">
          {moduleStats.map((stat, idx) => {
            const { module, completedCount, totalCount, progressPercent } = stat;

            return (
              <Accordion.Item eventKey={String(idx)} key={module.slug}>
                <Accordion.Header>
                  <Row className="w-100 align-items-center g-3">
                    <Col md={6}>
                      <div className="d-flex align-items-center gap-3">
                        <FeatherIcon icon={module.icon || "grid"} size={24} />
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
                        style={{ height: 24 }}
                      />
                    </Col>
                  </Row>
                </Accordion.Header>

                <Accordion.Body>
                  <div className="pt-3">
                    {module.themes?.map((theme) => {
                      const themeProgress = progressMap[theme.id];

                      return (
                        <div
                          key={theme.id}
                          className="d-flex justify-content-between align-items-center p-3 border-bottom"
                        >
                          <div>
                            <div className="fw-bold">{theme.title}</div>
                            {themeProgress && (
                              <div className="small text-muted mt-1">
                                Quiz: {themeProgress.progress_pct}%
                              </div>
                            )}
                          </div>

                          <div className="d-flex gap-2">
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
                        </div>
                      );
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Container>
    </div>
  );
}
