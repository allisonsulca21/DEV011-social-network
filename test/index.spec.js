/* eslint-disable max-len */
// especificanmos que usaremos otro ambiente que será usado en todos los tests
/**
 * @jest-environment jsdom
 */

// Se immportan las funciones de autenticación y el módulo de firebase
import {
  createEmailPassword, loginEmailPassword, loginPopUp, signOutUser,
} from '../src/lib/auth';
import * as firebaseAuth from '../src/lib/firebase';

jest.mock('../src/lib/firebase', () => {
  // Se mockea todo el módulo firebaseAuth
  const originalModule = jest.requireActual('../src/lib/firebase');
  return {
    ...originalModule,
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { uid: '123' } }),
    signInWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { uid: '456' } }),
    signInWithPopup: jest.fn().mockResolvedValue({ user: { uid: '121123' } }),
    signOut: jest.fn().mockResolvedValue(),
  };
});

// prueba1 createEmailPassword
describe('Se prueba la funcion createEmailPassword', () => {
  it('Se hace la prueba colocando los argumentos correctos para hace un registro', () => {
    // Se mockea email y password
    const email = 'correo_correcto@gmail.com';
    const password = 'passwordvalido';
    // Se llama a la funcion del archivo auth.js
    const result = createEmailPassword(email, password);
    // Se espera que la funcion se lleme con los argumentos correctos para que se cumpla la prueba.
    // eslint-disable-next-line max-len
    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth.auth, email, password);
    // Se espera como resultado el objeto que es el usuario
    return expect(result).resolves.toEqual({ user: { uid: '123' } });
  });
  it('Nos arroja error si hay algun problema o nuestra promesa se rechaza', () => {
    // Se mockea email y password
    const email = 'correo_correcto@gmail.com';
    const password = 'passwordvalido';
    // Se hace mock de la funcion para que se rechace con un error
    firebaseAuth.createUserWithEmailAndPassword.mockRejectedValue(new Error('Fallo la creacion de usuario'));
    // Se llama a la funcion y se espera el rechazo de la promesa
    return expect(createEmailPassword(email, password)).rejects.toThrow('Fallo la creacion de usuario');
  });
});

// prueba2 signInWithEmailAndPassword
describe('Se prueba la función signInWithEmailAndPassword', () => {
  it('Hace la prueba colocando los argumentos correctos para loguaerse con una cuenta registrada', () => {
    // mockeamos email + password
    const email = 'correo_example@gmail.com';
    const password = 'passwordexample';
    // llamamos la función del archivo auth.js
    const result = loginEmailPassword(email, password);
    // llamamos la función correcta para que se llamen los argumentos correctos para cumplir nuestra prueba.
    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth.auth, email, password);
    // resultado usuario esperado
    return expect(result).resolves.toEqual({ user: { uid: '456' } });
  });
  it('Nos arroja errores si falla o nuestra promesa es rechazada', () => {
    const email = 'correo_example@gmail.com';
    const password = 'passwordexample';
    firebaseAuth.signInWithEmailAndPassword.mockRejectedValue(new Error('Error, las credenciales son inválidas'));
    return expect(loginEmailPassword(email, password)).rejects.toThrow('Error, las credenciales son inválidas');
  });
});

// prueba3 signInWithPopup
describe('signInWithPopup', () => {
  it('Hace la prueba abriendo la ventana emergente para iniciar sesión con Google', () => {
    // // mock para ingresar con el popUp
    // const user = 'usercorrecto';
    // llamamos la función del archivo auth.js
    const result = loginPopUp();
    // llamamos la función correcta para que se llamen los argumentos correctos para cumplir nuestra prueba.
    expect(firebaseAuth.signInWithPopup).toHaveBeenCalledWith(firebaseAuth.auth, firebaseAuth.provider);
    return expect(result).resolves.toEqual({ user: { uid: '121123' } });
  });
  it('Promesa rechazada por errores de autenticación con Google', () => {
    const result = loginPopUp();
    firebaseAuth.signInWithPopup.mockRejectedValue(new Error('Error de autenticación con Google'));
    return expect(loginPopUp(result)).rejects.toThrow('Error de autenticación con Google');
  });
});

// prueba4 signOut
describe('signOut', () => {
  it('Cierra la sesión del usuario logueado', () => {
    const result = signOutUser();
    expect(firebaseAuth.signOut).toHaveBeenCalledWith(firebaseAuth.auth);
    return expect(result).resolves.toEqual();
  });
  it('Nos arroja errores si falla o nuestra promesa es rechazada', () => {
    const result = signOutUser();
    firebaseAuth.signOut.mockRejectedValue(new Error('Ocurrió un error al cerrar sesión'));
    return expect(signOutUser(result)).rejects.toThrow('Ocurrió un error al cerrar sesión');
  });
});
