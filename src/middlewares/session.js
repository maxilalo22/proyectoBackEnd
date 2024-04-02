import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STR, SESSION_SECRET } from '../config/config.js'

const MongoStore = new connectMongo({
    mongoUrl: MONGODB_CNX_STR,
    collectionName: 'sessions', 
    ttl: 60 * 60 * 24, // 1d
});


export const sessionConfig = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 día
        secure: false, 
        httpOnly: true,
    }
});

