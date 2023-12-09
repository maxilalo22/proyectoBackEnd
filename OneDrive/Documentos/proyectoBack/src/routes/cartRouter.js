import { Router } from "express";
import CartManager from "../DAO/services/mongoDB/cartManager.js";

export const cartRouter = Router();
const cartManager = new CartManager();

cartRouter.post('/api/carts', async (req, res) => {
    try {
        const cartId = await cartManager.addCart();
        res.status(201).send({ message: 'Carrito creado exitosamente.', cartId });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

cartRouter.get('/api/carts/:Id', async (req, res) => {
    try {
        const cartId = req.params.Id;
        const carrito = await cartManager.getCartById(cartId);

        if (carrito) {
            res.json(carrito);
        } else {
            res.status(404).send('Carrito No Encontrado!');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

cartRouter.post('/api/carts/:Id/product/:id', async (req, res) => {
    try {
        await cartManager.addProductToCart(req);
        res.status(201).send({ message: 'Producto agregado al carrito exitosamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
