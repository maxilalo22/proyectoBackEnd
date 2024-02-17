import { getDaobebidas } from "../DAOS/bebidas/bebidas.dao.js";
import { errorCheck } from "../DAOS/utils/manejoDeErrores.js";

const bebidasDao = await getDaobebidas()

class BebidasService {
    async readMany({ limit = 10, page = 1, sort, query }) {
      try {
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
  
        if (
          isNaN(parsedLimit) ||
          isNaN(parsedPage) ||
          parsedLimit <= 0 ||
          parsedPage <= 0
        ) {
          const error = new Error(
            "Los parámetros 'limit' y 'page' deben ser números mayores a 0"
          );
          error.code = errorCheck.INCORRECT_DATA;
          throw error;
        }
  
        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
          lean: true,
          sort:
            sort === "desc"
              ? { price: -1 }
              : sort === "asc"
              ? { price: 1 }
              : null,
        };
  
        const filter = query ? { category: query } : {};
  
        return await getDaobebidas.readMany(filter, options);
      } catch (error) {
        throw new Error(`Error en bebidasService.readMany: ${error}`);
      }
    }
  
    async readOne(id) {
      try {
        if (!id) {
          const error = new Error("El ID es requerido");
          error.code = errorCheck.INCORRECT_DATA;
          throw error;
        }
  
        console.log("BEFORE DAO READONE");
        const bebida = await getDaobebidas.readOne(id);
        if (!bebida) {
          const error = new Error(
            `No se encontró una bebida con el ID: ${id}`
          );
          error.code = errorCheck.NOT_FOUND;
          throw error;
        }
        return bebida;
      } catch (error) {
        throw error;
      }
    }
  
    async createOne(bebida) {
      try {
        if (!bebida) {
          const error = new Error(
            "No se recibieron datos para crear la bebida"
          );
          error.code = errorCheck.INCORRECT_DATA;
          throw error;
        }
  
        const createdBebida = await getDaobebidas.createOne(bebida);
        if (!createdBebida) {
          const error = new Error("No se pudo crear la bebida");
          error.code = errorCheck.UNEXPECTED_ERROR;
          throw error;
        }
        return createdBebida;
      } catch (error) {
        throw error;
      }
    }
  
    async updateOne(id, updates) {
      try {
        if (!id) {
          const error = new Error("El ID es requerido");
          error.code = errorCheck.INCORRECT_DATA;
          throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
          const error = new Error("No se recibieron datos para actualizar");
          error.code = errorCheck.INCORRECT_DATA;
          throw error;
        }
        const updatedBebida = await getDaobebidas.updateOne(id, updates);
        return updatedBebida;
      } catch (error) {
        throw new Error(`Error en bebidasService.updateOne: ${error}`);
      }
    }
  
    async deleteOne(id) {
      try {
        if (!id) {
          const error = new Error("El ID es requerido");
          error.code = errorCheck.INCORRECT_DATA;
          throw error;
        }
        const deletedBebida = await getDaobebidas.deleteOne(id);
        return deletedBebida;
      } catch (error) {
        throw error;
      }
    }
  }
  
export const bebidasService = new BebidasService()