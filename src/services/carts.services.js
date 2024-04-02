import { getDaoCarts } from '../daos/carts/carts.dao.js';
import { CartModel } from "../models/cart.model.js";
import { errorMan } from "../daos/utils/errorMan.js";

class CartsService {
    constructor() {
        this.cartDao = getDaoCarts(); 
    }

    async readMany() {
        try {
            return await this.cartDao.readMany();
        } catch (error) {
            throw new Error(`Error en CartsService.readMany: ${error}`);
        }
    }

    async readOne(id) {
        try {
            if (!id) {
                const error = new Error("El ID es requerido");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }

            const cart = await this.cartDao.readOne(id);
            if (!cart) {
                const error = new Error(
                    `No se encontró ningún carrito con el ID ${id}`
                );
                error.code = errorMan.NOT_FOUND;
                throw error;
            }
            return cart;
        } catch (error) {
            throw new Error(`Error en CartsService.readOne: ${error}`);
        }
    }

    async createOne() {
        try {
            const newCart = new CartModel({});
            const createdCart = await this.cartDao.createOne(newCart);
            if (!createdCart) {
                const error = new Error("No se pudo crear el carrito");
                error.code = errorMan.UNEXPECTED_ERROR;
                throw error;
            }
            return createdCart;
        } catch (error) {
            throw new Error(`Error en CartsService.createOne: ${error}`);
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            if (!cartId || !productId || !quantity || isNaN(quantity)) {
                const error = new Error("Se requieren cartId, productId y quantity.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.updateOne(cartId, productId, quantity);
        } catch (error) {
            throw new Error(`Error en CartsService.addProductToCart: ${error}`);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            if (!cartId || !productId) {
                const error = new Error("Se requieren cartId y productId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.deleteProductFromCart(cartId, productId);
        } catch (error) {
            throw new Error(`Error en CartsService.deleteProductFromCart: ${error}`);
        }
    }

    async deleteProductsFromCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.deleteProductsFromCart(cartId);
        } catch (error) {
            throw new Error(`Error en CartsService.deleteProductsFromCart: ${error}`);
        }
    }

    async deleteCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.deleteCart(cartId);
        } catch (error) {
            throw new Error(`Error en CartsService.deleteCart: ${error}`);
        }
    }
}

export const cartsService = new CartsService();
