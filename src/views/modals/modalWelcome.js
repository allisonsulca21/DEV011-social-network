function modalWelcome() {
  const welcomeModal = document.createElement('section');
  const modalContent = document.createElement('div');
  const imgContainer = document.createElement('div');
  const img = document.createElement('img');
  const textModal = document.createElement('h1');
  const buttonContinue = document.createElement('button');

  modalContent.classList.add('contentModal');
  welcomeModal.classList.add('welcomeModal');
  imgContainer.classList.add('containerImage');
  img.classList.add('modalImg');
  textModal.classList.add('modalText');
  buttonContinue.classList.add('continueBtn');

  // img.src = '/src/img-sn/wavesModal.svg';
  // img.src = '/src/img-sn/profile.jpg';
  textModal.textContent = 'Welcome to Festigram! A pleasure meeting you';
  buttonContinue.textContent = 'Continue';

  imgContainer.append(img);
  modalContent.append(imgContainer, textModal, buttonContinue);
  welcomeModal.append(modalContent);

  return welcomeModal;
}
export default modalWelcome;
