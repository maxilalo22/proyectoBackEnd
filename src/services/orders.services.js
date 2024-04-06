import { getDaoOrders } from "../daos/orders/order.dao.js"
import { errorMan } from "../daos/utils/errorMan.js";

const ordersDao =  await getDaoOrders();

export class OrdersService {
    async createOne(orderData) {
        try {
            const newOrder = await ordersDao.createOne(orderData);
            if (!newOrder) {
                const error = new Error("No se pudo crear la orden");
                error.code = errorMan.UNEXPECTED_ERROR;
                throw error;
            }

            return newOrder;
        } catch (error) {
            throw error;
        }
    }
}

export const ordersService = new OrdersService();