import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';
import 'firebase/storage';
firebase.initializeApp(firebaseConfig);
require('firebase/auth');

const localFirestore = firebase.firestore();
if (location.hostname === 'localhost') {
  localFirestore.useEmulator('localhost', 9099);
}

// cloud firestore db collection query
const animalsQuery = localFirestore.collection('animals');
const colorsQuery = localFirestore.collection('colors');
const numbersQuery = localFirestore.collection('numbers');
const wordsQuery = localFirestore.collection('words');

export { animalsQuery, colorsQuery, numbersQuery, wordsQuery };
