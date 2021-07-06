// import {
//   animalsQuery,
//   colorsQuery,
//   numbersQuery,
//   wordsQuery
// } from 'app/firestore/firebaseInit';
import {
  animalsQuery,
  colorsQuery,
  numbersQuery,
  wordsQuery
} from 'app/firestore/firebaseEmulatorInit';
interface IContent {
  name: string;
  translatedName: string;
  img: string;
  audio: string;
}

class FirestoreService {
  async getAnimals(): Promise<IContent[]> {
    const result = await animalsQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data() as any);
      });
      resolve(contentArr);
    });
  }

  async getColors(): Promise<IContent[]> {
    const result = await colorsQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data() as any);
      });
      resolve(contentArr);
    });
  }

  async getNumbers(): Promise<IContent[]> {
    const result = await numbersQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data() as any);
      });
      resolve(contentArr);
    });
  }

  async getWords(): Promise<IContent[]> {
    const result = await wordsQuery.get();
    return new Promise(resolve => {
      const contentArr: IContent[] = [];
      result.forEach(r => {
        contentArr.push(r.data() as any);
      });
      resolve(contentArr);
    });
  }
}

const fireStoreService = new FirestoreService();
export default fireStoreService;
