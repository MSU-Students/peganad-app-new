import contentService from 'src/services/content.service';
import firestoreService from 'src/services/firestore.service';
import { localbaseService } from 'src/services/localbase.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CommonStateInterface } from './state';

const actions: ActionTree<CommonStateInterface, StateInterface> = {
  async appendContent(context, payload: any): Promise<void> {
    const categoryContent = await firestoreService.getContents(payload.category);
    const content = await contentService.appendContent(
      categoryContent,
      payload.category,
      payload.path
    );
    context.commit('appendContent', content);
  }
};

export default actions;
