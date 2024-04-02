import { toPOJO } from '../../utils/utils.js'


export class UsuariosDaoMongoose {
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel
    }

    async create(data) {
        const usuario = await this.usuariosModel.create(data)
        return toPOJO(usuario)
        console.log(toPOJO(usuario))
    }

    async readOne(query) {
        return toPOJO(await this.usuariosModel.findOne(query).lean())
    }

    async readMany(query) {
        return toPOJO(await this.usuariosModel.find(query).lean())
    }
    
    async findById(id) {
        return toPOJO(await this.usuariosModel.findById(id).lean());
    }

    async updateOne(query, data) {
        throw new Error('NOT IMPLEMENTED')
    }

    async updateMany(query, data) {
        throw new Error('NOT IMPLEMENTED')
    }

    async deleteOne(query) {
        return await usuariosModel.findOneAndDelete(query).lean()
    }

    async deleteMany(query) {
        throw new Error('NOT IMPLEMENTED')
    }
}

