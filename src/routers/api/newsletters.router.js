import { Router } from "express";
import { postController, deleteController, postEnviarController } from "../../controllers/newsletters.controller.js";

export const newsletterRouter = Router()

newsletterRouter.post('/', postController)
newsletterRouter.delete('/:id', deleteController)
newsletterRouter.post('/enviar', postEnviarController)