const firebase = require("firebase/app");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDtiovFL12FPPHycwDfMOaBtDyQEphZ2nU",
  authDomain: "osama-53dd7.firebaseapp.com",
  projectId: "osama-53dd7",
  storageBucket: "osama-53dd7.appspot.com",
  messagingSenderId: "985209493616",
  appId: "1:985209493616:web:b8cf6d3cbd8819e6c03cb5"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

module.exports = {
  firebase,
  db: database,
};
