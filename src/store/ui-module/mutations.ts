import { MutationTree } from 'vuex';
import { UiStateInterface } from './state';

const mutation: MutationTree<UiStateInterface> = {
  showLoading(state, isLoad) {
    state.isPageLoading = isLoad;
  },
  showProgress(state, cursor) {
    state.progress = cursor;
    console.log('progress: ', state.progress);
  },
  setDocSize(state, size) {
    state.docSize = size;
  }
};

export default mutation;
