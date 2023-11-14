import { updateProfile } from 'firebase/auth';
// import head from './wall/head';
import { createEmailPassword } from '../lib/auth.js';

function register(navigateTo) {
  // const headComponents = head('aqui');

  const containerReg = document.createElement('section');
  // const btnMuro = document.createElement('button');
  // btnMuro.classList.add('buttonho');

  containerReg.classList.add('container-register');
  containerReg.innerHTML = `
  <div class='container'>
    <div class='container-left'></div>
    
        <div class='container-right'>
        <div class='head-register'>
          <div class='btn-back-home'>
              <a href='/login'> <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <circle cx="17.5" cy="17.5" r="16" stroke="white" stroke-width="3" />
                <path d="M20 10L11 17.5L20 25" stroke="white" stroke-width="3" stroke-linecap="round" />
              </svg></a>
          </div>
              <div class='title-register'> 
                <h2>Registro</h2>
              </div>
        </div>
      
              <form class='form-register'>
                <label for="emailAddress">Email address</label>
                  <input type="text" id="emailAdress" placeholder='Email Address'/>

                <label for="fullName">Name</label>
                  <input type="text" id="name" placeholder='Name'/>

                <label for="password">Password</label>
                  <input type="password" id="password" placeholder='Password'/>

                <label for="confirm password">Confirm Password</label>
                  <input type="password" id="confirmPassword" placeholder='Confirm Password'/>
                  
                <button id="registerButton">Create Account</button>

            </form>
        </div>
    </div>
  </div>
`;
  const registerButton = containerReg.querySelector('#registerButton');
  registerButton.addEventListener('click', () => {
    event.preventDefault();
    const email = containerReg.querySelector('#emailAdress').value;
    const password = containerReg.querySelector('#password').value;
    const name = containerReg.querySelector('#name').value;
    const confirmPassword = containerReg.querySelector('#confirmPassword').value;

    function isValidEmail(email) {
    // Expresión regular para validar un correo electrónico
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      // Usamos el método `test` para verificar si el correo cumple con el patrón
      return emailPattern.test(email);
    }
    const errors = [];
    if (!isValidEmail(email)) {
      errors.push('Por favor escribe un correo valido');
    }
    if (name.length === 0) {
      errors.push('No has completado el campo Name');
    }
    if (password.length < 8) {
      errors.push('La contraseña debe contener al menos 8 caracteres.');
    }
    if (password !== confirmPassword) {
      errors.push('Las contraseñas no coinciden. Vuelve a intentar.');
    }
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // Registra al usuario con correo electrónico y contraseña
    createEmailPassword(email, password)
      .then((userCredential) => {
      // Usuario registrado con éxito
        const user = userCredential.user;
        console.log('Usuario registrado con éxito:', user);
        // Actualiza el perfil del usuario con su nombre
        updateProfile(user, {
          displayName: name,
        }).then(() => {
        // Perfil actualizado con éxito
          console.log('Perfil de usuario actualizado con éxito:', user);
        }).catch((error) => {
        // Maneja errores de actualización de perfil
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error de actualización de perfil:', errorCode, errorMessage);
        });
        // Redirige al usuario a la página wall
        navigateTo('/muro');
      })
      .catch((error) => {
      // Maneja errores de registro
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de registro:', errorCode, errorMessage);
      });
  });
  // btnMuro.textContent = 'Crear cuenta';
  // btnMuro.addEventListener('click', () => {
  //   navigateTo('/muro');
  // });

  // containerReg.append(headComponents, btnMuro);
  containerReg.append();
  return containerReg;
}

export default register;
