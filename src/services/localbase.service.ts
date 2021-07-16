import { LocalBase } from './localbase';
import { IContent } from 'src/interfaces/common-interface';
import { IPlayer } from 'src/interfaces/player.interface';

export const localbaseService = {
  // store content
  async setContent(param: string, content: IContent[]): Promise<IContent[]> {
    const category = new LocalBase(param);
    return await category.setItem(param, content);
  },

  // get contents
  async getContents(param: string): Promise<IContent[]> {
    const category = new LocalBase(param);
    return await category.getItem(param);
  },

  // store player
  async setPlayer(param: string, player: IPlayer[]) {
    const category = new LocalBase(param);
    return await category.setItem(param, player);
  },

  // get player
  async getPlayer(param: string): Promise<IPlayer[]> {
    const category = new LocalBase(param);
    return await category.getItem(param);
  },

  // delete player
  async deletePlayer(param: string): Promise<IPlayer[]> {
    const category = new LocalBase(param);
    return await category.deleteItem(param);
  }
};
