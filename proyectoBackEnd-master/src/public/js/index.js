
const socket = io();

let user;

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

Swal.fire({
    icon: 'success',
    title: 'Identifícate',
    input: 'text',
    text: 'Por favor, ingresa tu nombre de usuario para identificarte en el chat!',
    inputValidator: (value) => {
        return !value && 'Necesitas registrarte con un nombre de usuario para continuar';
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('setUsername', user);
});

socket.on('userConnected', (message) => {
    Swal.fire({
        icon: 'info',
        title: 'Nuevo usuario conectado',
        text: message,
    });
});

socket.on('userDisconnected', (message) => {
    Swal.fire({
        icon: 'warning',
        title: 'Usuario desconectado',
        text: message,
    });
});
const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');

chatForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { user: user, message: chatBox.value });
        chatBox.value = '';
    }
});

socket.on('messageLogs', data =>{
    let log = document.getElementById('messageLogs')
    let messages = ''
    data.forEach(message =>{
        messages = messages + `${message.user} : ${message.message} </br>`
    })
    log.innerHTML = messages;
})


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

