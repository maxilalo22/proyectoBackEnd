import { getDaoTiendas } from '../DAOS/tiendas/tiendas.dao.js'
import { bebidasService } from './bebidas.services.js'
import { TiendasService } from './tiendas.services.js'
import { UsuariosService } from './usuarios.services.js'
import { getDaoUsuarios } from '../DAOS/usuarios/usuarios.dao.js'
import { getDaobebidas } from '../DAOS/bebidas/bebidas.dao.js'
import { EmailService } from './email.service.js'
import { NewslettersService } from './newsletters.services.js'
import { Suscriptor } from '../models/suscriptor.model.js'

const tiendasDao = getDaoTiendas()
export const tiendasService = new TiendasService({ tiendasDao, bebidasService })




const usuariosDao = getDaoUsuarios()
const bebidasDao = getDaobebidas()
export const usuariosService = new UsuariosService({ usuariosDao, bebidasDao })

class SuscriptoresDao{
    constructor(){
        this.suscriptores = []
    }
    create(suscriptor){
        this.suscriptores.push(suscriptor);
    }

    readMany(){
        return this.suscriptores
    }

    deleteOne({ email }){
        if (index ===!  -1) throw new Error('')
        {this.suscriptores.slice(index,1)};
        
    }
}

export const suscriptoresDao = new SuscriptoresDao()
export const emailService = new EmailService()
export const newslettersService = new NewslettersService(suscriptoresDao, emailService)