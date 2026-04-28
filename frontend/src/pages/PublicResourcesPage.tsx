import { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { api } from "../api";
import LessonContent from "../components/LessonContent";
import QuizComponent from "../components/QuizComponent";
import { getLessonDataByThemeSlug, getQuizDataByThemeSlug } from "../nav/contentLoaders";

type ThemeDto = {
  id: number;
  slug: string;
  title: string;
};

type ModuleDto = {
  slug: string;
  title: string;
  themes: ThemeDto[];
};

const GAME_THEME_SLUGS = new Set(["passwords", "bases", "phishing"]);

type ThemePreview = {
  id: number;
  slug: string;
  title: string;
  moduleTitle: string;
};

export default function PublicResourcesPage() {
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedThemeSlug, setSelectedThemeSlug] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<ModuleDto[]>("/api/modules/");
        setModules(res.data);
      } catch {
        setError("Impossible de charger les ressources publiques.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const stats = useMemo(() => {
    const themes = modules.flatMap((module) => module.themes || []);

    let lessons = 0;
    let quizzes = 0;
    let games = 0;

    themes.forEach((theme) => {
      if (getLessonDataByThemeSlug(theme.slug)) lessons += 1;
      if (getQuizDataByThemeSlug(theme.slug)) quizzes += 1;
      if (GAME_THEME_SLUGS.has(theme.slug)) games += 1;
    });

    return {
      moduleCount: modules.length,
      themeCount: themes.length,
      lessons,
      quizzes,
      games,
    };
  }, [modules]);

  const previewThemes = useMemo<ThemePreview[]>(() => {
    const items: ThemePreview[] = [];

    modules.forEach((module) => {
      (module.themes || []).forEach((theme) => {
        const hasLesson = !!getLessonDataByThemeSlug(theme.slug);
        const hasQuiz = !!getQuizDataByThemeSlug(theme.slug);

        if (hasLesson || hasQuiz) {
          items.push({
            id: theme.id,
            slug: theme.slug,
            title: theme.title,
            moduleTitle: module.title,
          });
        }
      });
    });

    return items;
  }, [modules]);

  useEffect(() => {
    if (!selectedThemeSlug && previewThemes.length > 0) {
      setSelectedThemeSlug(previewThemes[0].slug);
    }
  }, [previewThemes, selectedThemeSlug]);

  const selectedTheme = useMemo(
    () => previewThemes.find((theme) => theme.slug === selectedThemeSlug) ?? null,
    [previewThemes, selectedThemeSlug]
  );

  const lessonData = useMemo(() => {
    const data = selectedTheme ? getLessonDataByThemeSlug(selectedTheme.slug) : null;
    if (!data) return null;

    return {
      ...data,
      end: undefined,
    };
  }, [selectedTheme]);

  const quizData = useMemo(
    () => (selectedTheme ? getQuizDataByThemeSlug(selectedTheme.slug) : null),
    [selectedTheme]
  );

  return (
    <div className="main-content">
      <Container fluid className="py-5">
        <h1 className="mb-2">Ressources publiques (temporaire)</h1>
        <p className="text-muted mb-4">
          Cette page expose de vrais contenus (cours + quiz) pour tester la sobriété (poids, chargement, rendu).
        </p>

        {loading && (
          <div className="d-flex justify-content-center py-5">
            <Spinner />
          </div>
        )}

        {error && <div className="text-danger mb-4">{error}</div>}

        {!loading && !error && (
          <>
            <Row className="g-3 mb-4">
              <Col md={6} xl={2}>
                <Card body className="h-100">
                  <div className="text-muted small">Modules</div>
                  <div className="h3 mb-0">{stats.moduleCount}</div>
                </Card>
              </Col>
              <Col md={6} xl={2}>
                <Card body className="h-100">
                  <div className="text-muted small">Thèmes</div>
                  <div className="h3 mb-0">{stats.themeCount}</div>
                </Card>
              </Col>
              <Col md={6} xl={2}>
                <Card body className="h-100">
                  <div className="text-muted small">Cours</div>
                  <div className="h3 mb-0">{stats.lessons}</div>
                </Card>
              </Col>
              <Col md={6} xl={2}>
                <Card body className="h-100">
                  <div className="text-muted small">Quiz</div>
                  <div className="h3 mb-0">{stats.quizzes}</div>
                </Card>
              </Col>
              <Col md={6} xl={2}>
                <Card body className="h-100">
                  <div className="text-muted small">Jeux</div>
                  <div className="h3 mb-0">{stats.games}</div>
                </Card>
              </Col>
            </Row>

            {modules.map((module) => (
              <Card key={module.slug} className="mb-3">
                <Card.Header>
                  <strong>{module.title}</strong>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    {module.themes?.map((theme) => {
                      const hasLesson = !!getLessonDataByThemeSlug(theme.slug);
                      const hasQuiz = !!getQuizDataByThemeSlug(theme.slug);
                      const hasGame = GAME_THEME_SLUGS.has(theme.slug);

                      return (
                        <Col key={theme.id} md={6} xl={4}>
                          <div className="border rounded p-3 h-100">
                            <div className="fw-semibold mb-2">{theme.title}</div>
                            <div className="small text-muted">
                              Cours: {hasLesson ? "Oui" : "Non"} · Quiz: {hasQuiz ? "Oui" : "Non"} · Jeu: {hasGame ? "Oui" : "Non"}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Card.Body>
              </Card>
            ))}

            <Card className="mb-4">
              <Card.Header>
                <strong>Prévisualisation réelle</strong>
              </Card.Header>
              <Card.Body>
                <Row className="align-items-end g-3">
                  <Col md={8} lg={6}>
                    <Form.Label>Thème à afficher</Form.Label>
                    <Form.Select
                      value={selectedThemeSlug}
                      onChange={(event) => setSelectedThemeSlug(event.target.value)}
                    >
                      {previewThemes.map((theme) => (
                        <option key={theme.id} value={theme.slug}>
                          {theme.moduleTitle} · {theme.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {selectedTheme && (
              <>
                {lessonData && (
                  <Card className="mb-4">
                    <Card.Header>
                      <strong>Cours: {selectedTheme.title}</strong>
                    </Card.Header>
                    <Card.Body>
                      <LessonContent lessonData={lessonData} />
                    </Card.Body>
                  </Card>
                )}

                {quizData && (
                  <Card className="mb-4">
                    <Card.Header>
                      <strong>Quiz: {selectedTheme.title}</strong>
                    </Card.Header>
                    <Card.Body>
                      <QuizComponent questions={quizData.questions} />
                    </Card.Body>
                  </Card>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
