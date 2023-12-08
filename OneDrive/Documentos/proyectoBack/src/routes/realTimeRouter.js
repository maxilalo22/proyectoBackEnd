import { Router } from 'express';
import ProductManager from '../DAO/services/mongoDB/productManager.js';
import { io } from '../main.js'; 

export const realRouter = Router();
const productManager = new ProductManager();

realRouter.get('/', (req, res) => {
    res.render('realTimeProducts', { products: productManager.getProducts() });
});

realRouter.post('/', (req, res) => {
    try {
        let product = req.body;
        productManager.addProduct(product);
        io.emit('updateProducts', productManager.getProducts());
        res.status(201).send({ message: 'Producto agregado correctamente.' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error interno del servidor');
    }
})

realRouter.delete('/:pid', (req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const result = productManager.deleteProduct(productId);

        if (result) {
            res.send({ message: 'Producto eliminado correctamente.' });
        } else {
            res.status(404).send({ message: 'Producto no encontrado.' });
        }
        io.emit('updateProducts', productManager.getProducts());
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})
