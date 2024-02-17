import { toPOJO } from "../../utils/utils.js"; 

export class UsuariosDaoMongoose {
  constructor(usuariosModel) {
    this.usuariosModel = usuariosModel
  }

  async create(data) {
    const bebida = await this.usuariosModel.create(data)
    return toPOJO(bebida)
  }

  async readOne(query) {
    return toPOJO(await this.usuariosModel.findOne(query).lean())
  }

  async readMany(query) {
    return toPOJO(await this.usuariosModel.find(query).lean())
  }
}
