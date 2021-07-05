import firestoreService from 'src/services/firestore.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CommonStateInterface } from './state';


const actions: ActionTree<CommonStateInterface, StateInterface> = {
  async appendContent(context, routeParam): Promise<void> {
    const animals = await firestoreService.getAnimals();
    const colors = await firestoreService.getColors();
    const numbers = await firestoreService.getNumbers();
    const words = await firestoreService.getWords();
    if (animals.length != 0 && routeParam == 'animals') {
      context.commit('appendContent', animals);
    } else if (colors.length != 0 && routeParam == 'colors') {
      context.commit('appendContent', colors);
    } else if (numbers.length != 0 && routeParam == 'numbers') {
      context.commit('appendContent', numbers);
    } else if (words.length != 0 && routeParam == 'words') {
      context.commit('appendContent', words);
    }
  }
};

export default actions;
