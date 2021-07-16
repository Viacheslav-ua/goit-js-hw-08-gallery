const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const arrMarkup = galleryItems.map(item => {
  const itemEl = document.createElement('li');
  itemEl.classList.add('gallery__item');

  const linkEl = document.createElement('a');
  linkEl.classList.add('gallery__link');
  linkEl.href = item.original;

  const imageEl = document.createElement('img');
  imageEl.classList.add('gallery__image');
  imageEl.src = item.preview;
  imageEl.alt = item.description;
  imageEl.dataset.source = item.original;

  linkEl.appendChild(imageEl);
  itemEl.appendChild(linkEl);
  return itemEl;
});

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightBox: document.querySelector('.js-lightbox'),
  lightBoxImage: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  closeLightBoxBtn: document.querySelector('[data-action="close-lightbox"]'),
}

refs.galleryList.append(...arrMarkup);

refs.galleryList.addEventListener('click', onPicturesClick);
refs.closeLightBoxBtn.addEventListener('click', onCloseLightBox);
refs.lightboxOverlay.addEventListener('click', onCloseLightBox);



function onPicturesClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;

  window.addEventListener('keydown', onKeyboardClick);

  refs.lightBoxImage.src = e.target.dataset.source;
  refs.lightBoxImage.alt = e.target.alt;
  refs.lightBox.classList.add('is-open');
}

function onCloseLightBox() {
  window.removeEventListener('keydown', onKeyboardClick);

  refs.lightBox.classList.remove('is-open');
  refs.lightBoxImage.src = '';
  refs.lightBoxImage.alt = '';


}

function onKeyboardClick(e) {
  switch (e.code) {
    case 'Escape':
      onCloseLightBox()
      break;
    case 'ArrowLeft':
      goNPicture(-1);
      break;
    case 'ArrowRight':
      goNPicture(1);
      break;
  }
}

function goNPicture(n) {
  const activeIndex = galleryItems.findIndex(item => item.original === refs.lightBoxImage.src);
  const nIndex = activeIndex + n;
  
  if(nIndex < 0 || nIndex > galleryItems.length - 1) return;

  refs.lightBoxImage.alt = galleryItems[nIndex].description;
  refs.lightBoxImage.src = galleryItems[nIndex].original;
}