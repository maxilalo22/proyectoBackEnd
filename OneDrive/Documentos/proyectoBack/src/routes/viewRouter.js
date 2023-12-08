import { Router } from 'express';
import ProductManager from '../DAO/services/mongoDB/productManager.js';

export const viewRouter = Router();

const productManager = new ProductManager();

viewRouter.get('/', async (req, res) => {
    try {
        const products = productManager.getProducts();
        console.log('Productos leídos correctamente:', products);
        res.render('home', { products });
    } catch (error) {
        console.error(`Error al obtener productos desde el administrador de productos: ${error}`);
        res.status(500).send('Error interno del servidor');
    }
});
