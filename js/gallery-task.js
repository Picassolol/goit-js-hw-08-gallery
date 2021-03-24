import imagesRef from "../gallery-items.js";
const galleryList = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const backdropRef = document.querySelector('.lightbox__overlay');
const closeModalBtnRef = document.querySelector('button[data-action="close-lightbox"]');

/* adding markup */ 

const galleryString = imagesRef.reduce((acc, { preview, original, description }, index) => {
    acc += `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image"
    src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/></a></li>`;
    
    return acc; 
}, '')
galleryList.innerHTML += galleryString;

/* callbacks */

function openModal (event) {
    event.preventDefault();
    window.addEventListener('keydown', onESCPress);
    window.addEventListener('keydown', onArrowLeftPress);
    window.addEventListener('keydown', onArrowRightPress);
    const target = event.target;
    if (!target.classList.contains('gallery__image')) return;
    
    modalImageRef.src = target.dataset.source;
    modalImageRef.alt = target.alt;
    modalImageRef.setAttribute('data-index', target.dataset.index);

    modalRef.classList.add('is-open');
}

function closeModal () {
    window.removeEventListener('keydown', onESCPress);
    window.removeEventListener('keydown', onArrowLeftPress);
    window.removeEventListener('keydown', onArrowRightPress);
    modalImageRef.src = '';
    modalImageRef.alt = '';

    modalRef.classList.remove('is-open');
}

function closeModalViaOverlay (event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

function onESCPress (event) {
    if(event.code === 'Escape') {
        closeModal();
    }
}

function onArrowRightPress (event) {
    if (event.code === 'ArrowRight') {
        const activeIndex = Number(modalImageRef.dataset.index);

        if(activeIndex === imagesRef.length - 1) {
            modalImageRef.src = imagesRef[imagesRef.length - 1].original;
            modalImageRef.alt = imagesRef[imagesRef.length - 1].description;
            modalImageRef.dataset.index = imagesRef.length - 1;
        } else {
            modalImageRef.src = imagesRef[activeIndex + 1].original;
            modalImageRef.alt = imagesRef[activeIndex + 1].description;
            modalImageRef.dataset.index = activeIndex + 1;
        }
    }
}

function onArrowLeftPress (event) {
    if (event.code === 'ArrowLeft') {
        const activeIndex = Number(modalImageRef.dataset.index);

        if(activeIndex === 0) {
            modalImageRef.src = imagesRef[0].original;
            modalImageRef.alt = imagesRef[0].description;
            modalImageRef.dataset.index = 0;
        } else {
            modalImageRef.src = imagesRef[activeIndex - 1].original;
            modalImageRef.alt = imagesRef[activeIndex - 1].description;
            modalImageRef.dataset.index = activeIndex - 1;
        }
    }
}

/* eventListeners */ 

galleryList.addEventListener('click', openModal);

closeModalBtnRef.addEventListener('click', closeModal);

backdropRef.addEventListener('click', closeModalViaOverlay);