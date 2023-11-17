import head from './head.js';
import { createPost } from './createPost.js';
import post from './post.js';
import footer from './footer.js';
import modalConfirmationDelete from '../modals/modalConfirmationDelete.js';
import modalEdit from '../modals/modalEdit.js';
import { checkAuthStatus } from '../../lib/auth.js';

import {
  deletePost, paintRealTime, updatePost, createPostFirestore, setLikes, usersRealTime,
} from '../../lib/index';

function muro(navigateTo) {
  const sectionWall = document.createElement('section');
  sectionWall.classList.add('section-wall');
  const headComponents = head(navigateTo);
  const content = document.createElement('section'); ///
  content.classList.add('contentWall'); ///
  const createPostComponents = createPost();
  const footerComponents = footer(navigateTo);
  const sectionPost = document.createElement('section');
  sectionPost.classList.add('sectionPost'); ///
  sectionPost.style.marginBottom = '80px';

  /// //////////////////////////////////

  createPostComponents.querySelector('.button-publish').addEventListener('click', () => {
    const txtArea = createPostComponents.querySelector('.txtAreaCreate-post');
    const comment = txtArea.value;
    const loggedUserIdLocalStorage = localStorage.getItem('userId');
    const loggedNameUser = localStorage.getItem('nameUser');

    if (comment === '') {
      alert('no hay datos u.u');
    } else {
      createPostFirestore(comment, loggedUserIdLocalStorage, loggedNameUser);
    }
    txtArea.value = '';
  });

  /// /////////////////////////////////

  usersRealTime((querySnapshotUsers) => {
    const loggedUser = localStorage.getItem('userId');
    let nameUser = '';

    querySnapshotUsers.forEach((user) => {
      const userData = user.data();
      if (userData.uid === loggedUser) {
        nameUser = userData.name;
        localStorage.setItem('nameUser', nameUser);
        console.log(`el usuario es ${nameUser}`);
      }
    });
    if (nameUser === '') {
      console.log('No se encontró el usuario (҂⌣̀_⌣́)');
    }
    return nameUser;
  });

  /// /////////////////////////////////

  paintRealTime((querySnapshot) => {
    sectionPost.textContent = '';
    const arrayLikes = [];
    // querysnapshot nos ayuda a pintar los elementos en tiempo real en la seccion post de muro
    querySnapshot.forEach((doc) => {
      // aqui estan los datos que nos trae de la bd (doc) y los guardamos en variables
      const data = doc.data();
      const id = doc.id;
      // aqui guardamos en un array lo que trae del campo likes de la bd
      arrayLikes.push(doc.data().likes);
      const postComponents = post(data, id);
      sectionPost.append(postComponents);
    });
    // traemos los botones (clases) del modulo post.js
    const btnsDelete = sectionPost.querySelectorAll('.btn-delete');
    const btnsEdit = sectionPost.querySelectorAll('.btn-edit');
    const btnsLike = sectionPost.querySelectorAll('.btnLike-post');

    openModal(btnsDelete);
    openModalEdit(btnsEdit);
    syncLikes(btnsLike);
    printLike(btnsLike, arrayLikes);
  });

  function printLike(btnsLike, arrayLikes) {
    console.log(arrayLikes.length);
    btnsLike.forEach((btn) => {
      printLikes(btn);
    });

    validacionLikesUsers(arrayLikes)
      .then((result) => {
        if (result) {
          console.log(result);
        }
      })
      .catch((error) => {
        console.error('Error al validar likes:', error);
        // Manejar el error si ocurre alguno durante la validación de likes
      });
  }

  const getUserId = () => new Promise((resolve) => {
    checkAuthStatus((user) => {
      if (user) {
        const userId = user.uid;
        // Guardar user.uid en localStorage
        localStorage.setItem('userId', userId);
        resolve(user.uid);
      } else {
        localStorage.removeItem('userId');
        resolve(null);
      }
    });
  });

  async function validacionLikesUsers(arrayUsers) {
    if (arrayUsers === 'undefined' || !arrayUsers) {
      return false;
    }
    const userId = await getUserId();

    arrayUsers.forEach((item) => {
      if (item.includes(userId)) {
        console.log(`${userId} está en el array.`);
        return true;
      }
      console.log(`${userId} no está en el array.`);
      return false;
    });
    console.log(`${userId} no está en el array.`);
    return false;
  }

  function syncLikes(btnsLike) {
    btnsLike.forEach((btn) => {
      // Cuando hagas clic en el botón "like"
      btn.addEventListener('click', async () => {
        console.log('entro');
        const postId = btn.dataset.id;
        const userId = await getUserId(); // Esperar a que se resuelva la promesa

        if (userId) {
          // printLikes(btn);
          setLikes(postId, userId);
        } else {
          console.error('Error: userId no está definido.');
        }
      });
    });
  }

  function printLikes(btnLike) {
    btnLike.classList.add('iconLike-post');
  }

  function openModal(btnsDelete) {
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', () => {
        const dataId = btn.dataset.id;
        console.log(dataId);
        const modalDelete = modalConfirmationDelete();

        document.body.appendChild(modalDelete);
        console.log(modalDelete);
        const btnConfirmDelete = modalDelete.querySelector('.btnConfirm-delete');
        const btnConfirmCancel = modalDelete.querySelector('.btnConfirm-cancel');

        btnConfirmDelete.addEventListener('click', () => {
          console.log('Acción de eliminación confirmada');
          modalDelete.setAttribute('style', 'display: none;');
          deletePost(dataId);
        });

        btnConfirmCancel.addEventListener('click', () => {
          console.log('Acción de cancelación confirmada');
          modalDelete.style.display = 'none';
        });
      });
    });
  }

  function openModalEdit(btnsEdit) {
    btnsEdit.forEach((elemento) => {
      elemento.addEventListener('click', () => {
        const dataId = elemento.dataset.id; // trae los datos de firebase
        const ccomment = elemento.dataset.comment;
        console.log('si entro');
        console.log(ccomment);
        console.log(dataId);
        const modalEditPost = modalEdit(ccomment); // aqui se los manda a la modal
        document.body.appendChild(modalEditPost);
        // console.log(modalEditPost);
        const btnSavePostEdit = modalEditPost.querySelector('.btnSavePost-edit');
        const btnCancel = modalEditPost.querySelector('.btn-cancel');

        btnSavePostEdit.addEventListener('click', async () => {
          console.log('Acción de guardado de cambios confirmada');
          modalEditPost.style.display = 'none';
          // Obtener el nuevo comentario desde la ventana modal
          const newComment = modalEditPost.querySelector('.txtArea-post').value;
          console.log(newComment);
          // Actualizar el post en la base de datos
          await updatePost(dataId, { comment: newComment });
        });

        btnCancel.addEventListener('click', () => {
          console.log('Acción de cancelación confirmada');
          modalEditPost.style.display = 'none';
        });
      });
    });
  }

  content.append(createPostComponents, sectionPost);
  sectionWall.append(headComponents, content, footerComponents);

  return sectionWall;
}

export default muro;
