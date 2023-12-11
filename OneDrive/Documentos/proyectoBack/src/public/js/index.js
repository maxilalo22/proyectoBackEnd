
const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

socket.on('updateProducts', function (products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (Array.isArray(products)) {
        products.forEach(function (product) {
            const newProductItem = document.createElement('li');
            newProductItem.textContent = `${product.title} - ${product.price}`;
            productList.appendChild(newProductItem);
        });
    } else {
        console.error('La variable "products" no es un array:', products);
    }
});

