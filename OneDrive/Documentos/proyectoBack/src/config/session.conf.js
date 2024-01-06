import session from 'express-session'
import MongoStore from 'connect-mongo'
import { SESSION_SECRET,} from '../config.js'


export const sessionConf = (app, url) =>{
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: url,
        mongoOptions: {},
        ttl : 15
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )
}