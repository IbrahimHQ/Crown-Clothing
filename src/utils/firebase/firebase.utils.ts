import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
    UserCredential
} from 'firebase/auth';

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category, CategoryMap } from '../../contexts/category.types';

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
type ObjectToAdd = {
    title: string;
};

export const addCollectionandDocuments = async <T extends ObjectToAdd>(
    collectionKey: string, 
    objectsToAdd: T[], 
    id: string
): Promise<void> => { 
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, id.toLowerCase()); //creates new doc ref where id is passed in
        batch.set(docRef, object); //sets ref with the object's id to the object
    })
    await batch.commit(); //will fire off the batch
};

//export get data functions
export const getCategoriesandDocuments = async (): Promise<CategoryMap> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data() as Category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {} as CategoryMap);
    return categoryMap;
}

type AdditionalInfoType = {
    displayName?: string;
};

type UserData = {
    displayName: string;
    email: string;
    createdAt: string;
};

export const createUserDocfromAuth = async (
    userAuth: User, 
    additionalInfo = {} as AdditionalInfoType
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
        console.log('Error creating the user', error);
    }
    } return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword (auth, email, password);
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};

//export sign-in & sign-out functions
export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const loginAuthUserWithEmailandPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword (auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);