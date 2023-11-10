let imageArray = [];
let idCounter = 1;

function subirImagen() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('imageUrl').value;

    if (!title.trim() || !validarURL(imageUrl)) {
        alert('Por favor, para subir la imagen complete el título y una URL válida.');
        return;
    }

    const imageObject = {
        id: idCounter++,
        title: title,
        description: description,
        imageUrl: imageUrl
    };

    imageArray.push(imageObject);
    mostrarImagen(imageObject);
    document.getElementById('imageForm').reset();
}

function validarURL(url) {
    return url.startsWith('http') || url.startsWith('https');
}

function mostrarImagen(imageObject) {
    const galleryElement = document.getElementById('gallery');

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add('white-background');

    const imageElement = document.createElement('img');
    imageElement.src = imageObject.imageUrl;
    imageElement.alt = imageObject.title;

    const idElement = document.createElement('h2');
    idElement.textContent = 'ImagenID: ' + imageObject.id;
    idElement.classList.add('image-id');

    const titleElement = document.createElement('h2');
    titleElement.textContent = imageObject.title;

    const descriptionElement = document.createElement('h3');
    descriptionElement.textContent = imageObject.description;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        borrarImagen(imageObject.id);
    });

    cardElement.appendChild(imageElement);
    cardElement.appendChild(idElement);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);
    cardElement.appendChild(deleteButton);
    galleryElement.appendChild(cardElement);
}


function borrarImagen(imageId) {
    const index = imageArray.findIndex(function(image) {
        return image.id === imageId;
    });

    if (index !== -1) {
        imageArray.splice(index, 1);
        actualizarGaleria();
    }
}

function actualizarGaleria() {
    const galleryElement = document.getElementById('gallery');
    galleryElement.innerHTML = ''; 

    imageArray.forEach(function(image) {
        mostrarImagen(image);
    });
}

window.onload = function() {
    actualizarGaleria();
};