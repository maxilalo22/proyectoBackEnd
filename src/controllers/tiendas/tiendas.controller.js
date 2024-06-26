import { tiendasService } from "../../services/index.js"

// registrar
export async function postController(req, res, next) {
    try {
        const tienda = await tiendasService.registrar(req.body)
        res.created(tienda)
    } catch (error) {
        next(error)
    }
}

// agregar producto
export async function postProductosController(req, res, next) {
    try {
        await tiendasService.agregarProducto(req.params.id, req.body.idProducto)
        res.updated()
    } catch (error) {
        next(error)
    }
}