import { cartsService } from "../services/cart.services.js";
import { errorCheck } from "../DAOS/utils/manejoDeErrores.js";

export async function getCartsController(req, res, next) {
    try {
        const carts = await cartsService.readMany();
        if (!carts.length) {
            const error = new Error("No se encontraron carritos.");
            error.code = errorCheck.NOT_FOUND;
            throw error;
        }

        res.json(carts);
    } catch (error) {
        next(error);
    }
}

export async function getCartController(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            const error = new Error("El ID es requerido");
            error.code = errorCheck.INCORRECT_DATA;
            throw error;
        }

        const cart = await cartsService.readOne(id);
        if (!cart) {
            const error = new Error(`No se encontró ningún carrito con el ID ${id}`);
            error.code = errorCheck.NOT_FOUND;
            throw error;
        }

        res.json(cart);
    } catch (error) {
        next(error);
    }
}

export async function postCartController(req, res, next) {
    try {
        const newCart = await cartsService.createOne();
        if (!newCart) {
            const error = new Error("No se pudo crear el carrito");
            error.code = errorCheck.UNEXPECTED_ERROR;
            throw error;
        }

        res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
}

export async function addBebidaToCartController(req, res, next) {
    try {
        const { id, pid } = req.params;
        const { quantity = 1 } = req.body;

        const updatedCart = await cartsService.addBebidaToCart(id, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function updateBebidaCartController(req, res, next) {
    try {
        const { id, pid } = req.params;
        const { quantity } = req.body;

        const updatedCart = await cartsService.addBebidaToCart(id, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function deleteBebidaFromCartController(req, res, next) {
    try {
        const { id, pid } = req.params;

        const updatedCart = await cartsService.deleteBebidaFromCart(id, pid);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function deleteBebidasFromCartController(req, res, next) {
    try {
        const { id } = req.params;

        const updatedCart = await cartsService.deleteBebidasFromCart(id);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

