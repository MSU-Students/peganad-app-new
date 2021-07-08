import { LocalBase } from './localbase';
import { IContent } from 'src/interfaces/common-interface';

export const localbaseService = {
  // store content
  async setContent(param: string, content: IContent[]): Promise<IContent[]> {
    const category = new LocalBase(param);
    return await category.setItem(param, content);
  },

  // get contents
  async getAnimals(param: string): Promise<IContent[]> {
    const category = new LocalBase(param);
    return await category.getItem(param);
  }
};
