function footer(navigateTo) {
  const containerFooterWall = document.createElement('div');
  const btnHome = document.createElement('button');
  const btnCreatePost = document.createElement('button');
  const btnProfile = document.createElement('button');
 

  containerFooterWall.classList.add('containerFooter-wall');
  btnHome.classList.add('btnHome-footer');
  btnCreatePost.classList.add('btnCreatePost-footer');
  btnProfile.classList.add('btnProfile-footer');

  btnHome.addEventListener('click', () => {
    navigateTo('/');
  });

  btnCreatePost.addEventListener('click', () => {
    navigateTo('/modalCreatePost');
  });

  btnProfile.addEventListener('click', () => {
    navigateTo('/profile');
  });

  containerFooterWall.append(btnHome, btnCreatePost, btnProfile);
  return containerFooterWall;
}
export default footer;
