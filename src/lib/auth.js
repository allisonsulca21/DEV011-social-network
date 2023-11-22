import {
  auth, signInWithEmailAndPassword, provider, signInWithPopup, createUserWithEmailAndPassword,
  signOut, updateProfile,
} from './firebase.js';

import { getUserFromFirestore } from './index.js';

export const loginEmailPassword = (email, password) => {
  console.log(email, password);
  return signInWithEmailAndPassword(auth, email, password);
};
export const loginPopUp = () => {
  console.log('pop up');
  return signInWithPopup(auth, provider);
};

export const createEmailPassword = (email, password) => {
  console.log('email password');
  return createUserWithEmailAndPassword(auth, email, password);
};

// Función de status
export const checkAuthStatus = async (callback) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // Si hay un usuario autenticado, actualiza el perfil con el nombre
      const name = user.displayName;

      // Si el usuario no tiene un nombre, intenta obtenerlo desde Firestore
      if (!name) {
        const userData = await getUserFromFirestore(user.uid);
        if (userData.exists()) {
          const userName = userData.data().name;
          updateProfile(user, { displayName: userName });
        }
      }
    }
    callback(user);
  });
};
// Funcion para cerrar sesion
export const signOutUser = () => signOut(auth);
