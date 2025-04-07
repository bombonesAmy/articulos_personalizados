document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productContainer');
    const searchInput = document.getElementById('searchInput');
    let products = [];

    // Cargar productos desde JSON
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            displayProducts(products);
        });

    // Función para mostrar productos
    function displayProducts(productsArray) {
        container.innerHTML = '';
        productsArray.forEach(product => {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p><strong>Precio: ${product.precio}</strong></p>
                ${product.talla ? `<p>Talla: ${product.talla}</p>` : ''}
                ${product.tamano ? `<p>Tamaño: ${product.tamano}</p>` : ''}
                <button class="contacto" onclick="sendWhatsApp('${product.nombre}')">Consultar por WhatsApp</button>
            `;
            container.appendChild(item);
        });
    }

    // Función de búsqueda
    searchInput.addEventListener('input', (e) => {
        const searchTerm = normalizeString(e.target.value.toLowerCase());
        const filtered = products.filter(product => 
            normalizeString(product.nombre.toLowerCase()).includes(searchTerm)
        );
        displayProducts(filtered);
    });

    // Normalizar texto (quitar tildes)
    function normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
});

// Función WhatsApp
function sendWhatsApp(productName) {
    const phoneNumber = '5352013170';
    const message = `Hola, me interesa el artículo: ${productName}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}