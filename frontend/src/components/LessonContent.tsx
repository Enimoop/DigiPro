import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cyberLessonData } from "../nav/cyberLessonData";

export default function LessonContent() {

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const {lessons, end} = cyberLessonData;

  const isLast = currentStep === lessons.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate(end.redirectTo);
    }
  };

  return (
    <>
      {lessons.slice(0, currentStep + 1).map((lesson, index) => (
        <Card key={lesson.id} className="mb-4">
          <Card.Header className="d-flex justify-content-between">
            <h4 className="mb-0">{lesson.title}</h4>
            <small className="text-muted">
              Étape {index + 1}/{lessons.length}
            </small>
          </Card.Header>

          <Card.Body>
            <div className="lesson-content">
              {lesson.content.split("\n").map((line, index) => {
                if (line.startsWith("- ")) {
                  return <li key={index}>{line.replace("- ", "")}</li>;
                }

                if (line.trim() === "") {
                  return <br key={index} />;
                }

                return <p key={index}>{line}</p>;
              })}
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