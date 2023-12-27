import session from 'express-session'
import connectMongo from 'connect-mongo'
import { SESSION_SECRET } from '../config.js'

const store = connectMongo.create({
    mongoUrl: "mongodb+srv://maxvenditti94:mendoza110@cluster0.zyyalew.mongodb.net/ecommerce",
    ttl: 60 * 60 * 24 
})

export const sesiones = session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})
