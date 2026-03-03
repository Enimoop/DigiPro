import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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

  if (!lessonData || !lessonData.lessons || lessonData.lessons.length === 0) {
    return <div>Aucune donnée de leçon disponible.</div>;
  }

  const lessons = lessonData.lessons;
  const currentLesson = lessons[currentStep];
  const redirectTo = lessonData.end?.redirectTo ?? fallbackRedirectTo;

  const isFirst = currentStep === 0;
  const isLast = currentStep === lessons.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
      return;
    }

    if (redirectTo) {
      navigate(redirectTo);
    } else {
      console.warn("Aucun redirectTo défini pour la fin de la leçon.");
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Card key={currentLesson.id} className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{currentLesson.title}</h4>
          <small className="text-muted">
            Étape {currentStep + 1}/{lessons.length}
          </small>
        </Card.Header>

        <Card.Body>
          <div className="lesson-content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {currentLesson.content}
            </ReactMarkdown>
          </div>
        </Card.Body>
      </Card>

      <div className="position-relative my-4">
        <div className="section-divider" />

        <div className="position-absolute top-50 start-50 translate-middle d-flex gap-5">
          {!isFirst && (
            <Button size="sm" variant="secondary" onClick={handlePrevious}>
              Précédent
            </Button>
          )}

          <Button size="sm" variant="purple" onClick={handleNext}>
            {isLast ? "Terminer" : "Suivant"}
          </Button>
        </div>
      </div>
    </>
  );
}