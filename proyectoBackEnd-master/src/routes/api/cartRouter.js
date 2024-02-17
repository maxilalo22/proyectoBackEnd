import { Router } from "express";
import { cartController } from "../../controllers/cart.controller.js"; 

const cartRouter = Router();

cartRouter.post('/api/carts', cartController.addCart)


cartRouter.get('/api/carts/:Id', cartController.getCartById);


cartRouter.post('/api/carts/:Id/product/:id', cartController.addProductToCart);


cartRouter.delete('/api/carts/:Id/product/:id', cartController.deleteProductFromCart);


cartRouter.delete('/api/carts/:Id', cartController.deleteAllProductsFromCart);


cartRouter.put('/api/carts/:Id', cartController.updateCart);


cartRouter.put('/api/carts/:Id/product/:id', cartController.updateProductQuantity);

export { cartRouter };

