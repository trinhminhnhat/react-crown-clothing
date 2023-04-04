import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import { doc, getDoc, getFirestore, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

const auth = getAuth();

const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const db = getFirestore();

const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());

        batch.set(docRef, object);
    });

    // commit transaction
    await batch.commit();
    console.log('addCollectionAndDocuments done');
};

const getCategoriesAndDocuments = async () => {
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

const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error createUserDocumentFromAuth: ', error.message);
        }
    }

    return userDocRef;
};

const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = async () => await signOut(auth);

const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);

export {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    db,
    createUserDocumentFromAuth,
    createAuthUserWithEmailAndPassword,
    signInAuthUserWithEmailAndPassword,
    signOutUser,
    onAuthStateChangeListener,
    addCollectionAndDocuments,
    getCategoriesAndDocuments,
};
