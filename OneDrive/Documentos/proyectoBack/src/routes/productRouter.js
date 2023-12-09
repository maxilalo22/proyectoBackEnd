import { Router } from "express";
import { productModel } from "../DAO/models/products.model.js";

export const productRouter = Router();

productRouter.get('/api/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let products;

        if (!isNaN(limit)) {
            products = await productModel.find().limit(limit).lean();
        } else {
            products = await productModel.find().lean();
        }

        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos desde la base de datos:', error);
        res.status(500).send('Internal Server Error');
    }
});

productRouter.get('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId).lean();

        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


productRouter.post('/api/products', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new productModel(productData);
        await newProduct.save();
        res.status(201).send({ message: 'Producto agregado correctamente.' });
    } catch (error) {
        console.error('Error al agregar producto:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

productRouter.put('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        await productModel.findByIdAndUpdate(productId, updateData);
        res.send({ message: 'Producto actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

productRouter.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (deletedProduct) {
            res.json({ message: 'Producto eliminado correctamente.', deletedProduct });
        } else {
            res.status(404).json({ message: 'Producto no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

