import express from 'express'
import vars from './config.js';
import { createServer } from 'http'; 
import { Server } from 'socket.io';
import __dirname from './utils.js'
import {productRouter} from './routes/api/productRouter.js'
import { cartRouter } from './routes/api/cartRouter.js'
import { viewRouter } from './routes/web/viewRouter.js'
import { chatRouter } from './routes/web/chatRouter.js';
import { messageModel } from './DAO/models/message.model.js';
import { apiRouter } from './routes/api/apiRest.router.js';
import { webRouter } from './routes/web/web.router.js';
import { handlebarsConf } from './config/handlebars.conf.js';
import { mongoConf } from './config/mongodb.conf.js';
import { sessionConf } from './config/session.conf.js';
import { initializePassport } from './config/passport.conf.js';


const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io/client-dist"));

app.use(express.static(__dirname + '/public'))

handlebarsConf(app)
mongoConf(vars.mongoUrl)
sessionConf(app,vars.mongoUrl)
initializePassport(app)

app.use('/', webRouter, viewRouter, chatRouter)
app.use('/api', apiRouter, productRouter, cartRouter)


/* app.use(productRouter);
app.use(cartRouter);
app.use('/', viewRouter);
app.use('/chat', chatRouter) */

app.get('/home', (req, res) => {
    res.render('home');
});


io.on('connection', (socket) => {
    console.log('Cliente conectado!');

    socket.on('setUsername', (username) => {
        socket.username = username;
        socket.broadcast.emit('userConnected', `${socket.username} se ha conectado!`);
    });

    socket.on('updateProducts', (products) => {
        socket.emit('updateProducts', products);
    });

    socket.on('message', async (data) => {
        const newMessage = new messageModel({
            user: data.user,
            message: data.message,
        });

        try {
            await newMessage.save();
            console.log('Mensaje guardado en la base de datos:', newMessage);
            const messagesFromDB = await messageModel.find();
            io.emit('messageLogs', messagesFromDB);
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
        }
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', `${socket.username} se ha desconectado!`);
    });
});


httpServer.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080!');
});



export { io };