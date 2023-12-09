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