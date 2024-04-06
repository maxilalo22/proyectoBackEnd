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
        try {
            const products = await this.productsModel.find(query).lean();
            return toPOJO(products);
        } catch (error) {
            throw new Error(`Error al leer productos: ${error.message}`);
        }
    }
    

    async updateOne(query, data) {
        const updatedProduct = await this.productsModel.findOneAndUpdate(query, data, { new: true }).lean();
        return toPOJO(updatedProduct);
    }

    async deleteOne(query) {
        const deletedProduct = await this.productsModel.findOneAndDelete(query).lean();
        return toPOJO(deletedProduct);
    }
}

