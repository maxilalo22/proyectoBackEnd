import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import { createServer } from 'http'; 
import { Server } from 'socket.io';
import __dirname from './utils.js'
import {productRouter} from './routes/productRouter.js'
import { cartRouter } from './routes/cartRouter.js'
import { viewRouter } from './routes/viewRouter.js'
import { realRouter } from './routes/realTimeRouter.js';
import { chatRouter } from './routes/chatRouter.js';
import { messageModel } from './DAO/models/message.model.js';
import { apiRouter } from './routes/api/apiRest.router.js';
import { webRouter } from './routes/web/web.router.js';
import { sesiones } from './middlewares/sesiones.js'
import { passportInitialize, passportSession } from './middlewares/autenticaciones.js'


const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//app.use('/static', express.static('public'))

app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io/client-dist"));

app.use(express.static(__dirname + '/public'))

app.use(sesiones)
app.use(passportInitialize, passportSession)
app.use('/', webRouter)
app.use('/api', apiRouter)
app.use(productRouter);
app.use(cartRouter);
app.use('/', viewRouter);
app.use('/realTimeProducts', realRouter);
app.use('/chat', chatRouter)

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


const MONGODB_URL = "mongodb+srv://maxvenditti94:mendoza110@cluster0.zyyalew.mongodb.net/ecommerce";

mongoose.connect(MONGODB_URL, {
    dbName: "ecommerce",
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000, 
})

    .then(() => {
        console.log("DB connected");
    })
    .catch((e) => {
        console.log("Can't connect to DB");
        process.exit();
    });


httpServer.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080!');
});



export { io };