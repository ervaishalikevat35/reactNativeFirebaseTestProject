
// database/firebaseDb.js
import * as firebase from 'firebase';
import '@firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDeIZFN9_B49L-QJM4PZG-h-Wbzb-ZtG9w",
  authDomain: "seedemoapp.firebaseapp.com",
  databaseURL: "https://seedemoapp-default-rtdb.firebaseio.com",
  projectId: "seedemoapp",
  storageBucket: "seedemoapp.appspot.com",
  messagingSenderId: "955241042227",
  appId: "1:955241042227:web:3d019bab7c9be301ddee46",

};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;

export { firebase };