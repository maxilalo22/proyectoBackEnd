import { Router } from "express";
import { validateId } from "../../middlewares/validacion.js";
import {
  addBebidaToCartController,
  deleteBebidaFromCartController,
  deleteBebidasFromCartController,
  getCartController,
  getCartsController,
  postCartController,
  updateBebidaCartController,
} from "../../controllers/cart.controller.js";
import passport from "passport";
import { solo } from "../../middlewares/autorizacion.js";

export const cartsRouter = Router();

cartsRouter.get("/", getCartsController);
cartsRouter.get("/:id", validateId, getCartController);

cartsRouter.post("/", postCartController);
cartsRouter.post(
  "/:id/bebida/:pid",
  passport.authenticate("jwt", { failWithError: true, session: false }),
  solo(["user", "admin"]),
  validateId,
  addBebidaToCartController
);

cartsRouter.delete(
  "/:id/bebida/:pid",
  validateId,
  deleteBebidaFromCartController
);

cartsRouter.put("/:id/bebida/:pid", validateId, updateBebidaCartController);
cartsRouter.delete("/:id", validateId, deleteBebidasFromCartController);
