import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UiStateInterface } from './state';

const getters: GetterTree<UiStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
