import { Router } from "express"
import ProductManager from "../services/productManager.js";

export const productRouter = Router()

let productManager = new ProductManager();

productRouter.get('/api/products', (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        if (!isNaN(limit)) {
            const limitesProd = productManager.getProducts().slice(0, limit)
            res.json(limitesProd)
        } else {
            res.json(productManager.getProducts());
        }
    } catch (error) {
        console.log('Error:', error.message)
        res.status(500).send('Internal Server Error')
    }

})

productRouter.get('/api/products/:pid', (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = productManager.getProductById(pid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})

productRouter.post('/api/products', (req, res) => {
    try {
        let product = req.body;
        productManager.addProduct(product);
        res.status(201).send({ message: 'Producto agregado correctamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


productRouter.put('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updateProduct = req.body;
    const verProd = productManager.getProductById(productId);

    if (verProd) {
        productManager.updateProduct(productId, updateProduct);
        res.send({ message: 'Producto Actualizado' });
    } else {
        res.status(400).send({ message: 'No se encontró el producto!' });
    }
});


productRouter.delete('/api/products/:pid', (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const result = productManager.deleteProduct(productId);

        if (result) {
            res.send({ message: 'Producto eliminado correctamente.' });
        } else {
            res.status(404).send({ message: 'Producto no encontrado.' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
