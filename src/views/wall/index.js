import head from './head.js';
import createPost from './createPost.js';
import post from './post.js';
import footer from './footer.js';
import { querySnapshot } from '../../lib/index';

function muro(navigateTo) {
  console.log('muro');
  const sectionWall = document.createElement('section');
  sectionWall.classList.add('section-wall');
  const sectionPost = document.createElement('section');

  const headComponents = head(navigateTo);
  const createPostComponents = createPost();

  const footerComponents = footer(navigateTo);

  querySnapshot.then((snapshot) => {
    snapshot.forEach((doc) => {
      const postComponents = post(doc.data());
      sectionPost.append(postComponents);
    });
  });

  sectionWall.append(headComponents, createPostComponents, sectionPost, footerComponents);
  return sectionWall;
}

export default muro;
