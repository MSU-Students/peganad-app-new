import { firestore } from 'app/firestore/firebaseInit';
import { IContent } from 'src/interfaces/common-interface';
import { $store } from 'src/store';

let nextQuery!: any;
let cursor = 0;
let docSize = 0;
class FirestoreService {
  async getContents(params: string): Promise<IContent[]> {
    $store.ref?.dispatch('ui/showProgress', 0);
    $store.ref?.dispatch('ui/getDocSize', 0);
    let contentArr: any[] = [];
    return new Promise(async resolve => {
      try {
        docSize = (await firestore.collection(params).get()).docs.length;
        $store.ref?.dispatch('ui/getDocSize', docSize);
        do {
          let firstQuery = nextQuery
            ? firestore
                .collection(params)
                .orderBy('name')
                .limit(1)
                .startAfter(nextQuery)
            : firestore
                .collection(params)
                .orderBy('name')
                .limit(1);
          let docSnapshot = await firstQuery.get();
          nextQuery = docSnapshot.docs[0];
          if (nextQuery) {
            contentArr.push(nextQuery.data());
            cursor += 1;
            $store.ref?.dispatch('ui/showProgress', cursor);
          } else {
            cursor = 0;
            nextQuery = undefined;
          }
        } while (cursor < docSize && navigator.onLine);
        if (cursor == docSize) {
          cursor = 0;
          docSize = 0;
          resolve(contentArr);
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  }
}

const fireStoreService = new FirestoreService();
export default fireStoreService;
