import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
//import 'firebase/storage';
const config={
    apiKey: "AIzaSyA66VCBovMQx9eJlFN-ppsPiWAWvCrGwhw",
    authDomain: "claps-bp.firebaseapp.com",
    projectId: "claps-bp",
    storageBucket: "claps-bp.appspot.com",
    messagingSenderId: "544675012413",
    appId: "1:544675012413:web:53ce05ec5e44a315466f54"
 }




const app=firebase.initializeApp(
    config
);


  const db=app.firestore();
  const auth=app.auth();
  const storage=app.storage();

  export {db,auth,storage} 

