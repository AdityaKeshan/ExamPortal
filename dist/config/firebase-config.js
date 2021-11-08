"use strict";
// Import the functions you need from the SDKs you need
var initializeApp = require("firebase/app").initializeApp;
var admin = require('firebase-admin');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
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
var app = initializeApp(firebaseConfig);
module.exports = { app: app, admin: admin };
