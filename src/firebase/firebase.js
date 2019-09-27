import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBRSz5jRIVCJ-fJ6Ywa5dRr6iWqEMEQ0sk",
    authDomain: "jobrecommendation-a773f.firebaseapp.com",
    databaseURL: "https://jobrecommendation-a773f.firebaseio.com",
    projectId: "jobrecommendation-a773f",
    storageBucket: "jobrecommendation-a773f.appspot.com",
    messagingSenderId: "252378893188",
    appId: "1:252378893188:web:91be2be7dd0267c9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
