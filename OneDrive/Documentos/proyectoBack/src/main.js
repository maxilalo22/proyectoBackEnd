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


const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use("/socket.io", express.static(__dirname + "/node_modules/socket.io/client-dist"));

app.use(express.static(__dirname + '/public'))

app.use(productRouter);
app.use(cartRouter);
app.use('/', viewRouter);
app.use('/realTimeProducts', realRouter);


io.on('connection', (socket) => {
    console.log('Cliente conectado!');
    socket.on('updateProducts', (product) => {
        socket.emit('updateProducts', product);
    });
});

const MONGODB_URL = "mongodb+srv://maxvenditti94:mendoza110@cluster0.zyyalew.mongodb.net/ecommerce";

mongoose.connect(MONGODB_URL, {
    dbName: "ecommerce",
    serverSelectionTimeoutMS: 30000
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