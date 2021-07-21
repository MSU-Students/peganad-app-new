import { IContent } from 'src/interfaces/common-interface';
import { IGame, IGameAnswer } from 'src/interfaces/game-interface';

export interface GameStateInterface {
  displayContents: IContent[];
  contentPosition: number;
  gameAnswer: IGameAnswer;
  gamePreference: IGame;
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
      correctAnswer: 0,
      score: 0,
      selectedAnswer: {
        index: undefined,
        answer: ''
      }
    }
  };
}

export default state;
