// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
//let { initializeApp } = require("firebase/app");
import {getDatabase} from "firebase/database"
import {getStorage,ref} from "firebase/storage";
//let { getDatabase } = require("firebase/database");
import admin from "firebase-admin"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCXsilrKrPfYjb1XbYej_mMExX7Tb62dM",
  authDomain: "examportal-fbb67.firebaseapp.com",
  databaseURL: "https://examportal-fbb67-default-rtdb.firebaseio.com",
  projectId: "examportal-fbb67",
  storageBucket: "examportal-fbb67.appspot.com",
  messagingSenderId: "813365601335",
  appId: "1:813365601335:web:ab2a894a8055cfe9f50bb2",
  measurementId: "G-Y6TWBRQVS9",
};
admin.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage=getStorage();
const ref1=ref;

export {app,admin,database,storage,ref1}
module.exports = { app, admin, database,storage ,ref1};
