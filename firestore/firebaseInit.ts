import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';
firebase.initializeApp(firebaseConfig);
require('firebase/auth');

// utils
const firestoreDB = firebase.firestore();
// const auth = firebase.auth();
// const firebaseStorage = firebase.storage();
// const firebaseDB = firebase.database();

// cloud firestore db collection query
const animalsQuery = firestoreDB.collection('animals');
const colorsQuery = firestoreDB.collection('colors');
const numbersQuery = firestoreDB.collection('numbers');
const wordsQuery = firestoreDB.collection('words');

// export utils/refs
export { animalsQuery, colorsQuery, wordsQuery, numbersQuery };
