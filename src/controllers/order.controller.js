import { cartsService } from "../services/cart.services.js";
import { bebidasService } from "../services/bebidas.services.js";
import { ordersService } from "../services/order.services.js";
import { errorCheck } from "../DAOS/utils/manejoDeErrores.js";

export async function postOrderController(req, res, next) {
    try {
        const { email, cart: userCart } = req.body;

        const cart = await cartsService.readOne(userCart[0]._id);

        if (!cart) {
            throw new Error(errorCheck.NOT_FOUND.message);
        }

        const bebidasWithoutStock = [];
        let amount = 0;
        for (const bebida of cart.bebidas) {
            const { _id, quantity } = bebida;
            const bebidaInfo = await bebidasService.readOne(_id);

            if (!bebidaInfo || bebidaInfo.stock < quantity) {
                bebidasWithoutStock.push({
                    bebida: _id,
                    stock: bebidaInfo ? bebidaInfo.stock : 0,
                });
            } else {
                bebidaInfo.stock -= quantity;
                amount += bebidaInfo.price * quantity;
                await bebidasService.updateOne(_id, bebidaInfo);
            }
        }


        if (bebidasWithoutStock.length > 0) {
            const error = new Error(errorCheck.UNPROCESSABLE_ENTITY.message);
            error.bebidas = bebidasWithoutStock;
            throw error;
        }

        const newOrder = await ordersService.createOne({
            purchaser: email,
            amount: amount,
        });

        await cartsService.deleteBebidasFromCart(userCart[0]._id);

        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
}
