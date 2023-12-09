import { Router } from 'express';
import { productModel } from '../DAO/models/products.model.js';
import { io } from '../main.js';

export const realRouter = Router();

realRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

realRouter.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productModel.create(productData);
        io.emit('updateProducts', newProduct);
        res.status(201).send({ message: 'Producto agregado correctamente.' });
    } catch (error) {
        console.error('Error al agregar producto:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

realRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (deletedProduct) {
            io.emit('updateProducts', { _id: productId, deleted: true });
            res.send({ message: 'Producto eliminado correctamente.' });
        } else {
            res.status(404).send({ message: 'Producto no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});
