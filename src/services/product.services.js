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

    async eliminarProducto(id) {
        const productoEliminado = await productsDao.deleteOne({ _id: id })
        return productoEliminado
    }

    async actualizarProducto(id, datosActualizados) {
        const productoActualizado = await productsDao.updateOne({ _id: id }, datosActualizados)
        return productoActualizado
    }
}

export const productService = new ProductService()
