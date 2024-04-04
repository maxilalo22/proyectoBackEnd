import { Router } from 'express'
import { getController, postController } from '../../controllers/productos/product.controller.js'
import { currentAdminMiddleware, currentMiddleware } from '../../middlewares/authorization.js'

export const productsRouter = Router()

productsRouter.get('/', currentMiddleware, getController)
productsRouter.post('/', currentAdminMiddleware, postController)