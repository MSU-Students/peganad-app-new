import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UiStateInterface } from './state';

const actions: ActionTree<UiStateInterface, StateInterface> = {
  showLoading(context, isLoad) {
    context.commit('showLoading', isLoad);
  },

  showScoreDialog(context, isShow) {
    context.commit('showScoreDialog', isShow);
  }
};

export default actions;
