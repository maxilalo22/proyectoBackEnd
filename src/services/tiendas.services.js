import { Tienda } from '../models/tienda.model.js'

export class TiendasService {
    constructor({ tiendasDao, bebidasService }) {
        this.tiendasDao = tiendasDao
        this.bebidasService = bebidasService
    }

    async registrar(datosTienda) {
        const tienda = new Tienda(datosTienda)
        const tiendaPojo = await this.tiendasDao.create(tienda.toPOJO())

        return tiendaPojo
    }

    async agregarBebida(idTienda, idBebida) {

        const tienda = await this.tiendasDao.readOne({ _id: idTienda })
        if (!tienda) {
            throw new Error('La tienda no existe')
        }

        const bebida = await this.bebidasService.readOne({ _id: idBebida })
        if (!bebida) {
            throw new Error('La bebida no existe')
        }

        tienda.bebidas.push(idBebida)

        await this.tiendasDao.updateOne({ _id: idTienda }, tienda)
    }
}
