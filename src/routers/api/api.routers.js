import { Router, json, urlencoded } from 'express';
import { bebidasRouter } from './bebidas.router.js';
import { usuariosRouter } from './usuarios.router.js';
import { sesionesRouter } from './sesiones.router.js';
import { tiendasRouter } from './tiendas.router.js';
import { cartsRouter } from './carts.router.js';
import { ordersRouter } from './orders.router.js';
import { manejoDeErrores } from '../../middlewares/manejoDeErrores.js';
import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js';
import { newsletterRouter } from './newsletters.router.js';

export const apiRouter = Router();

apiRouter.use(respuestasMejoradas);
apiRouter.use(json());
apiRouter.use(urlencoded({ extended: true }));

apiRouter.use('/usuarios', usuariosRouter);
apiRouter.use('/sesiones', sesionesRouter);
apiRouter.use('/bebidas', bebidasRouter);
apiRouter.use('/tiendas', tiendasRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/newsletter", newsletterRouter );


apiRouter.use(manejoDeErrores);