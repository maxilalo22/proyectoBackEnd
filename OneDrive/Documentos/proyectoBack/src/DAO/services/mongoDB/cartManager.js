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
            const cart = await cartModel.findById(id).populate('products.productId').lean();
            return cart;
        } catch (error) {
            console.error('Error al obtener carrito por ID:', error.message);
            throw new Error('Error al obtener carrito por ID');
        }
    }

    async removeAllProductsFromCart(cartId) {
        try {
            const cart = await cartModel.findById(cartId);

            if (!cart) {
                console.log('No se ha encontrado un carrito con el ID proporcionado');
                return;
            }

            cart.products = [];
            await cart.save();
            console.log('Todos los productos eliminados del carrito correctamente.');
        } catch (error) {
            console.error('Error al eliminar todos los productos del carrito:', error.message);
            throw new Error('Error al eliminar todos los productos del carrito');
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            const cart = await cartModel.findById(cartId);

            if (!cart) {
                console.log('No se ha encontrado un carrito con el ID proporcionado');
                return;
            }

            cart.products = updatedProducts;
            await cart.save();
            console.log('Carrito actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar el carrito:', error.message);
            throw new Error('Error al actualizar el carrito');
        }
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        try {
            const cart = await cartModel.findById(cartId);

            if (!cart) {
                console.log('No se ha encontrado un carrito con el ID proporcionado');
                return;
            }

            // Encuentra el índice del producto en el array products
            const productIndex = cart.products.findIndex(product => product.productId.equals(productId));

            if (productIndex !== -1) {
                // Actualiza la cantidad del producto específico
                cart.products[productIndex].quantity = newQuantity;
                await cart.save();
                await cartModel.findById(cartId); // Esto asegura que la operación se haya completado
                console.log(`Cantidad de producto ${productId} actualizada a: ${newQuantity}`);
                console.log(cart.products[productIndex].quantity);
            } else {
                console.log('No se ha encontrado el producto en el carrito');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad de producto en el carrito:', error.message);
            throw new Error('Error al actualizar la cantidad de producto en el carrito');
        }
    }
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);

            if (!cart) {
                console.log('No se ha encontrado un carrito con el ID proporcionado');
                return;
            }

            cart.products = cart.products.filter(product => product.productId != productId);
            await cart.save();
            console.log('Producto eliminado del carrito correctamente.');
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error.message);
            throw new Error('Error al eliminar el producto del carrito');
        }
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await cartModel.findByIdAndDelete(cartId).lean();

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
