import { Router } from "express";
import { productController } from "./controllers/productController";

export const productRouter = Router();

productRouter.get('/api/products', productController.getProducts);
productRouter.get('/api/products/:id', productController.getProductById);
productRouter.post('/api/products', productController.addProduct);
productRouter.put('/api/products/:id', productController.updateProduct);
productRouter.delete('/api/products/:id', productController.deleteProduct);
