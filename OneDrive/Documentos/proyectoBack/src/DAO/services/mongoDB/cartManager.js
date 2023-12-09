import { cartModel } from "../../models/cart.model.js";
import { productModel } from "../../models/products.model.js";

export default class CartManager {
    async addCart() {
        try {
            const newCart = new cartModel();
            await newCart.save();
            console.log('Carrito creado correctamente.');
            return newCart._id;
        } catch (error) {
            console.error('No se puede crear carrito', error);
            throw new Error('No se puede crear carrito');
        }
    }

    async addProductToCart(req) {
        try {
            const cartId = req.params.Id;
            const productId = req.params.id; 
            const quantity = req.body.quantity || 1;

            const cart = await cartModel.findById(cartId);
            const product = await productModel.findById(productId);

            if (!cart) {
                console.log('No se ha encontrado un carrito con el ID proporcionado');
                return;
            }

            if (!product) {
                console.log('No se ha encontrado un producto con el ID proporcionado');
                return;
            }

            cart.products.push({
                productId: product._id,
                quantity: quantity,
            });

            await cart.save();
            console.log('Producto agregado al carrito correctamente.');
        } catch (error) {
            console.error('No se puede agregar producto al carrito', error);
            throw new Error('No se puede agregar producto al carrito');
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartModel.findById(id).lean();
            return cart;
        } catch (error) {
            console.error('Error al obtener carrito por ID:', error.message);
            throw new Error('Error al obtener carrito por ID');
        }
    }

    async deleteCart(Id) {
        try {
            const deletedCart = await cartModel.findByIdAndDelete(Id).lean();

            if (deletedCart) {
                console.log('Carrito eliminado correctamente.');
            } else {
                console.log('Carrito no encontrado.');
            }
        } catch (error) {
            console.error('Error al eliminar carrito:', error.message);
            throw new Error('Error al eliminar carrito');
        }
    }
}
