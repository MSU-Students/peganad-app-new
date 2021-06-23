import {
  animalsQuery,
  colorsQuery,
  numbersQuery,
  wordsQuery
} from 'src/firestore/firebaseInit';
interface IContent {
  [key: string]: string;
}

class Firestore {
  async getAnimals(): Promise<IContent[]> {
    const result = await animalsQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data());
      });
      resolve(contentArr);
    });
  }

  async getColors(): Promise<IContent[]> {
    const result = await colorsQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data());
      });
      resolve(contentArr);
    });
  }

  async getNumbers(): Promise<IContent[]> {
    const result = await numbersQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data());
      });
      resolve(contentArr);
    });
  }

  async getWords(): Promise<IContent[]> {
    const result = await wordsQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data());
      });
      resolve(contentArr);
    });
  }
}

const fireStore = new Firestore();
export default fireStore;
