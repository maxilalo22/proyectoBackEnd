
import { productModel } from "../../models/products.model.js";

export default class ProductManager {
    constructor() {
        this.products = []
        this.Id = 1;
        this.deletedIds = []
        this.loadProducts()
    }

    addProduct(producto) {
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            console.error('Error: Todos los campos son obligatorios.');
            throw new Error('Todos los campos son obligatorios.');
        }
    
        const verificacionProd = this.products.find(productoExistente => productoExistente.code === producto.code);
        if (verificacionProd) {
            console.error('Error: El campo "code" ya existe.');
            throw new Error('El campo "code" ya existe.');
        }
    
        const productoNuevo = {
            id: this.Id,
            ...producto,
        };
    
        this.products.push(productoNuevo);
        this.Id++;
    
        this.saveProducts();
        console.log('Producto agregado correctamente.');
    }
    

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const producto = this.products.find(productoExistente => productoExistente.id === id);
        if (producto) {
            return producto;
        } else {
            console.log('Producto no encontrado.');
        }
    }

    async updateProduct(id, dataToUpdate) {
        const actProduct = this.products.find(product => product.id === id);

        if (actProduct) {
            if (dataToUpdate.title) actProduct.title = dataToUpdate.title;
            if (dataToUpdate.description) actProduct.description = dataToUpdate.description;
            if (dataToUpdate.price) actProduct.price = dataToUpdate.price;
            if (dataToUpdate.thumbnail) actProduct.thumbnail = dataToUpdate.thumbnail;
            if (dataToUpdate.code) actProduct.code = dataToUpdate.code;
            if (dataToUpdate.stock) actProduct.stock = dataToUpdate.stock;
        } else {
            console.log(`No se encontró un producto con ID ${id}. No se pudo actualizar.`);
        }

        await this.saveProducts();
        console.log('Producto actualizado', actProduct);
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(productoExistente => productoExistente.id === id);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            this.deletedIds.push(deletedProduct.id);
            await this.saveProducts();
            console.log('Producto eliminado correctamente.');
            return deletedProduct;
        } else {
            console.log('Producto no encontrado.');
            return null;
        }
    }
    

    async loadProducts() {
        try {
            this.products = await productModel.find({}).lean();
            /* if (this.products.length > 0) {
                const lastProductId = this.products[this.products.length - 1].id;
                this.Id = lastProductId + 1; */
            
            console.log('Productos cargados correctamente desde la base de datos:', this.products);
        } catch (error) {
            console.error('Error al cargar productos desde la base de datos:', error);
        }
    }
    


    async saveProducts() {
        try {
            await productModel.deleteMany({});
            const result = await productModel.insertMany(this.products);
            console.log(`Se insertó el producto correctamente en DB.`);
        } catch (error) {
            console.error('Error al guardar productos en la base de datos:', error);
        }
    }
}    

const product = new ProductManager();