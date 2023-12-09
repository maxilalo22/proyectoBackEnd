
const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

socket.on('updateProducts', function (products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(function (product) {
        const newProductItem = document.createElement('li');
        newProductItem.textContent = `${product.title} - ${product.price}`;
        productList.appendChild(newProductItem);
    });
});
