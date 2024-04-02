import { getDaoProductos } from '../daos/productos/products.dao.js'
import { Producto } from '../models/products.model.js'

const productsDao = await getDaoProductos()

class ProductService {
    async obtenerProductos() {
        return await productsDao.readMany({})
    }
    async obtenerProductoPorId(id) {
        return await productsDao.readOne({ _id: id })
    }

    async agregarProducto(datosProducto) {
        const producto = new Producto(datosProducto)
        const productoGuardado = await productsDao.create(producto.toPOJO())
        return productoGuardado
    }
}

export const productService = new ProductService()