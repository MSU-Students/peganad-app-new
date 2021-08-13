import { IAppendContentParam } from './../../interfaces/common-interface';
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
    if (!localContent) {
      categoryContent = await firestoreService.getContents(payload.category);
    }
    const content = await contentService.appendContent(
      categoryContent,
      payload.category,
      payload.path
    );
    context.commit('appendContent', content);
  },
  async checkNewContent(context, payload): Promise<void> {
    let onlineCategory = await firestoreService.getContents(payload.category);
    let localContent = await localbaseService.getContents(payload.category);
    if (onlineCategory.length != localContent.length && navigator.onLine) {
      // has new data
      context.commit('ui/showUpdateContent', true, { root: true });
    }
  },
  async updateContent(context, payload): Promise<void> {
    let onlineCategory = await firestoreService.getContents(payload.category);
    const content = await contentService.appendContent(
      onlineCategory,
      payload.category,
      payload.path
    );
    context.commit('appendContent', content);
  }
};

export default actions;
