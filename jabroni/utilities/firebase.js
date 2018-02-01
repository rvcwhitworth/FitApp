import * as firebase from 'firebase';
import TOKENS from './../../TOKENS.js';


const firebaseConfig = {
  apiKey: TOKENS.firebaseConfig.apiKey,
  authDomain: TOKENS.firebaseConfig.authDomain,
  databaseURL: TOKENS.firebaseConfig.databaseURL,
  projectId: TOKENS.firebaseConfig.projectId,
  storageBucket: TOKENS.firebaseConfig.storageBucket,
  messagingSenderId: TOKENS.firebaseConfig.messagingSenderId,
};

const Fire = firebase.initializeApp(firebaseConfig);

export default Fire
