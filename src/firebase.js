import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

  var firebaseConfig = {
    apiKey: "AIzaSyAXOCK_ejo6-BjXqlawQc601JpashSnERc",
    authDomain: "spawn-slack-chat-app.firebaseapp.com",
    databaseURL: "https://spawn-slack-chat-app.firebaseio.com",
    projectId: "spawn-slack-chat-app",
    storageBucket: "spawn-slack-chat-app.appspot.com",
    messagingSenderId: "439091282014",
    appId: "1:439091282014:web:b50b66801d103ff3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;