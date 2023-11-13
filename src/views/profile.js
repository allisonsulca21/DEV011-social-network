// file profile.js
function profile(navigateTo) {
  const bodyCont = document.createElement('body');
  bodyCont.classList.add('bodypro');
  const imageHeader = document.createElement('img');
  imageHeader.classList.add('imghpro');
  const nav = document.createElement('nav');
  nav.classList.add('navpro');
  const image = document.createElement('img');
  image.classList.add('imgpro');
  const name = document.createElement('h2');
  name.classList.add('namepro');
  const address = document.createElement('address');
  address.classList.add('addresspro');
  const article = document.createElement('article');
  article.classList.add('acticlepro');
  const main = document.createElement('main');
  main.classList.add('mainpro');
  const homeBar = document.createElement('homeBar');
  homeBar.classList.add('homeBarPro');
  const homeIcon = document.createElement('aside');
  homeIcon.classList.add('homeIcon');
  const moreIcon = document.createElement('section');
  moreIcon.classList.add('moreIcon');
  const profileIcon = document.createElement('section');
  profileIcon.classList.add('profileIcon');
  // buttons
  const buttonEditP = document.createElement('button');
  buttonEditP.classList.add('buttonEdit');
  const buttonExit = document.createElement('button');
  buttonExit.classList.add('buttonExit');

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
        navigateTo('/');
    });
        
    nav.appendChild(imgProfile);
    document.body.appendChild(nav);
    bodyCont.append(imageHeader, nav, image, name, address, article, main, buttonEditP, buttonExit, homeBar, homeIcon, moreIcon, profileIcon);
    return bodyCont;
}
export default profile;
