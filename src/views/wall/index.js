import head from './head.js';
import { createPost } from './createPost.js';
import post from './post.js';
import footer from './footer.js';
import modalConfirmationDelete from '../modals/modalConfirmationDelete.js';
import modalEdit from '../modals/modalEdit.js';
import { checkAuthStatus } from '../../lib/auth.js';

import {
  deletePost, paintRealTime, updatePost, createPostFirestore, setLikes,
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

    if (comment === '') {
      alert('no hay datos u.u');
    } else {
      createPostFirestore(comment);
    }
    txtArea.value = '';
  });

  /// /////////////////////////////////
  paintRealTime((querySnapshot) => {
    sectionPost.textContent = '';
    const arrayLikes = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      arrayLikes.push(doc.data().likes);
      const postComponents = post(data, id);
      sectionPost.append(postComponents);
    });
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
        resolve(user.uid);
      } else {
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
          printLikes(btn);
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

  // function countLike(idpost, numberLikes, btnlike) {
  //   btnLike.forEach((btn) => {
  //     const id = btn.dataset.id;
  //     const contadorElement = btn.parentElement.querySelector('.contadorLike-post');

  //     let likes = parseInt(contadorElement.innerText) || 0;

  //     if (btn.getAttribute('data-liked') !== 'true') {
  //       likes++;
  //       btn.setAttribute('data-liked', 'true');
  //       console.log(`Se dio like. Nuevo contador de likes: ${likes}`);
  //       // Aquí podrías realizar otras acciones, como enviar el like a la base de datos
  //     } else {
  //       likes--;
  //       btn.setAttribute('data-liked', 'false');
  //       console.log(`Se quitó el like. Nuevo contador de likes: ${likes}`);
  //       // Aquí podrías realizar otras acciones, como eliminar el like de la base de datos
  //     }

  //     contadorElement.innerText = likes;
  //   });
  // }

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
