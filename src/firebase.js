import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
//import 'firebase/storage';
const config={
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
 }




const app=firebase.initializeApp(
    config
);


  const db=app.firestore();
  const auth=app.auth();
  const storage=app.storage();

  export {db,auth,storage} 

