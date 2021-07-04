import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UiStateInterface } from './state';

const actions: ActionTree<UiStateInterface, StateInterface> = {
  showLoading(context, isLoad) {
    context.commit('showLoading', isLoad);
  }
};

export default actions;
