import { IContent } from 'src/interfaces/common-interface';
import contentService from 'src/services/content.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GameStateInterface } from './state';

const actions: ActionTree<GameStateInterface, StateInterface> = {
  async paginateContents(context, contents: IContent[]): Promise<void> {
    const transform = await contentService.paginateContents(
      contents,
      context.state.contentPosition
    );
    context.commit('storeCorrectAnswer', transform[0].translatedName);
    context.commit('paginateContents', transform);
  },

  async generateRandomAnswer(context, contents: IContent[]): Promise<void> {
    const newAnsArr = await contentService.generateRandomAnswer(
      contents,
      context.state.gameAnswer.correctAnswer
    );
    context.commit('generateRandomAnswer', newAnsArr);
  },

  changeContentPosition(context, position: number): void {
    context.commit('changeContentPosition', position);
  }
};

export default actions;
