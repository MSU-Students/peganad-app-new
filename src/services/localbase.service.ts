import { LocalBase } from './localbase';
import { IContent } from 'src/interfaces/common-interface';

const animals = new LocalBase('animals');
const colors = new LocalBase('colors');
const numbers = new LocalBase('numbers');
const words = new LocalBase('words');

export const localbaseService = {
  // store content
  async setAnimals(id: string, content: IContent[]) {
    return (await animals.setItem(id, content)) as IContent[];
  },

  async setColors(id: string, content: IContent[]) {
    return (await colors.setItem(id, content)) as IContent[];
  },

  async setNumbers(id: string, content: IContent[]) {
    return (await numbers.setItem(id, content)) as IContent[];
  },

  async setWords(id: string, content: IContent[]) {
    return (await words.setItem(id, content)) as IContent[];
  },

  // animal get contents
  async getAnimals() {
    return (await animals.values()) as IContent[];
  },

  async getColors() {
    return (await colors.values()) as IContent[];
  },

  async getNumbers() {
    return (await numbers.values()) as IContent[];
  },

  async getWords() {
    return (await words.values()) as IContent[];
  }
};
