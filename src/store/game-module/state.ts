import { IContent } from 'src/interfaces/common-interface';

export interface GameStateInterface {
  displayContents: IContent[];
  contentPosition: number;
  gameAnswer: {
    correctAnswer: string;
    answers: string[];
  };
}

function state(): GameStateInterface {
  return {
    displayContents: [],
    contentPosition: 1,
    gameAnswer: {
      correctAnswer: '',
      answers: []
    }
  };
}

export default state;
