import { errorMan } from "../../../daos/utils/errorMan.js";
import { toPOJO } from "../../utils/utils.js";

export class CartsDaoMongoose {
    constructor(cartsModel) {
        this.cartModel = cartsModel;
    }

    async readMany() {
        try {
            const carts = await this.cartModel.find().lean();
            return toPOJO(carts);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.readMany: ${error.message}`);
        }
    }

    async readOne(id) {
        try {
            const cart = await this.cartModel.findById(id).lean();
            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.readOne: ${error.message}`);
        }
    }

    async createOne(newCartData) {
        try {
            const cart = await this.cartModel.create(newCartData);
            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.createOne: ${error.message}`);
        }
    }

    async updateOne(cartId, productId, quantity) {
        try {
            if (!cartId || !productId || !quantity || isNaN(quantity)) {
                const error = new Error("Se requieren cartId, productId y quantity.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
    
            const cart = await this.cartModel.findById(cartId);
    
            if (!cart) {
                const error = new Error("Carrito no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }
    
            const existingProduct = cart._productos.find(
                (product) => product._id === productId
            );
    
            if (existingProduct) {
                existingProduct.quantity += parseInt(quantity);
    
                if (existingProduct.quantity <= 0) {
                    cart._productos = cart._productos.filter(
                        (product) => product._id !== productId
                    );
                }
            } else {
                if (parseInt(quantity) > 0) {
                    cart._productos.push({ _id: productId, quantity: parseInt(quantity) });
                }
            }
    
            await cart.save();
    
            if (cart._productos.length === 0) {
                return { _id: cart._id, productos: [] };
            }
    
            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.updateOne: ${error.message}`);
        }
    }
    

    async deleteProductFromCart(cartId, productId) {
        try {
            if (!cartId || !productId) {
                const error = new Error("Se requieren cartId y productId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }

            const cart = await this.cartModel.findById(cartId);

            if (!cart) {
                const error = new Error("Carrito no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }

            cart._productos = cart._productos.filter(
                (product) => product._id !== productId
            );

            await cart.save();

            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.deleteProductFromCart: ${error.message}`);
        }
    }

    async deleteProductsFromCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }

            const cart = await this.cartModel.findById(cartId);

            if (!cart) {
                const error = new Error("Carrito no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }

            cart.productos = [];

            await cart.save();

            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.deleteProductsFromCart: ${error.message}`);
        }
    }
    async deleteCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
    
            const result = await this.cartModel.findByIdAndDelete(cartId);
    
            if (!result) {
                const error = new Error("No se encontró el carrito a eliminar.");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }
            return { message: "Carrito eliminado correctamente." };
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.deleteCart: ${error.message}`);
        }
    }
    
}
