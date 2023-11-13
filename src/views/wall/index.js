/* eslint-disable no-use-before-define */
import head from './head.js';
import { createPost } from './createPost.js';
import post from './post.js';
import footer from './footer.js';
import modalConfirmationDelete from '../modals/modalConfirmationDelete.js';

import { deletePost, paintRealTime } from '../../lib/index';

function muro(navigateTo) {
  const sectionWall = document.createElement('section');
  sectionWall.classList.add('section-wall');
  const headComponents = head(navigateTo);
  const createPostComponents = createPost();
  const footerComponents = footer(navigateTo);
  const sectionPost = document.createElement('section');
  sectionPost.style.marginBottom = '80px';

  /// /////////////////////////////////
  paintRealTime((querySnapshot) => {
    sectionPost.textContent = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const postComponents = post(data, id);
      sectionPost.append(postComponents);
    });
    const btnsDelete = sectionPost.querySelectorAll('.btn-delete');
    openModal(btnsDelete);
  });

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
    // función edit post

    // función likes
  }

  sectionWall.append(headComponents, createPostComponents, sectionPost, footerComponents);

  return sectionWall;
}

export default muro;
