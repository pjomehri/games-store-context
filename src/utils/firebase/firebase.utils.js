import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzsy_iYnMFZn0K1clDIWwMvd2BpLrartA",
  authDomain: "game-store-db.firebaseapp.com",
  projectId: "game-store-db",
  storageBucket: "game-store-db.appspot.com",
  messagingSenderId: "860650474463",
  appId: "1:860650474463:web:8a08dae87cfb949ab3126a",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

// Firebase iniitialize Auth instance
export const auth = getAuth();

// OAuth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInwithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Initialize Firestore database
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("batch complete");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// In the project repo you can find a method that merges both the following two functions into one
// Create a user entry from authenticated users
export const createUserDocumentFromOAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { email, displayName } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, { email, displayName, createdDate });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  if (!email || !password) return;

  const userDocRef = doc(db, "users", email);
  // console.log(
  //   "Document Ref inside createAuthUserWithEmailAndPassword.util : ",
  //   userDocRef
  // );

  const userSnapShot = await getDoc(userDocRef);
  // console.log(
  //   "User snapshot inside createAuthUserWithEmailAndPassword.util : ",
  //   userSnapShot
  // );

  // console.log(
  //   "User snapshot extists? inside createAuthUserWithEmailAndPassword.util :",
  //   userSnapShot.exists()
  // );
  if (userSnapShot.exists()) {
    alert("cannot create account, email already in use");
  }

  if (!userSnapShot.exists()) {
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, { email, displayName, createdDate });
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create account, email already in use");
      }
      console.log("error creating the user", error.message);
    }
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const userDocRef = doc(db, "users", email);
  // console.log(
  //   "Document Ref inside createAuthUserWithEmailAndPassword.util : ",
  //   userDocRef
  // );

  const userSnapShot = await getDoc(userDocRef);
  // console.log(
  //   "User snapshot inside createAuthUserWithEmailAndPassword.util : ",
  //   userSnapShot
  // );

  // console.log(
  //   "User snapshot extists? inside createAuthUserWithEmailAndPassword.util :",
  //   userSnapShot.exists()
  // );
  if (!userSnapShot.exists()) {
    alert("cannot sign in, account does not exist");
  }

  if (userSnapShot.exists()) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error) {
        alert("Cannot sign in", error.message);
      }
    }
  }
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
