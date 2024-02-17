import { OrdersDaoMongoose } from "../daos/orders/mongoose/orders.dao.mongoose.js";
import { errorCheck } from "../DAOS/utils/manejoDeErrores.js";

export class OrdersService {
    async createOne(orderData) {
        try {
            const newOrder = await OrdersDaoMongoose.createOne(orderData);
            if (!newOrder) {
                const error = new Error("No se pudo crear la orden");
                error.code = errorCheck.UNEXPECTED_ERROR;
                throw error;
            }

            return newOrder;
        } catch (error) {
            throw error;
        }
    }
}

export const ordersService = new OrdersService();
