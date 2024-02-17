import { getDaoTiendas } from '../DAOS/tiendas/tiendas.dao.js'
import { bebidasService } from './bebidas.services.js'
import { TiendasService } from './tiendas.services.js'
import { UsuariosService } from './usuarios.services.js'
import { getDaoUsuarios } from '../DAOS/usuarios/usuarios.dao.js'
import { getDaobebidas } from '../DAOS/bebidas/bebidas.dao.js'


const tiendasDao = getDaoTiendas()
export const tiendasService = new TiendasService({ tiendasDao, bebidasService })

const usuariosDao = getDaoUsuarios()
const bebidasDao = getDaobebidas()
export const usuariosService = new UsuariosService({ usuariosDao, bebidasDao })