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
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    connectFirestoreEmulator,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCI9zC-oA2x45bgDVb4tcROvuSppZBQeu4",
    authDomain: "crwn-clothing-db-6441c.firebaseapp.com",
    projectId: "crwn-clothing-db-6441c",
    storageBucket: "crwn-clothing-db-6441c.appspot.com",
    messagingSenderId: "342956039311",
    appId: "1:342956039311:web:5efbae42903542e746e4fa"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => 
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//put objects into database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    //create a collection with a reference to that collection (collectionRef)
    const collectionRef = collection(db, collectionKey);

    //create a batch so we can add all objects to collection in one succesful transaction
    const batch = writeBatch(db);

    //iterate through each object in array
    objectsToAdd.forEach((object) => {
        //add batch set call, creating a new doc ref for each object
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    //begin final transaction
    await batch.commit();
};

//get products from database
export const getCategoriesAndDocuments = async () => {
    //create collection reference
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    //if the user does not exist
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    // onAuthStateChanged(auth, callback, errorCallback, completedCallback);
    onAuthStateChanged(auth, callback);
}