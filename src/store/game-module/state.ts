import { IContent } from 'src/interfaces/common-interface';

export interface GameStateInterface {
  displayContents: IContent[];
  contentPosition: number;
  gameAnswer: {
    correctAnswer: string;
    answers: string[];
  };
  gamePreference: {
    currentTime: number;
    timer: number;
    questionCounter: number;
    score: number;
    selectedAnswer: {
      index: undefined;
      answer: string;
    };
  };
}

function state(): GameStateInterface {
  return {
    displayContents: [],
    contentPosition: 1,
    gameAnswer: {
      correctAnswer: '',
      answers: []
    },
    gamePreference: {
      currentTime: 0,
      timer: 10,
      questionCounter: 1,
      score: 0,
      selectedAnswer: {
        index: undefined,
        answer: ''
      }
    }
  };
}

export default state;
