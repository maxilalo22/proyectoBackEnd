import fs from 'fs'
import ProductManager from './productManager.js'

export default class CartManager {
    constructor() {
        this.path = './cart.json'
        this.carts = []
        this.Id = 1
        this.productManager = new ProductManager()
        this.loadCarts()
    }

    addCart() {

        const cartNuevo = {
            id: this.Id,
            cartProducts: []
        };

        this.carts.push(cartNuevo);
        this.Id++;
        this.saveCarts();
        console.log('Carrito creado exitosamente.');
    }

    addProductToCart(req) {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1; 
    
        const existingCart = this.carts.find(cart => cart.id === cartId);
        const newProduct = this.productManager.products.find(product => product.id === productId);
    
        if (!existingCart) {
            console.log('No se ha encontrado un carrito con el ID proporcionado.');
            return;
        }
    
        if (!newProduct) {
            console.log('No se ha encontrado un producto con el ID proporcionado.');
            return;
        }
    
        const existingCartItem = existingCart.cartProducts.find(item => item.id === productId);
    
        if (existingCartItem) {
            
            existingCartItem.quantity += quantity;
        } else {
            
            existingCart.cartProducts.push({
                id: productId,
                quantity: quantity
            });
        }
    
        this.saveCarts();
        console.log('Producto agregado al carrito exitosamente.');
    }
    
    

    getCartById(id) {
        const carrito = this.carts.find(carritoExistente => carritoExistente.id === id);
        if (carrito) {
            return carrito;
        } else {
            console.log('carrito no encontrado.');
        }
    }

    async deleteCart(id) {
        const cartIndex = this.carts.findIndex(cartExistente => cartExistente.id === id);
        if (cartIndex !== -1) {
            const deletedCart = this.carts.splice(cartIndex, 1)[0];
            await this.saveCarts();
            console.log('Carrito eliminado correctamente.');
        } else {
            console.log('Carrito no encontrado.');
        }
    }

    async loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                const lastCartId = this.carts[this.carts.length - 1].id; // Corregir aquí
                this.Id = lastCartId + 1;
            }
        } catch (error) {
            console.error('Error al cargar carritos:', error.message);
        }
    }


    async saveCarts() {
        await fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }
}