import session from 'express-session'
import MongoStore from 'connect-mongo'
import vars from '../config.js'



export const sessionConf = (app, url) =>{
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: url,
        mongoOptions: {},
        ttl : 15
      }),
      secret: vars.sessionSecret,
      resave: false,
      saveUninitialized: false
    })
  )
}