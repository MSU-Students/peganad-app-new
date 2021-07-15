// import {
//   firestore
// } from 'app/firestore/firebaseInit';
import { firestore } from 'app/firestore/firebaseInit';
interface IContent {
  name: string;
  translatedName: string;
  img: string;
  audio: string;
}

class FirestoreService {
  async getContents(params: string): Promise<IContent[]> {
    const result = await firestore.collection(params).get();
    return new Promise(resolve => {
      const contentArr: any[] = [];
      result.forEach(r => {
        contentArr.push(r.data());
      });
      resolve(contentArr);
    });
  }
}

const fireStoreService = new FirestoreService();
export default fireStoreService;
