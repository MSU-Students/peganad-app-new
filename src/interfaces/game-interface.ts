export interface IGame {
  currentTime: number;
  timer: number;
  questionCounter: number;
  score: number;
  selectedAnswer: {
    index: number | undefined;
    answer: string;
  };
}

export interface IGameAnswer {
  correctAnswer: string;
  answers: string[];
}

export interface IUiPreference {
  showScoreDialog: boolean;
  isAnswerSelect: boolean;
  isAnswerCheck: boolean;
  selectedBtnColor: string;
  selectedBtnTextColor: string;
}
