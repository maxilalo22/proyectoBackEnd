import { productService } from '../../services/product.services.js'

export async function getController(req, res, next) {
    try {
        const productos = await productService.obtenerProductos()
        res.result(productos)
    } catch (error) {
        next(error)
    }
}

export async function postController(req, res, next) {
    try {
        const producto = await productService.agregarProducto(req.body)
        res.created(producto)
    } catch (error) {
        next(error)
    }
}