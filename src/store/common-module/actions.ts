import firestoreService from 'src/services/firestore.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CommonStateInterface } from './state';

const actions: ActionTree<CommonStateInterface, StateInterface> = {
  async appendContent(context, routeParam): Promise<void> {
    const categoryContent = await firestoreService.getContents(routeParam);
    if (categoryContent.length != 0 && routeParam == 'animals') {
      context.commit('appendContent', categoryContent);
    }
  }
};

export default actions;
