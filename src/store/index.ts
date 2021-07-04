import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import common from './common-module';
import { CommonStateInterface } from './common-module/state';
import ui from './ui-module';
import { UiStateInterface } from './ui-module/state';
import game from './game-module';
import { GameStateInterface } from './game-module/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  commonInterface: CommonStateInterface;
  uiInterface: UiStateInterface;
  gameInterface: GameStateInterface;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      common,
      ui,
      game
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
