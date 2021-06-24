import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';
import 'firebase/storage';
firebase.initializeApp(firebaseConfig);
require('firebase/auth');

const localFirestore = firebase.firestore();
const localStorange = firebase.storage();
if (location.hostname === 'localhost') {
  localFirestore.useEmulator('localhost', 9099);
  localStorange.useEmulator('localhost', 9098);
}

// cloud firestore db collection query
const animalsQuery = localFirestore.collection('animals');
const colorsQuery = localFirestore.collection('colors');
const numbersQuery = localFirestore.collection('numbers');
const wordsQuery = localFirestore.collection('words');

export { animalsQuery, colorsQuery, numbersQuery, wordsQuery };
