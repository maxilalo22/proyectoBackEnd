import { Tienda } from "../models/tiendas.model.js"


export class TiendasService {
    constructor(tiendasDao, productService) {
        this.tiendasDao = tiendasDao
        this.productService = productService
    }

    async registrar(datosTienda) {
        const tienda = new Tienda(datosTienda)
        const tiendaPojo = await this.tiendasDao.create(tienda.toPOJO())
        return tiendaPojo
    }

    async agregarProducto(idTienda, idProducto) {

        const tienda = await this.tiendasDao.readOne({ _id: idTienda })
        if (!tienda) {
            throw new Error('la tienda no existe')
        }

        const producto = await this.productService.obtenerProductos({ _id: idProducto })
        if (!producto) {
            throw new Error('el producto no existe')
        }

        tienda.productos.push(idProducto)

        await this.tiendasDao.updateOne({ _id: idTienda }, tienda)
    }
}