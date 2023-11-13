// file profile.js
// import footer from './wall/footer.js';
import { signOutUser } from '../lib/auth.js';

function profile(navigateTo) {
  // const footerComponents = footer(navigateTo);

  const bodyCont = document.createElement('body');
  const header = document.createElement('section');
  const imageHeader = document.createElement('img');
  const buttonReturn = document.createElement('button');
  const nav = document.createElement('nav');
  const image = document.createElement('img');
  const name = document.createElement('h2');
  const address = document.createElement('address');
  const article = document.createElement('article');
  const main = document.createElement('main');
  const homeBar = document.createElement('homeBar');
  const homeIcon = document.createElement('aside');
  const moreIcon = document.createElement('section');
  const profileIcon = document.createElement('section');

  bodyCont.classList.add('bodypro');
  header.classList.add('headerProfile');
  imageHeader.classList.add('imghpro');
  buttonReturn.classList.add('buttonReturn');
  nav.classList.add('navpro');
  image.classList.add('imgpro');
  name.classList.add('namepro');
  address.classList.add('addresspro');
  article.classList.add('acticlepro');
  main.classList.add('mainpro');
  homeBar.classList.add('homeBarPro');
  homeIcon.classList.add('homeIcon');
  moreIcon.classList.add('moreIcon');
  profileIcon.classList.add('profileIcon');
  // buttons
  const buttons = document.createElement('section');
  const buttonEditP = document.createElement('button');
  const buttonExit = document.createElement('button');

  buttons.classList.add('buttonsContainer');
  buttonEditP.classList.add('buttonEdit');
  buttonExit.classList.add('buttonExit');

  buttonReturn.src = '../img-sn/buttonReturn.svg';
  imageHeader.src = '../img-sn/header.jpg';
  // nav.textContent = 'img';
  // image.src = '../img-sn/profile.jpg';
  name.textContent = '@username';
  address.textContent = 'tucorreo@gmail.com';

  const imgProfile = document.createElement('img');
  imgProfile.classList.add('imgProfile');

  imgProfile.src = '../img-sn/profile.jpg';
  imgProfile.alt = 'Profile';

  // article(web)
  // main + posts

  buttonEditP.textContent = 'Edit';
  buttonEditP.addEventListener('click', () => {
    navigateTo('/edit');
  });

  buttonExit.textContent = 'Log Out';
  buttonExit.addEventListener('click', () => {
    signOutUser()
      .then(() => {
      // Usuario desconectado con éxito
      // Redirige a la página de inicio
        navigateTo('/');
      })
      .catch((error) => {
      // Maneja errores de cierre de sesión
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al cerrar sesión:', errorCode, errorMessage);
      });
  });

  header.appendChild(imageHeader, buttonReturn);
  nav.appendChild(imgProfile);
  document.body.appendChild(nav);
  buttons.append(buttonEditP, buttonExit);
  // eslint-disable-next-line max-len
  bodyCont.append(header, nav, image, name, address, buttons, article, main, homeBar, homeIcon, moreIcon, profileIcon);
  return bodyCont;
}
export default profile;
