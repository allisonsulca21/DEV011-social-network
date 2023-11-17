// file home.js
function home(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('sectionho');
  section.classList.add('textho');
  const title = document.createElement('h2');
  // section.classList.add('textho');
  const image = document.createElement('img');
  image.classList.add('imgho');
  const buttonStart = document.createElement('button');
  buttonStart.classList.add('buttonStart');

  image.src = './img-sn/festilogoV2.png';
  title.textContent = 'Welcome to Festigram, the largest community of concerts and festivals around the world!';

  buttonStart.textContent = 'Get Started!';
  buttonStart.addEventListener('click', () => {
    navigateTo('/login');
  });

  section.append(image, title, buttonStart);
  return section;
}

export default home;
