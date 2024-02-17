import { bebidasService } from "../services/bebidas.services.js"
import { errorCheck } from "../DAOS/utils/manejoDeErrores.js";

export async function getBebidasController(req, res, next) {
    try {
        const { limit, page, sort, query } = req.query;

        const bebidas = await bebidasService.readMany({
            limit,
            page,
            sort,
            query,
        });

        if (!bebidas.length) {
            const error = new Error("No se encontraron bebidas.");
            error.code = errorMan.NOT_FOUND;
            throw error;
        }

        res.json(bebidas);
    } catch (error) {
        next(error);
    }
}

export async function getBebidaController(req, res, next) {
    try {
        const { id } = req.params;
        const bebida = await bebidasService.readOne(id);
        if (!bebida) {
            const error = new Error(`No se encontró ninguna bebida con el ID ${id}`);
            error.code = errorCheck.NOT_FOUND;
            throw error;
        }
        res.json(bebida);
    } catch (error) {
        next(error);
    }
}

export async function postBebidasController(req, res, next) {
    try {
        const bebida = await bebidasService.createOne(req.body);

        if (!bebida) {
            const error = new Error("No se pudo crear la bebida");
            error.code = errorCheck.UNEXPECTED_ERROR;
            throw error;
        }

        res.status(201).json(bebida);
    } catch (error) {
        next(error);
    }
}

export async function putBebidasController(req, res, next) {
    try {
        const { id } = req.params;
        const bebida = await bebidasService.updateOne(id, req.body);

        if (!bebida) {
            const error = new Error(`No se encontró ninguna bebida con el ID ${id}`);
            error.code = errorCheck.NOT_FOUND;
            throw error;
        }
        res.json({
            status: 201,
            message: "Bebida actualizada correctamente.",
            data: bebida,
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteBebidasController(req, res, next) {
    try {
        const { id } = req.params;
        const bebidas = await bebidasService.deleteOne(id);

        if (!bebidas) {
            const error = new Error(`No se encontró ninguna bebida con el ID ${id}`);
            error.code = errorCheck.NOT_FOUND;
            throw error;
        }

        res.json({
            status: 201,
            message: "Bebida eliminada correctamente.",
            data: bebidas,
        });
    } catch (error) {
        next(error);
    }
}
