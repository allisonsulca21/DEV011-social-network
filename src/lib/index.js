import {
  db, collection, addDoc, getDocs, orderBy, query, onSnapshot, serverTimestamp, doc, deleteDoc,
  updateDoc, arrayUnion, getFirestore, getDoc, arrayRemove,
} from './firestore';

const postCollection = collection(db, 'post');
const usersCollection = collection(db, 'users');

// Función para llevar la data
export const createPostFirestore = (comment, userId, name) => {
  addDoc(postCollection, {
    comment,
    date: serverTimestamp(),
    likes: [],
    userId,
    name,
  });
};

export const querySnapshot = getDocs(postCollection);
export const querySnapshotUsers = getDocs(usersCollection);

const q = query(postCollection, orderBy('date', 'desc'));

export const paintRealTime = (callBack) => onSnapshot(q, callBack);

// hace  una consulta a la bd en tiempo real
export const usersRealTime = (callBack) => onSnapshot(usersCollection, callBack);

// Elimina el documento del id seleccionado
export const deletePost = (id) => deleteDoc(doc(db, 'post', id));

// Hace una actualización de documento en el id seleccionado
export const updatePost = async (id, newData) => {
  try {
    const postRef = doc(db, 'post', id);
    await updateDoc(postRef, newData);
    console.log('Post actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el post:', error);
  }
};

// Función para agregar like
export const setLikes = async (postId, userId) => {
  try {
    const bd = getFirestore();
    const postRef = doc(bd, 'post', postId);

    const getDocuement = await getDoc(postRef);
    console.log(getDocuement.data().likes);
    if (getDocuement.data().likes.includes(userId)) {
      console.log('deberria entrar cuando ya este el like');
      // const newArr = getDocuement.data().likes.filter((like) => like !== userId);
      updateDoc(postRef, {
        likes: arrayRemove(userId),
      });
      console.log(`Se quitoo like al post ${postId}`);
    } else {
      console.log('entra al like eeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      updateDoc(postRef, {
        likes: arrayUnion(userId),
      });
    }

    console.log(`Se dio like al post ${postId}`);
    // console.log(`usuario ${userId}`);
  } catch (error) {
    console.error('Error al actualizar los likes:', error);
  }
};

// Funcion para agregar a los usuarios registrados a la coleccion de users de firestore
export const addUserToFirestore = async (uid, name) => {
  try {
    // Añade el usuario a la colección 'users' con su UID y nombre
    await addDoc(usersCollection, {
      name,
      uid,
    });

    console.log('Usuario añadido a la colección users con éxito');
  } catch (error) {
    console.error('Error al añadir usuario a la colección users:', error);
  }
};

// Funcion para obtener los id de usuario de la coleccion users
export const getUserFromFirestore = async (userId) => {
  try {
    const userDoc = await getDoc(doc(usersCollection, userId));

    return userDoc;
  } catch (error) {
    console.error('Error al obtener usuario desde Firestore:', error);
    throw error;
  }
};
