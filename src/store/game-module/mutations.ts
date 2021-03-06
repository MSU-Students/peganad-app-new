import { MutationTree } from 'vuex';
import { GameStateInterface } from './state';

const mutation: MutationTree<GameStateInterface> = {
  paginateContents(state, content) {
    state.displayContents = content;
  },

  generateRandomAnswer(state, answer) {
    state.gameAnswer.answers = answer;
  },

  storeCorrectAnswer(state, correctAnswer) {
    state.gameAnswer.correctAnswer = correctAnswer;
  },

  changeContentPosition(state, position) {
    state.contentPosition += position;
  },

  savePreferences(state, gamePreference) {
    state.gamePreference = gamePreference;
  },

  resetContentPosition(state) {
    state.contentPosition = 1;
  }
};

export default mutation;
