import Vuex, { Store } from 'vuex';
import { store } from 'quasar/wrappers';

import common from './common-module';
import { CommonStateInterface } from './common-module/state';
import game from './game-module';
import { GameStateInterface } from './game-module/state';
import ui from './ui-module';
import { UiStateInterface } from './ui-module/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  commonInterface: CommonStateInterface;
  gameInterface: GameStateInterface;
  uiInterface: UiStateInterface;
}

export const $store: { ref?: Store<StateInterface> } = {
  ref: undefined
};

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      common,
      game,
      ui
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });
  $store.ref = Store;
  return Store;
});
