import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD16xr4dCXWLu32cFwbAepYrt3dYo01bcU",
    authDomain: "crown-clothing-32a17.firebaseapp.com",
    projectId: "crown-clothing-32a17",
    storageBucket: "crown-clothing-32a17.appspot.com",
    messagingSenderId: "141756805625",
    appId: "1:141756805625:web:8075025f4929c0ec8d0d28"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup (auth, provider);
  export const db = getFirestore();

  export const createUserDocfromAuth = async (userAuth) => {
    const userDocRef = doc (db, 'users', userAuth.uid); //doc takes 3 arguments: 1: the getFirestore return, 2: the name of the collection, 3: a unique id
    const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
        await setDoc (userDocRef, {displayName, email, createdAt});
    } catch (error) {
        console.log('Error creating the user', error.message);
    }
  } return userDocRef;
}