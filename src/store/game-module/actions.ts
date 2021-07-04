import { IContent } from 'src/interfaces/common-interface';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GameStateInterface } from './state';

const transform = undefined;
const actions: ActionTree<GameStateInterface, StateInterface> = {

  paginateContents(context, contents: IContent[]): void {
    const extractContent = contents;
    const paginate = (array: IContent[], index: number, size: number) => {
      // transform values
      index = typeof index == 'string' ? Math.abs(parseInt(index)) : index;
      index = index > 0 ? index - 1 : index;
      size = typeof size == 'string' ? parseInt(size) : size;
      size = size < 1 ? 1 : size;
      // filter
      return [
        ...extractContent.filter((value, n) => {
          return n >= index * size && n < (index + 1) * size;
        })
      ];
    };
    if (context.state.contentPosition <= extractContent.length) {
      const transform = paginate(
        extractContent,
        context.state.contentPosition,
        1
      );
      context.commit('storeCorrectAnswer', transform[0].translatedName);
      context.commit('paginateContents', transform);
    }
  },

  generateRandomAnswer(context, contents: IContent[]): void {
    const extractContent = contents;
    const answersArr: IContent[] = [];

    extractContent.forEach((content: IContent) => {
      answersArr.unshift(content.translatedName as any);
    });

    const correctAnswer = context.state.gameAnswer.correctAnswer;
    const newAnsArr = answersArr.filter(
      item => item.translatedName != correctAnswer
    ); // Remove answer in array
    newAnsArr.length = 3; // Limit length
    newAnsArr.unshift(correctAnswer as any); // Add answer array
    newAnsArr.sort(() => Math.random() - 0.5); // random the new elements
    context.commit('generateRandomAnswer', newAnsArr);
  },

  changeContentPosition(context, position: number): void {
    context.commit('changeContentPosition', position);
  },
};

export default actions;
