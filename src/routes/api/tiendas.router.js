import { Router } from 'express'
import { postController, postProductosController } from '../../controllers/tiendas/tiendas.controller.js'

export const tiendasRouter = Router()

tiendasRouter.post('/', postController)
tiendasRouter.post('/:id/products', postProductosController)

// tiendasRouter.delete('/:idTienda/products/:idProduct', deleteProductoController)

// carritosRouter.update('/:idCart/productos/:idProduct', updateProductoCantController)