import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { GameStateInterface } from './state';

const getters: GetterTree<GameStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
