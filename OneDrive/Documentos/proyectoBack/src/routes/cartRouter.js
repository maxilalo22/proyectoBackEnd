import { Router } from "express";
import CartManager from "../services/cartManager.js";

export const cartRouter = Router()

let cartManager = new CartManager()

cartRouter.post('/api/carts', (req,res)=>{
    try {
        cartManager.addCart()
        res.status(201).send({ message: 'Carrito creado exitosamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})

cartRouter.get('/api/carts/:cid', (req,res)=>{
    try {
        const cid = parseInt(req.params.cid);
        const carrito = cartManager.getCartById(cid)
        if(carrito){
            res.json(carrito)
        }else{
            res.status(404).send('Carrito No Encontrado!');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})

cartRouter.post('/api/carts/:cid/product/:pid', (req,res)=>{
    try {
        cartManager.addProductToCart(req)
        res.status(201).send({ message: 'Producto agregado al carrito exitosamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})