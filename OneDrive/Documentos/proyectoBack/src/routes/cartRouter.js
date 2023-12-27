import { Router } from "express";
import CartManager from "../DAO/services/mongoDB/cartManager.js";

const cartRouter = Router();
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
        const cart = await cartManager.getCartById(cartId);

        if (cart) {
            res.json(cart);
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


cartRouter.delete('/api/carts/:Id/product/:id', async (req, res) => {
    try {
        const { Id: cartId, id: productId } = req.params;
        await cartManager.removeProductFromCart(cartId, productId);
        res.status(200).send({ message: 'Producto eliminado del carrito exitosamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


cartRouter.delete('/api/carts/:Id', async (req, res) => {
    try {
        const cartId = req.params.Id;
        await cartManager.removeAllProductsFromCart(cartId);
        res.status(200).send({ message: 'Todos los productos eliminados del carrito exitosamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


cartRouter.put('/api/carts/:Id', async (req, res) => {
    try {
        const cartId = req.params.Id;
        const updatedProducts = req.body.products;
        await cartManager.updateCart(cartId, updatedProducts);
        res.status(200).send({ message: 'Carrito actualizado exitosamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


cartRouter.put('/api/carts/:Id/product/:id', async (req, res) => {
    try {
        const { Id: cartId, id: productId } = req.params;
        const newQuantity = req.body.quantity;
        await cartManager.updateProductQuantity(cartId, productId, newQuantity);
        res.status(200).send({ message: 'Cantidad de producto actualizada exitosamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

export { cartRouter };

