import { Router } from "express";
import { deleteBebidasController, getBebidasController, postBebidasController, putBebidasController} from "../../controllers/bebidas.controllers.js";
import { validateProductData, validateId, validateUpdates } from "../../middlewares/validacion.js";
import { adminAuthorization } from "../../middlewares/autenticacion.js";
import passport from "passport";

export const bebidasRouter = Router();

const authenticateJWT = passport.authenticate("jwt", { failWithError: true, session: false });


bebidasRouter.get("/", getBebidasController);
bebidasRouter.get("/:id", validateId, getBebidasController);

bebidasRouter.post(
    "/",
    authenticateJWT,
    adminAuthorization,
    validateProductData,
    postBebidasController
);

bebidasRouter.put(
    "/:id",
    authenticateJWT,
    adminAuthorization,
    validateUpdates,
    putBebidasController
);

bebidasRouter.delete(
    "/:id",
    authenticateJWT,
    adminAuthorization,
    validateId,
    deleteBebidasController
);
