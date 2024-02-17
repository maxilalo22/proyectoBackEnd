import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'
import { UsuariosDaoMongoose } from './mongoDB/usuarios.dao.mongoose.js'
import { UsuariosDaoFiles } from './file/usuarios.dao.file.js'
import { usuariosSchema } from './mongoDB/usuarios.model.mongoose.js'

const RUTA_USUARIOS_JSON = '../../../db/usuarios.json'

let daoUsuarios

if (MODO_EJECUCION === 'online') {
  if (!daoUsuarios) {
    const usuariosModel = model('usuarios', usuariosSchema)
    daoUsuarios = new UsuariosDaoMongoose(usuariosModel)
    console.log('Persistencia usuarios en mongodb')
  }
} else {
  daoUsuarios = new UsuariosDaoFiles(RUTA_USUARIOS_JSON)
  console.log('Persistencia local')
}

export function getDaoUsuarios() {
  return daoUsuarios
} 
