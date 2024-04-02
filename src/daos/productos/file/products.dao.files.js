import fs from 'fs/promises'
import { matches } from '../../utils/utils.js' 
import { Producto } from '../../../models/products.model.js'


export class ProductosDaoFiles {

    constructor(path) {
        this.path = path
        this.init()
    }

    async init() {
        try {
            await fs.access(this.path)
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.path, '[]')
            } else {
                throw error
            }
        }
    }

    async #readProductos() {
        return JSON.parse(await fs.readFile(this.path, 'utf-8'))
    }

    async #writeProductos(productos) {
        await fs.writeFile(this.path, JSON.stringify(productos, null, 2))
    }
    async create(productoPojo) {
        const productos = await this.#readProductos()
        productos.push(productoPojo)
        await this.#writeProductos(productos)
        return productoPojo
    }
    
    async readOne(query) {
        const productos = await this.#readProductos()
        const buscado = productos.find(matches(query))
        return buscado
    }

    async readMany(query) {
        const productos = await this.#readProductos()
        const buscados = productos.filter(matches(query))
        return buscados
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
