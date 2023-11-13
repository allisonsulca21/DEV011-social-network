function modalEdit(comment) {
  const sectionEditModal = document.createElement('section');
  const modalContent = document.createElement('div');
  const tituloEdit = document.createElement('h2');
  const txtAreaPost = document.createElement('textarea');
  const btnSaveEdit = document.createElement('button');
  const btnCancel = document.createElement('button');

  sectionEditModal.classList.add('section-edit');
  modalContent.classList.add('modalContent-edit');
  tituloEdit.classList.add('tituloModal-edit');
  txtAreaPost.classList.add('txtArea-post');
  btnSaveEdit.classList.add('btnSavePost-edit');
  btnCancel.classList.add('btn-cancel');

  tituloEdit.textContent = 'Edit Post';
  txtAreaPost.textContent = comment;
  btnCancel.textContent = 'Cancel';
  btnSaveEdit.textContent = 'Save';

  modalContent.append(tituloEdit, txtAreaPost, btnCancel, btnSaveEdit);
  sectionEditModal.append(modalContent);

  return sectionEditModal;
}
export default modalEdit;
