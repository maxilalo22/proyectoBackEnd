// registrar usuario                OK
// registrar tienda                 OK
// agregar juguete a una tienda     OK
// crear ordenes de compra          -


// daos
class UsuariosDao { }
class TiendasDao { }
class ProductosDao { }


// modelos
class Usuario {
    constructor(datos) { }
    toPOJO() { }
}

class Tienda {
    constructor(datos) { }
    toPOJO() { }
}

class Producto {
    constructor(datos) { }
    toPOJO() { }
}

// servicios
class UsuariosService {
    constructor(usuariosDao) {
        this.usuariosDao = usuariosDao
    }

    async registrar(datosUsuario) {
        const usuario = new Usuario(datosUsuario)
        const userPojo = usuario.toPOJO()
        await this.usuariosDao.create(userPojo)
        return userPojo
    }
}

class TiendasService {
    constructor(tiendasDao, productosService) {
        this.tiendasDao = tiendasDao
        this.productosService = productosService
    }

    async registrar(datosTienda) {
        const tienda = new Tienda(datosTienda)
        const tiendaPojo = tienda.toPOJO()
        await this.tiendasDao.create(tiendaPojo)
        return tiendaPojo
    }

    async agregarProducto(idTienda, idProducto) {

        const tienda = await this.tiendasDao.readOne({ _id: idTienda })
        if (!tienda) {
            throw new Error('la tienda no existe')
        }

        const producto = await this.productosService.readOne({ _id: idProducto })
        if (!producto) {
            throw new Error('el producto no existe')
        }

        tienda.productos.push(idProducto)

        await this.tiendasDao.updateOne({ _id: idTienda }, tienda)
    }
}

class ProductosService {
    constructor(productosDao) {
        this.productosDao = productosDao
    }

    async agregar(datosProducto) {
        const producto = new Producto(datosProducto)
        const productoPojo = producto.toPOJO()
        await this.productosDao.create(productoPojo)
        return productoPojo
    }
}

// logica del negocio

// const tienda = new Tienda()
// const orden = new Orden()

const usuariosDao = new UsuariosDao()
const usuariosService = new UsuariosService(usuariosDao)
const usuario = usuariosService.registrar({ /* datos del usuario */ })

const productosDao = new ProductosDao()
const productosService = new ProductosService()
const producto = productosService.agregar({ /* datos de un producto */ })

const tiendasDao = new TiendasDao()
const tiendasService = new TiendasService(tiendasDao, productosService)
const tienda = tiendasService.registrar({ /* datos de una tienda */ })
tiendasService.agregarProducto(tienda._id, producto._id)