import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CommonStateInterface } from './state';

const getters: GetterTree<CommonStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
