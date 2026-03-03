export type LessonItem = {
  id: string;
  title: string;
  content: string;
};

export type LessonData = {
  lessons: readonly LessonItem[];
  end?: {
    redirectTo: string;
  };
};