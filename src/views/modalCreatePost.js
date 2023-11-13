// file home.js
function modalCreatePost(navigateTo) {
  const section = document.createElement('section');
  const sectionHead = document.createElement('div');
  const containerTittle = document.createElement('div');
  const title = document.createElement('h2');
  const containerbtn = document.createElement('div');
  const btnClose = document.createElement('button');
  const containerElemetsPost = document.createElement('div');
  const sectionElementPosts = document.createElement('div');
  const containerTxtArea = document.createElement('div');
  const txtArea = document.createElement('textarea');
  const containerBtnImg = document.createElement('div');
  const imgPost = document.createElement('input');

  section.classList.add('section-modalPost');
  sectionHead.classList.add('sectionHead-modalPost');
  containerTittle.classList.add('containerTittle-modal');
  title.classList.add('title-modal');
  containerbtn.classList.add('containerBtn-modal');
  btnClose.classList.add('btnClose-modal');
  containerElemetsPost.classList.add('containerElemetsPost-modal');
  sectionElementPosts.classList.add('sectionElements-modal');
  containerTxtArea.classList.add('containerTxtArea-modal');
  txtArea.classList.add('txtArea-modal');
  containerBtnImg.classList.add('containerBtnImg-modal');
  imgPost.classList.add('imgPost-modal');

  title.textContent = 'create post';

  containerTittle.append(title);
  containerbtn.append(btnClose);
  sectionHead.append(containerTittle, containerbtn);
  containerBtnImg.append(imgPost);
  containerTxtArea.append(txtArea);
  containerElemetsPost.append(containerTxtArea, containerBtnImg);
  sectionElementPosts.append(containerElemetsPost);
  section.append(sectionHead, sectionElementPosts);
  return section;
}

export default modalCreatePost;
