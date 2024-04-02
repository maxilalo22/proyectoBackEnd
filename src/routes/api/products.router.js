import { Router } from 'express'
import { getController, postController } from '../../controllers/productos/product.controller.js'

export const productsRouter = Router()

productsRouter.get('/', getController)
productsRouter.post('/', postController)