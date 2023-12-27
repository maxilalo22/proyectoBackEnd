import { Router } from 'express';
import { productModel } from '../DAO/models/products.model.js';

export const viewRouter = Router();

viewRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render('home', { products });
    } catch (error) {
        console.error('Error al obtener productos desde la base de datos:', error);
        res.status(500).send('Internal Server Error');
    }
})

viewRouter.get('/products', async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render('products', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Internal Server Error');
    }
});

viewRouter.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartProducts = await productModel.findById(cartId).lean();
        res.render('products', { cartProducts });
    } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
        res.status(500).send('Internal Server Error');
    }
});