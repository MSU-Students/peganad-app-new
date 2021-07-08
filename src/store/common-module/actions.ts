import contentService from 'src/services/content.service';
import firestoreService from 'src/services/firestore.service';
import { localbaseService } from 'src/services/localbase.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CommonStateInterface } from './state';

const actions: ActionTree<CommonStateInterface, StateInterface> = {
  async appendContent(context, category: string): Promise<void> {
    const categoryContent = await firestoreService.getContents(category);
    const content = await contentService.appendContent(
      categoryContent,
      category
    );
    context.commit('appendContent', content);
  }
};

export default actions;
