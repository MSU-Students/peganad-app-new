import { MutationTree } from 'vuex';
import { CommonStateInterface } from './state';

const mutation: MutationTree<CommonStateInterface> = {
  appendContent(state, content) {
    state.contents = content;
  }
};

export default mutation;
