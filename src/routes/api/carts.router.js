import { Router } from "express";
//import { validateId } from "../middlewares/validation.js";
//import passport from "passport";
//import { tieneRol } from "../middlewares/authorization.js";
import { addProductToCartController, deleteCartController, deleteProductFromCartController, getCartController, getCartsController, postCartController, updateProductCartController } from "../../controllers/carts/cart.controller.js";

export const cartsRouter = Router();

cartsRouter.get("/", getCartsController);

// cart por id
//cartsRouter.get("/:id", validateId, getCartController);
cartsRouter.get("/:id", getCartController);
// nuevo cart
cartsRouter.post("/", postCartController);

// add product por id
cartsRouter.post(
    "/:id/product/:pid",
    /* passport.authenticate("jwt", { failWithError: true, session: false }),
    tieneRol(["user", "admin"]),
    validateId, */
    addProductToCartController
);

// dele por id
cartsRouter.delete(
    "/:id/product/:pid",
    //validateId,
    deleteProductFromCartController
);

//put & delete al carrido cantidades
/* cartsRouter.put("/:id/product/:pid", validateId, updateProductCartController);
cartsRouter.delete("/:id", validateId, deleteProductsFromCartController); */

cartsRouter.put("/:id/product/:pid",updateProductCartController);
cartsRouter.delete("/:id", deleteCartController);