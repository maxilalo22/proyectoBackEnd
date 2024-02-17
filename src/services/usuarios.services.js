import { Usuario } from '../models/usuario.model.js'


export class UsuariosService {

  constructor({ usuariosDao, bebidasDao }) {
    this.usuariosDao = usuariosDao
    this.bebidasDao = bebidasDao
  }

  async registrar(datos) {
    const usuario = new Usuario(datos)
    await this.usuariosDao.create(usuario.toPOJO())
    return usuario.toPOJO()
  }

  async comprarBebida(idUsuario, idBebida) {
    const usuario = await this.usuariosDao.readOne({ _id: idUsuario })
    if (!usuario) throw new Error()

    const bebida = await this.bebidasDao.readOne({ _id: idBebida })
    if (!usuario) throw new Error()

  }

  async darDeBaja(idUsuario) {
    const usuario = await this.usuariosDao.deleteOne({ _id: idUsuario })
    return usuario
  }
}
