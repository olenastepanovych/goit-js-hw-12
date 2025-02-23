import iziToast from 'izitoast';

export function renderGallery(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(image => `
        <li class="card">
            <a href="${image.largeImageURL}" class="gallery-link">
                <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image"/>
            </a>
            <div class="describtion-cont">
                <div class="block"><h4>Likes</h4><p>${image.likes}</p></div>
                <div class="block"><h4>Views</h4><p>${image.views}</p></div>
                <div class="block"><h4>Comments</h4><p>${image.comments}</p></div>
                <div class="block"><h4>Downloads</h4><p>${image.downloads}</p></div>
            </div>
        </li>`
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}

export function showToast(type, message) {
    iziToast[type]({ title: type.charAt(0).toUpperCase() + type.slice(1), message, position: 'topRight'});
    
}