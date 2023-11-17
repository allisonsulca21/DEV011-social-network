import { signOutUser } from '../../lib/auth.js';

function head(navigateTo) {
  const sectionHead = document.createElement('section');
  const containerHead = document.createElement('div');
  const line = document.createElement('div');
  const imgLogoWall = document.createElement('img');
  const btnSignUpWall = document.createElement('button');

  sectionHead.classList.add('section-head');
  containerHead.classList.add('container-head');
  line.classList.add('line-section');
  imgLogoWall.classList.add('imgLogo-wall');
  btnSignUpWall.classList.add('btnSignUp-wall');
  // cambio logooo09/11
  imgLogoWall.src = './img-sn/festilogoLetras-1-01.svg';
  btnSignUpWall.textContent = 'Sign Out';
  btnSignUpWall.addEventListener('click', () => {
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

  containerHead.append(imgLogoWall, btnSignUpWall);
  line.append(containerHead);
  sectionHead.append(containerHead, line);
  return sectionHead;
}

export default head;
