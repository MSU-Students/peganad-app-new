import { IContent } from 'src/interfaces/common-interface';
import contentService from 'src/services/content.service';
import firestoreService from 'src/services/firestore.service';
import { localbaseService } from 'src/services/localbase.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CommonStateInterface } from './state';

const actions: ActionTree<CommonStateInterface, StateInterface> = {
  async appendContent(context, payload: any): Promise<void> {
    let categoryContent: IContent[] = [];
    let localContent = await localbaseService.getContents(payload.category);
    console.log('getContent: ', localContent);
    if (!localContent) {
      categoryContent = await firestoreService.getContents(
        payload.category
      );
    }
    const content = await contentService.appendContent(
      categoryContent,
      payload.category,
      payload.path
    );
    context.commit('appendContent', content);
  }
};

export default actions;
