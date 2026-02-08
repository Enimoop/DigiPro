import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type LessonItem = {
  id: string;
  title: string;
  content: string;
};

type LessonData = {
  lessons: readonly LessonItem[];
  end?: {
    redirectTo: string;
  };
};

type Props = {
  lessonData?: LessonData;
  fallbackRedirectTo?: string;
};

export default function LessonContent({ lessonData, fallbackRedirectTo }: Props) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  console.log("Received lessonData:", lessonData);

  if (!lessonData || !lessonData.lessons || lessonData.lessons.length === 0) {
    return <div>Aucune donnée de leçon disponible.</div>;
  }

  const lessons = lessonData.lessons;
  const redirectTo = lessonData.end?.redirectTo ?? fallbackRedirectTo;

  const isLast = currentStep === lessons.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    if (redirectTo) {
      navigate(redirectTo);
    } else {
      console.warn("Aucun redirectTo défini pour la fin de la leçon.");
    }
  };

  return (
    <>
      {lessons.slice(0, currentStep + 1).map((lesson, stepIndex) => (
        <Card key={lesson.id} className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{lesson.title}</h4>
            <small className="text-muted">
              Étape {stepIndex + 1}/{lessons.length}
            </small>
          </Card.Header>

          <Card.Body>
            <div className="lesson-content">
              {(() => {
                const lines = lesson.content.split("\n");
                const nodes: React.ReactNode[] = [];
                let bullets: string[] = [];

                const flushBullets = () => {
                  if (bullets.length > 0) {
                    nodes.push(
                      <ul key={`ul-${nodes.length}`}>
                        {bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    );
                    bullets = [];
                  }
                };

                lines.forEach((line, i) => {
                  const trimmed = line.trim();

                  if (trimmed === "") {
                    flushBullets();
                    return;
                  }

                  if (trimmed.startsWith("- ")) {
                    bullets.push(trimmed.slice(2));
                    return;
                  }

                  flushBullets();
                  nodes.push(<p key={`p-${i}`}>{trimmed}</p>);
                });

                flushBullets();
                return nodes;
              })()}
            </div>
          </Card.Body>
        </Card>
      ))}

      <div className="position-relative my-4">
        <div className="section-divider" />

        <div className="position-absolute top-50 start-50 translate-middle">
          <Button size="sm" onClick={handleNext}>
            {isLast ? "Terminer" : "Suivant"}
          </Button>
        </div>
      </div>
    </>
  );
}
