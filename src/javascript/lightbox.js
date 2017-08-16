const lightboxItems = document.querySelectorAll('.lightbox__item');

for(let i = 0; i < lightboxItems.length; i++) {

  const lightboxItem = lightboxItems[i];

  lightboxItem.addEventListener('click', (e) => {

  e.stopPropagation();
  e.preventDefault();
  const lightbox = document.querySelector('.lightbox');
  const body = document.body;
  // const thisItem = event.target.cloneNode(true);

  const thisItemSrc = event.target.style.backgroundImage.slice(4, -1);
  const thisItem = thisItemSrc.replace(/"/g, "");

  const fullView = document.createElement('div');
  const overlay = document.createElement('div');
  const viewContent = document.createElement('img');

  body.insertBefore(fullView, e.firstChild);
  body.insertBefore(overlay, body.firstChild);
  fullView.append(viewContent);
  fullView.classList.add('lighbox__item--fullview');
  overlay.classList.add('overlay');
  body.classList.add('overflow-hidden', 'pointer');
  viewContent.setAttribute('src', thisItem);

    body.addEventListener('click', (e) => {
    overlay.remove();
    fullView.remove();
    body.classList.remove('fixed', 'overflow-hidden', 'pointer');
    e.stopPropagation();
    e.preventDefault();
  });

});

};


