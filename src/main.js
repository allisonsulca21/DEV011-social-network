// Este es el punto de entrada de tu aplicacion

// file main.js
import home from './views/home';
import login from './views/login.js';
import error from './views/error.js';
import muro from './views/wall/index.js';
import register from './views/register.js';
import profile from './views/profile.js';
import edit from './views/edit.js';
import modalCreatePost from './views/modalCreatePost.js';
import { checkAuthStatus } from './lib/auth.js'; // Solo importa la función de autenticación

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/error', component: error },
  { path: '/muro', component: muro },
  { path: '/register', component: register },
  { path: '/profile', component: profile },
  { path: '/edit', component: edit },
  { path: '/modalCreatePost', component: modalCreatePost },
  { path: '/profile', component: profile },
  { path: '/edit', component: edit },
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

// Despues de navegateTo
checkAuthStatus((user) => {
  const currentPath = window.location.pathname;
  if (user) {
    // Usuario autenticado
    const allowedRoutes = ['/muro', '/perfil'];
    if (!allowedRoutes.includes(currentPath)) {
      // Redirige a la página de muro si intenta acceder a una ruta no permitida
      navigateTo('/muro');
    } else {
      // Usuario autenticado, permite la navegación a las rutas permitidas (muro y perfil)
      navigateTo(currentPath);
    }
  } else {
    // Usuario no autenticado
    const publicRoutes = ['/login', '/register', '/'];
    if (!publicRoutes.includes(currentPath)) {
      // Redirige a la página de inicio si intenta acceder a una ruta no permitida
      navigateTo('/');
    }
  }
});

// Carga la ruta inicial
navigateTo(window.location.pathname || defaultRoute);
