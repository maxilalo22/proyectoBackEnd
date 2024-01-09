import { Router } from "express";
import { productModel } from "../DAO/models/products.model.js";

export const productRouter = Router();

productRouter.get('/api/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'desc' ? { price: -1 } : { price: 1 },
        };

        const filter = {};

        if (query) {
            filter.$or = [
                { title: { $regex: new RegExp(query, 'i') } },
                { description: { $regex: new RegExp(query, 'i') } },
            ];
        }

        const products = await productModel.paginate(filter, options);

        const totalPages = products.totalPages;
        const prevPage = products.prevPage || null;
        const nextPage = products.nextPage || null;
        const pageCurrent = products.page;
        const hasPrevPage = products.hasPrevPage;
        const hasNextPage = products.hasNextPage;
        const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        res.json({
            status: 'success',
            payload: products.docs,
            totalPages,
            prevPage,
            nextPage,
            page: pageCurrent,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        });
    } catch (error) {
        console.error('Error al obtener productos desde la base de datos:', error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

productRouter.get('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId).lean();

        if (product) {
            res.render('productDetails', { product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


productRouter.post('/api/products', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new productModel(productData);
        await newProduct.save();
        res.status(201).send({ message: 'Producto agregado correctamente.' });
    } catch (error) {
        console.error('Error al agregar producto:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

productRouter.put('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        await productModel.findByIdAndUpdate(productId, updateData);
        res.send({ message: 'Producto actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

productRouter.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (deletedProduct) {
            res.json({ message: 'Producto eliminado correctamente.', deletedProduct });
        } else {
            res.status(404).json({ message: 'Producto no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

