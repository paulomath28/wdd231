const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const galleryImages = document.querySelectorAll('.gallery-grid img');

const modal = document.createElement('div');
modal.classList.add('modal');
modal.style.display = 'none';
document.body.appendChild(modal);

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        modal.innerHTML = `<img src="${image.src}" alt="${image.alt}" class="modal-image">`;
        modal.style.display = 'flex';
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');

    async function fetchImages() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            data.forEach(photo => {
                const imgElement = document.createElement('img');
                imgElement.src = photo.thumbnailUrl;
                imgElement.alt = photo.title;
                gallery.appendChild(imgElement);
            });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    fetchImages();
});
