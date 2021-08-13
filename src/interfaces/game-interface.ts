export interface IGame {
  currentTime?: number;
  timer: number;
  questionCounter: number;
  correctAnswer: number;
  score: number;
  selectedAnswer: {
    index: number | undefined;
    answer: string;
  };
}

export interface ISelectedAnswer {
  index: number;
  answer: string;
}

export interface IGameAnswer {
  correctAnswer: string;
  answers: string[];
}

export interface IUiPreference {
  isAnswerSelect: boolean;
  isAnswerCheck: boolean;
  isWrong: boolean;
  isCorrect: boolean;
  selectedBtnColor: string;
  selectedBtnTextColor: string;
  counterTextColor: string;
}
