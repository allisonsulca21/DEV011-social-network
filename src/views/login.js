// file login.js
import { loginEmailPassword, loginPopUp } from '../lib/auth';
import modalWelcome from './modals/modalWelcome';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function login(navigateTo) {
  const containerLog = document.createElement('section');

  containerLog.classList.add('containerLog');
  containerLog.innerHTML = `
       <main >
         <h2 class= 'logIn'>Log In</h2>
        <form class = 'formLogIn'> 
          <label class= 'emailLog' for="emailAddress">Email address</label>
            <input class='inputLog' type="email" id="emailAddress" placeholder='Email Address'/>

          <label class= 'passwordLog' for="password">Password</label>
            <input class='inputLog' type="password" id="password" placeholder='Password'/>
          
          <dd class='linkToResetPassword'> 
            <a href="https://www.weverse.io/" class='reset' target="_blank"> Forgot your password? </a>
          </dd>
        </form>
       </main>
       `;
  const buttonLogIn = document.createElement('button');
  const buttons = document.createElement('section');
  const buttonRegister = document.createElement('button');
  const buttonReturn = document.createElement('button');
  const other = document.createElement('section');
  buttons.classList.add('buttons');
  buttonLogIn.classList.add('buttonLog');
  buttonRegister.classList.add('buttonReg');
  buttonReturn.classList.add('buttonRet');
  other.classList.add('otherOption');

  other.textContent = 'You can access with your Google Account';

  const buttonGoogle = document.createElement('button');
  buttonGoogle.classList.add('googlelog');
  const imageGoogle = document.createElement('img');
  imageGoogle.classList.add('imgGoogle');

  imageGoogle.src = '../../img-sn/google.png';
  imageGoogle.alt = 'Google png';

  buttonGoogle.addEventListener('click', () => {
    // Abre una ventana emergente para iniciar sesión con Google
    loginPopUp()
      .then((result) => { // El usuario ha iniciado sesión con éxito con Google
        const user = result.user;
        console.log('Usuario autenticado con éxito:', user);
        // history.pushState(null, null, '/muro');

        // llama a la función de navegación para cargar la vista "wall"
        navigateTo('/muro');
      }).catch((error) => { // Handle Errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de autenticación con Google:', errorCode, errorMessage);
      });
  });

  buttonLogIn.textContent = 'Log In';

  buttonRegister.textContent = 'Register';
  buttonRegister.addEventListener('click', () => {
    navigateTo('/register');
  });

  buttonReturn.textContent = 'Return';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  // LOGUEO EMAIL

  buttonLogIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = containerLog.querySelector('#emailAddress').value;
    const password = containerLog.querySelector('#password').value;

    loginEmailPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // alert('Inicio de sesión exitoso.', user);
        const welcomeModal = modalWelcome(user);
        document.body.appendChild(welcomeModal);
        console.log(welcomeModal);

        const btnContinue = welcomeModal.querySelector('.continueBtn');

        btnContinue.addEventListener('click', () => {
          welcomeModal.style.display = 'none';
        });

        // navigateTo('/muro');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Los datos no coinciden.', errorCode, errorMessage);
        // alert de error
        alert('Error: Los datos no coinciden.');
      });
  });

  buttonGoogle.appendChild(imageGoogle);
  buttons.append(buttonRegister, buttonReturn);
  containerLog.append(buttonLogIn, other, buttonGoogle, buttons);
  return containerLog;
}
export default login;
