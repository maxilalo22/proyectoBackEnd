let products = []

window.onload = actualizarProductos

async function actualizarProductos() {
    try {
        const products = await obtenerProductos()
        mostrarProductos(products)
    } catch (error) {
        alert(error.message)
    }
}

async function obtenerProductos() {
    const res = await fetch('/api/products')
    const obj = await res.json()
    products = obj.payload
    return products
}

function mostrarProductos(products) {
    // @ts-ignore
    document.querySelector('#listaProductos').innerHTML =
        products.map(j => `- ${j.nombre} $${j.precio}`).join('<br>')
}

const formAgregarProducto = document.querySelector('form')
formAgregarProducto?.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // @ts-ignore
        body: new URLSearchParams(new FormData(formAgregarProducto))
    })

    if (response.status === 201) {
        actualizarProductos()
    } else {
        const error = await response.json()
        alert(error.message)
    }

})