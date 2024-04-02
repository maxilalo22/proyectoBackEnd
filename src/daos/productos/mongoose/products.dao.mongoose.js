import { toPOJO } from '../../utils/utils.js'


export class ProductsDaoMongoose {
    constructor(productsModel) {
        this.productsModel = productsModel
    }

    async create(data) {
        const producto = await this.productsModel.create(data)
        return toPOJO(producto)
    }

    async readOne(query) {
        const products = await this.productsModel.findOne(query).lean()
        return toPOJO(products)
    }

    async readMany(query) {
        return toPOJO(await this.productsModel.find(query).lean())
    }

    async updateOne(query, data) {
        throw new Error('NOT IMPLEMENTED')
    }

    async updateMany(query, data) {
        throw new Error('NOT IMPLEMENTED')
    }

    async deleteOne(query) {
        throw new Error('NOT IMPLEMENTED')
    }

    async deleteMany(query) {
        throw new Error('NOT IMPLEMENTED')
    }
}
