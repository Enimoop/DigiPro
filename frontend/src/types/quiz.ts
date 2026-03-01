export type QuizQuestion = {
  id: string;
  question: string;
  options: readonly [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type QuizData = {
  questions: readonly QuizQuestion[];
  end?: {
    redirectTo?: string;
  };
};