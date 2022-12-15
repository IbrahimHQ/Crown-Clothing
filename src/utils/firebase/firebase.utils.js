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
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

export const auth = getAuth(firebaseApp); //see firebase docs
export const db = getFirestore();

//export add data functions
export const addCollectionandDocuments = async (collectionKey, objectsToAdd, id) => { 
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[id].toLowerCase()); //creates new doc ref where id is passed in
        batch.set(docRef, object); //sets ref with the object's id to the object
    })
    await batch.commit(); //will fire off the batch
    console.log('done');
};

//export get data functions
export const getCategoriesandDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});
    return categoryMap;
}


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

//export sign-in & sign-out functions
export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const loginAuthUserWithEmailandPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword (auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);