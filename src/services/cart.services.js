import { BebidasDaoMongoose } from "../DAOS/bebidas/mongoDB/bebidas.dao.mongoose.js";
import { CartsDaoMongoose } from "../DAOS/carts/mongoDB/carts.dao.mongoose.js";
import { errorCheck } from "../DAOS/utils/manejoDeErrores.js";

class CartsService {
    async readMany() {
        try {
            return CartsDaoMongoose.readMany();
        } catch (error) {
            throw new Error(`Error en CartsService.readMany: ${error}`);
        }
    }

    async readOne(id) {
        try {
            if (!id) {
                const error = new Error("El ID es requerido");
                error.code = errorCheck.INCORRECT_DATA;
                throw error;
            }

            const cart = await CartsDaoMongoose.readOne(id);
            if (!cart) {
                const error = new Error(
                    `No se encontró ningún carrito con el ID ${id}`
                );
                error.code = errorCheck.NOT_FOUND;
                throw error;
            }
            return cart;
        } catch (error) {
            throw new Error(`Error en CartsService.readOne: ${error}`);
        }
    }

    async createOne() {
        try {
            const createdCart = await CartsDaoMongoose.createOne({});
            if (!createdCart) {
                const error = new Error("No se pudo crear el carrito");
                error.code = errorCheck.UNEXPECTED_ERROR;
                throw error;
            }
            return createdCart;
        } catch (error) {
            throw new Error(`Error en CartsService.createOne: ${error}`);
        }
    }

    async addBebidaToCart(cartId, bebidaId, quantity) {
        try {
            if (!cartId || !bebidaId || !quantity) {
                const error = new Error("Se requieren cartId, bebidaId y quantity.");
                error.code = errorCheck.INCORRECT_DATA;
                throw error;
            }

            const cart = await CartsDaoMongoose.readOne(cartId);
            if (!cart) {
                const error = new Error("Carrito no encontrado");
                error.code = errorCheck.NOT_FOUND;
                throw error;
            }

            const bebida = await BebidasDaoMongoose.readOne(bebidaId);
            if (!bebida) {
                const error = new Error("Bebida no encontrada.");
                error.code = errorCheck.NOT_FOUND;
                throw error;
            }

            if (isNaN(quantity)) {
                const error = new Error("quantity debe ser un número.");
                error.code = errorCheck.INCORRECT_DATA;
                throw error;
            }

            const updatedCart = await CartsDaoMongoose.updateOne(cartId, bebidaId, quantity);
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteBebidaFromCart(cartId, bebidaId) {
        try {
            if (!cartId || !bebidaId) {
                const error = new Error("Se requieren ids de cart y bebida.");
                error.code = errorCheck.INCORRECT_DATA;
                throw error;
            }

            const updatedCart = await CartsDaoMongoose.deleteBebidaFromCart(
                cartId,
                bebidaId
            );
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteBebidasFromCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorCheck.INCORRECT_DATA;
                throw error;
            }

            const updatedCart = await CartsDaoMongoose.deleteBebidasFromCart(cartId);
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(cartId) {
        return CartsDaoMongoose.deleteCart(cartId);
    }
}

export const cartsService = new CartsService();
