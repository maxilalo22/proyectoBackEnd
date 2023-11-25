import express from 'express'
import handlebars from 'express-handlebars'
import { createServer } from 'http'; // Importa createServer de http
import { Server } from 'socket.io';
import __dirname from './utils.js'
import {productRouter} from './routes/productRouter.js'
import { cartRouter } from './routes/cartRouter.js'
import { viewRouter } from './routes/viewRouter.js'

const app = express()

const httpServer = createServer(app)
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use(productRouter)
app.use(cartRouter)
app.use('/',viewRouter)



const server = app.listen(8080, () => console.log('Servidor corriendo en puerto 8080!'))

socketServer.on('connection', socket =>{
    console.log('cliente conectado!')
})