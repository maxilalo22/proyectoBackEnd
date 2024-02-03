import CartManager from "../../DAO/services/mongoDB/cartManager.js";

class CartController {
    constructor() {
        this.cartManager = new CartManager();
    }

    addCart = async (req, res) => {
        try {
            const cartId = await this.cartManager.addCart();
            res.status(201).send({ message: 'Carrito creado exitosamente.', cartId });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    getCartById = async (req, res) => {
        try {
            const cartId = req.params.Id;
            const cart = await this.cartManager.getCartById(cartId);

            if (cart) {
                res.json(cart);
            } else {
                res.status(404).send('Carrito No Encontrado!');
            }
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    addProductToCart = async (req, res) =>{
        try {
            await cartManager.addProductToCart(req);
            res.status(201).send({ message: 'Producto agregado al carrito exitosamente.' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    deleteProductFromCart = async (req, res) =>{
        try {
            const { Id: cartId, id: productId } = req.params;
            await cartManager.removeProductFromCart(cartId, productId);
            res.status(200).send({ message: 'Producto eliminado del carrito exitosamente.' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    deleteAllProductsFromCart  = async (req, res) => {
        try {
            const cartId = req.params.Id;
            await cartManager.removeAllProductsFromCart(cartId);
            res.status(200).send({ message: 'Todos los productos eliminados del carrito exitosamente.' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    updateCart =  async (req, res) => {
        try {
            const cartId = req.params.Id;
            const updatedProducts = req.body.products;
            await cartManager.updateCart(cartId, updatedProducts);
            res.status(200).send({ message: 'Carrito actualizado exitosamente.' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    updateProductQuantity =  async (req, res) => {
        try {
            const { Id: cartId, id: productId } = req.params;
            const newQuantity = req.body.quantity;
            await cartManager.updateProductQuantity(cartId, productId, newQuantity);
            res.status(200).send({ message: 'Cantidad de producto actualizada exitosamente.' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
}

    const cartController = new CartController();

    export { cartController };