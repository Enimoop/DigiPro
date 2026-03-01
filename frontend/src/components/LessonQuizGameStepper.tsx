type Step = "lesson" | "quiz" | "game";

type Props = {
  current: Step;
  className?: string;
};

const ORDER: Step[] = ["lesson", "quiz", "game"];

const LABELS: Record<Step, string> = {
  lesson: "Leçon",
  quiz: "Quiz",
  game: "Jeu",
};

export default function LessonQuizGameStepper({
  current,
  className,
}: Props) {
  const currentIndex = ORDER.indexOf(current);

  return (
    <div className={`chevron-stepper ${className ?? ""}`} aria-hidden="true">
      {ORDER.map((step, index) => {
        const state =
          index < currentIndex
            ? "is-done"
            : index === currentIndex
            ? "is-active"
            : "is-next";

        return (
          <div key={step} className="chevron-wrapper">
            <div className={`chevron ${state}`} />
            <span className={`chevron-label ${state}`}>
              {LABELS[step]}
            </span>
          </div>
        );
      })}
    </div>
  );
}