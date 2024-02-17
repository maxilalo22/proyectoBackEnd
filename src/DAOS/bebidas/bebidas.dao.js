import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'
import { BebidasDaoMongoose } from './mongoDB/bebidas.dao.mongoose.js'
import { BebidasDaoFiles } from './file/bebidas.dao.file.js'
import { bebidasSchema } from './mongoDB/bebidas.model.mongoose.js'


const RUTA_USUARIOS_JSON = './db/bebidas.json'

let daoBebidas

if (MODO_EJECUCION === 'online') {
    if (!daoBebidas) {
        const bebidasModel = model('bebidas', bebidasSchema)
        daoBebidas = new BebidasDaoMongoose(bebidasModel)
        console.log('Bebidas de: mongodb')
    }
} else {
    daoBebidas = new BebidasDaoFiles(RUTA_USUARIOS_JSON)
    console.log('Bebidas existiendo en: sistema de archivos')
}

export function getDaobebidas() {
    return daoBebidas
} 