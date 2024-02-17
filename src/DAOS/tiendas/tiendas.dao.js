import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'
import { TiendasDaoMongoose } from './mongoDB/tiendas.dao.mongoose.js'
import { TiendasDaoFiles } from './file/tiendas.dao.file.js'
import { tiendasSchema } from './mongoDB/tiendas.model.mongoose.js'


const RUTA_USUARIOS_JSON = './db/tiendas.json'

let daoTiendas

if (MODO_EJECUCION === 'online') {
    if (!daoTiendas) {
        const tiendasModel = model('Tiendas', tiendasSchema)
        daoTiendas = new TiendasDaoMongoose(tiendasModel)
        console.log('Tiendas de: mongodb')
    }
} else {
    daoTiendas = new TiendasDaoFiles(RUTA_USUARIOS_JSON)
    console.log('Tiendas existiendo en: sistema de archivos')
}

export function getDaoTiendas() {
    return daoTiendas
} 