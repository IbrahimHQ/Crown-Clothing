import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD16xr4dCXWLu32cFwbAepYrt3dYo01bcU",
    authDomain: "crown-clothing-32a17.firebaseapp.com",
    projectId: "crown-clothing-32a17",
    storageBucket: "crown-clothing-32a17.appspot.com",
    messagingSenderId: "141756805625",
    appId: "1:141756805625:web:8075025f4929c0ec8d0d28"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocfromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return; //prevents creating user data if no user is entered
    const userDocRef = doc (db, 'users', userAuth.uid); //doc takes 3 arguments: 1: the getFirestore return, 2: the name of the collection, 3: a unique id
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    try {
        await setDoc (
            userDocRef, {
                displayName, 
                email, 
                createdAt, 
                ...additionalInfo //spreads any unset data into anything with null value, which can only be displayName
            }
        );
    } catch (error) {
        console.log('Error creating the user', error.message);
    }
    } return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; //prevents creating user data if email or password is not entered
    return await createUserWithEmailAndPassword (auth, email, password);
}

export const loginAuthUserWithEmailandPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword (auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);