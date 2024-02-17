import fs from "fs/promises";
import { randomUUID } from "node:crypto";
import { errorCheck } from "../DAOS/utils/manejoDeErrores.js";
import { toPOJO, matches } from "../../utils/utils.js";

export class CartsDaoFiles {
    constructor(path) {
        this.path = path;
    }

    async #readCarts() {
        try {
            const { path } = this;
            const carts = JSON.parse(await fs.readFile(path, "utf-8"));
            return carts;
        } catch (error) {
            const typedError = new Error(
                "#readCarts DAO.FILE Error: ",
                error.code || error
            );
            typedError.code = errorCheck.UNEXPECTED_ERROR;
            throw typedError;
        }
    }

    async #writeCarts(carts) {
        try {
            const { path } = this;
            await fs.writeFile(path, JSON.stringify(carts, null, 2));
        } catch (error) {
            const typedError = new Error(
                "#writeCarts DAO.FILE Error: ",
                error.code || error
            );
            typedError.code = errorCheck.UNEXPECTED_ERROR;
            throw typedError;
        }
    }

    async createOne() {
        try {
            const newCart = {
                id: randomUUID(),
                bebidas: [],
            };

            const carts = await this.#readCarts();
            carts.push(newCart);

            await this.#writeCarts(carts);

            return newCart;
        } catch (error) {
            console.log("Create cart Error: ", error);
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async readOne(id) {
        try {
            const carts = await this.#readCarts();
            const cartFound = carts.find((cart) => matches(cart.id, id));
            return cartFound ? toPOJO(cartFound) : null;
        } catch (error) {
            const typedError = new Error(
                `Error al obtener el carrito: ${error.message}`
            );
            typedError.code = errorCheck.UNEXPECTED_ERROR;
            throw typedError;
        }
    }

    async readMany() {
        try {
            const carts = await this.#readCarts();
            return carts.map(toPOJO);
        } catch (error) {
            const typedError = new Error(
                `Error al obtener los carritos: ${error.message}`
            );
            typedError.code = errorCheck.UNEXPECTED_ERROR;
            throw typedError;
        }
    }


    async updateOne(cartId, bebidaId, quantity) {
        try {
            const carts = await this.#readCarts();
            const cartIndex = carts.findIndex((cart) => cart.id === cartId);

            if (cartIndex === -1) {
                const error = new Error("Carrito no encontrado");
                error.code = errorCheck.NOT_FOUND;
                throw error;
            }

            const updatedCart = { ...carts[cartIndex] };
            let existingBebidaIndex = updatedCart.bebidas.findIndex(
                (bebida) => bebida._id === bebidaId
            );

            if (existingBebidaIndex !== -1) {
                updatedCart.bebidas[existingBebidaIndex].quantity +=
                    parseInt(quantity);

                if (updatedCart.bebidas[existingBebidaIndex].quantity <= 0) {
                    updatedCart.bebidas.splice(existingBebidaIndex, 1);
                }
            } else {
                if (parseInt(quantity) <= 0) {
                    const error = new Error(
                        "No se puede agregar una bebida con cantidad menor a 0"
                    );
                    error.code = errorCheck.INCORRECT_DATA;
                    throw error;
                }

                updatedCart.bebidas.push({ _id: bebidaId, quantity });
            }

            carts[cartIndex] = updatedCart;
            await this.#writeCarts(carts);

            return updatedCart;
        } catch (error) {
            console.log("Error al agregar bebida al cart: ", error);
            throw new Error(
                `Error al agregar la bebida al carrito: ${error.message}`
            );
        }
    }
}

const cartManager = new CartsDaoFiles();

export default cartManager;
