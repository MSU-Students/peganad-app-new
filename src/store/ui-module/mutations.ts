import { MutationTree } from 'vuex';
import { UiStateInterface } from './state';

const mutation: MutationTree<UiStateInterface> = {
  showLoading(state, isLoad) {
    state.isPageLoading = isLoad;
  },
  showUpdateContent(state, isNew) {
    state.hasNewContent = isNew;
  },
  showProgress(state, cursor) {
    state.progress = cursor;
  },
  setDocSize(state, size) {
    state.docSize = size;
  }
};

export default mutation;
