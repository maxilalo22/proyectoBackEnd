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
        //SI ESTA LOGEADO LE PASAMOS DATOS A LA VISTA
        // ESTO HAY QUE HACER PORQUE ESTA VISTA SE PUEDE 
        // VER SI NO ESTAS LOGEADO. 
        // Y PARA MOSTRAR ESTOS DATOS PRIMERO VEMOS SI ESTA LOGEADO
        const data = {}
        if(req.user){
            data.logged = true
            data.nombre = req.user.nombre
            data.apellido = req.user.apellido
            data.email = req.user.email
        }

        const products = await productModel.find().lean();
        res.render('products', { 
            products,
            ...data
        });
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