import { MutationTree } from 'vuex';
import { UiStateInterface } from './state';

const mutation: MutationTree<UiStateInterface> = {
  showLoading(state, isLoad) {
    state.isPageLoading = isLoad;
  },

};

export default mutation;
