import fs from 'fs'
import {Router} from 'express'


export const viewRouter = Router()

viewRouter.get('/', (req, res) => {
    console.log('Entrando en la ruta /');
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(`Error al leer el archivo: ${err}`);
            res.status(500).send('Error interno del servidor');
            return;
        }

        try {
            const products = JSON.parse(data);
            console.log('Productos leídos correctamente:', products);
            res.render('home', { products });
        } catch (error) {
            console.log(`Error al leer productos del archivo: ${error}`);
            res.status(500).send('Error interno del servidor');
        }
    });
});
