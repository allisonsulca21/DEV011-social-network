// importamos la funcion que vamos a testear
/**
 * @jest-environment jsdom
 */

// Importa las funciones individuales desde la ruta correcta
// Importa las funciones y las dependencias necesarias
import { createPostFirestore, setLikes, deletePost } from '../src/lib/index.js';
import {
  addDoc, serverTimestamp, getDoc, updateDoc, arrayUnion, deleteDoc,
} from '../src/lib/firestore.js'; // Ajusta las importaciones según sea necesario

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'), // Mantiene las funciones no mockeadas
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),

}));

// Descripción de las pruebas para createPostFirestore
describe('Prueba para la funcion createPostFirestore', () => {
  test('Muestra la creacion de un post', async () => {
    // Configurar mocks necesarios
    addDoc.mockResolvedValueOnce();

    // Llamar a la función
    await createPostFirestore('Post');

    // Asegurar que la función addDoc fue llamada con los parámetros esperados
    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(),
      {
        comment: 'Post',
        date: serverTimestamp(),
        likes: [],
      },
    );
  });
});

// Descripción de las pruebas para setLikes
describe('Prueba la funcion setLikes', () => {
  test('Llama a la funcion y muestra el id del post y el de usuario ', async () => {
    // Configurar mocks necesarios
    getDoc.mockResolvedValueOnce({ data: () => ({ likes: [] }) });

    // Llamar a la función
    await setLikes('mock-post-id', 'mock-user-id');

    // Asegurar que la función getDoc fue llamada con los parámetros esperados
    expect(getDoc).toHaveBeenCalledWith(expect.anything());

    // Asegurar que la función updateDoc fue llamada con los parámetros esperados
    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      { likes: arrayUnion('mock-user-id') },
    );
  });
});

describe('Prueba la funcion deletePost', () => {
  test('Se elimina el post seleccionado', async () => {
    // Configurar mocks necesarios
    deleteDoc.mockResolvedValueOnce();

    // Llamar a la función
    await deletePost('mock-post-id-to-delete');

    // Asegurar que la función deleteDoc fue llamada con los parámetros esperados
    expect(deleteDoc).toHaveBeenCalledWith(
      expect.anything(),
    );
  });
});
