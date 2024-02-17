import { productModel } from "../../models/products.model.js";

export default class ProductManager {

    async addProduct(producto) {
        try {
            const nuevoProducto = new productModel(producto);
            await nuevoProducto.save();
            console.log('Producto agregado correctamente.');
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
            throw new Error('Error al agregar producto.');
        }
    }

    async getProducts() {
        try {
            const productos = await productModel.find().lean();
            return productos;
        } catch (error) {
            console.error('Error al obtener productos:', error.message);
            throw new Error('Error al obtener productos.');
        }
    }

    async getProductById(id) {
        try {
            const producto = await productModel.findById(id).lean();
            return producto;
        } catch (error) {
            console.error('Error al obtener producto por ID:', error.message);
            throw new Error('Error al obtener producto por ID.');
        }
    }

    async updateProduct(id, dataToUpdate) {
        try {
            await productModel.findByIdAndUpdate(id, dataToUpdate);
            console.log('Producto actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar producto:', error.message);
            throw new Error('Error al actualizar producto.');
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id);
            console.log('Producto eliminado correctamente.');
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
            throw new Error('Error al eliminar producto.');
        }
    }
}
