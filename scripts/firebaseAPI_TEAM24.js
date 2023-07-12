//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyD_Zmbil8zYAHlyBSYpfxb3k0oPR1EVKkU",
  authDomain: "myspot-fe819.firebaseapp.com",
  projectId: "myspot-fe819",
  storageBucket: "myspot-fe819.appspot.com",
  messagingSenderId: "1050032436648",
  appId: "1:1050032436648:web:142180e95555c43725599d",
};
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
