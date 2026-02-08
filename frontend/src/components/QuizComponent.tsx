import { useMemo, useState } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";

type QuizQuestion = {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

type Props = {
  questions: readonly QuizQuestion[];
  onFinish?: (result: { correct: number; total: number }) => void;
  onGoToGame?: () => void;
};

export default function QuizComponent({ questions, onFinish, onGoToGame }: Props) {
  const [qIndex, setQIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // ✅ NEW
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const current = questions[qIndex];

  const progress = useMemo(() => {
    if (finished) return 100;
    return Math.round(((qIndex + 1) / total) * 100);
  }, [qIndex, total, finished]);

  if (!current) return <div>Aucune question disponible.</div>;

  const handleSelect = (idx: number) => {
    if (validated || finished) return;
    setSelectedIndex(idx);
  };

  const handleValidate = () => {
    if (selectedIndex === null || finished) return;
    setValidated(true);
    if (selectedIndex === current.correctIndex) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (finished) return;

    const isLast = qIndex === total - 1;
    if (isLast) {
      setFinished(true);
      onFinish?.({ correct: correctCount, total });
      return;
    }

    setQIndex((i) => i + 1);
    setSelectedIndex(null);
    setValidated(false);
  };

  const getVariant = (idx: number) => {
    if (!validated) return selectedIndex === idx ? "primary" : "outline-primary";
    if (idx === current.correctIndex) return "success";
    if (selectedIndex === idx && idx !== current.correctIndex) return "danger";
    return "outline-secondary";
  };

  const canValidate = selectedIndex !== null && !validated && !finished;
  const canNext = validated && !finished;

  const scorePercent = Math.round((correctCount / total) * 100);

  return (
    <div className="mx-auto" style={{ maxWidth: 1100 }}>
      <div className="d-flex align-items-center justify-content-between mb-5">
        <div style={{ flex: 1, marginRight: 24 }}>
          <div className="text-muted small mb-3 fw-semibold">PROGRESSION</div>
          <ProgressBar now={progress} style={{ height: 12, borderRadius: 999 }} />
        </div>
        <div className="text-muted fw-semibold fs-5">
          {finished ? `${total}/${total}` : `${qIndex + 1}/${total}`}
        </div>
      </div>

      <Card className="mb-6">
        <Card.Body className="py-5 px-5">
          <h2 className="mb-0 fw-bold" style={{ lineHeight: 1.3 }}>
            {current.question}
          </h2>
        </Card.Body>
      </Card>

      <div className="quiz-answers d-grid mb-5">
        {current.options.map((opt, idx) => (
          <Button
            key={idx}
            variant={getVariant(idx)}
            onClick={() => handleSelect(idx)}
            className="py-5 fw-bold"
            style={{ minHeight: 90, borderRadius: 16, fontSize: "1.25rem" }}
          >
            {opt}
          </Button>
        ))}
      </div>

      {validated && (
        <div
          className="mt-5 p-5"
          style={{
            background: "#EFE6FF",
            border: "1px solid #D9C7FF",
            borderRadius: 18,
          }}
        >
          <div className="fw-bold mb-3 fs-4">Explication</div>
          <div className="text-muted" style={{ fontSize: "1.15rem", lineHeight: 1.6 }}>
            {current.explanation}
          </div>
        </div>
      )}

      {!finished && (
        <div className="d-flex justify-content-end gap-4 mt-5">
          <Button
            variant="primary"
            onClick={handleValidate}
            disabled={!canValidate}
            className="px-5 py-3 fw-semibold fs-5"
          >
            Valider
          </Button>

          <Button
            variant="purple"
            onClick={handleNext}
            disabled={!canNext}
            className="px-5 py-3 fw-semibold fs-5"
          >
            {qIndex === total - 1 ? "Terminer" : "Suivant"}
          </Button>
        </div>
      )}

      {finished && (
        <div
          className="mt-5 p-5"
          style={{
            background: "#F6F0FF",
            border: "1px solid #E3D6FF",
            borderRadius: 18,
          }}
        >
          <div className="fw-bold fs-3 mb-2">Bravo 🎉</div>
          <div className="text-muted fs-5 mb-4">
            Ton score : <span className="fw-bold">{correctCount}/{total}</span> ({scorePercent}%)
          </div>

          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="outline-primary"
              className="px-5 py-3 fw-semibold fs-5"
              onClick={() => {
                setQIndex(0);
                setSelectedIndex(null);
                setValidated(false);
                setCorrectCount(0);
                setFinished(false);
              }}
            >
              Refaire le quiz
            </Button>

            <Button
              variant="primary"
              className="px-5 py-3 fw-semibold fs-5"
              onClick={() => onGoToGame?.()}
              disabled={!onGoToGame}
            >
              Passer au jeu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
