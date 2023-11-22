import {
  getAuth, signOut,
  signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, updateProfile, onAuthStateChanged,
} from 'firebase/auth';

// import { app } from '../config/firebaseConfig';

export { app } from '../config/firebaseConfig';

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export {
  signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, updateProfile, onAuthStateChanged,
};
