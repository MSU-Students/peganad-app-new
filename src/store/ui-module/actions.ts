import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UiStateInterface } from './state';

const actions: ActionTree<UiStateInterface, StateInterface> = {
  showLoading(context, isLoad) {
    context.commit('showLoading', isLoad);
  },
  showProgress(context, cursor) {
    context.commit('showProgress', cursor);
  },
  getDocSize(context, size) {
    context.commit('setDocSize', size);
  }
};

export default actions;
