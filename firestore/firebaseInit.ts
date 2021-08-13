import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';
import 'firebase/storage';
firebase.initializeApp(firebaseConfig);
require('firebase/auth');

const firestore = firebase.firestore();
// const storage = firebase.storage();
if (location.hostname === 'localhost') {
  // firestore.useEmulator('localhost', 9012);
  // storage.useEmulator('localhost', 9011);
}

export { firestore };
