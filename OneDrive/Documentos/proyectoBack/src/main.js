import express from 'express'
import { productRouter } from '../routes/productRouter.js'
import { cartRouter } from '../routes/cartRouter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(productRouter)
app.use(cartRouter)




const server = app.listen(8080, () => console.log('Servidor corriendo en puerto 8080!'))