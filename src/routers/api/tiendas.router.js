import { Router } from 'express'
import { postController, postBebidasController } from '../../controllers/tiendas.controllers.js'

export const tiendasRouter = Router()

tiendasRouter.post('/', postController)
tiendasRouter.post('/:id/bebidas', postBebidasController)

