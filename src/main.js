import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showToast } from './js/render-functions.js';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a');
let query = '';
let page = 1;
let totalHits = 0;

loadMoreBtn.style.display = 'none';
loader.style.display = 'none';

form.addEventListener('submit', async event => {
    event.preventDefault();
    query = input.value.trim().toLowerCase();
    if (!query) return showToast('warning', 'Please enter a search query!');
    
    gallery.innerHTML = '';
    page = 1;
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'block';
    
    try {
        const { hits, totalHits: total } = await fetchImages(query, page);
        totalHits = total;
        if (hits.length === 0) {
        throw new Error('Sorry, there are no images matching your search query. Please try again!');
        }
        renderGallery(hits);
        lightbox.refresh();
        loadMoreBtn.style.display = hits.length < 40 ? 'none' : 'block';
    } catch (error) {
        showToast('error', error.message);
    } finally {
        loader.style.display = 'none';
        input.value = '';
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page++;
    loader.style.display = 'block';
    try {
        const { hits } = await fetchImages(query, page);
        renderGallery(hits);
        lightbox.refresh();

        if (hits.length < 40 || page * 40 >= totalHits) {
            loadMoreBtn.style.display = 'none';
            showToast('info', "We're sorry, but you've reached the end of search results.");
        } else {
            loadMoreBtn.style.display = 'block';
        }

        const card = document.querySelector('.gallery .card');
        if (card) {
            const { height } = card.getBoundingClientRect();
            window.scrollBy({ top: height * 2, behavior: 'smooth' });
        }
    } catch (error) {
        showToast('error', 'Failed to load more images.');
    } finally {
        loader.style.display = 'none';
    }
});




