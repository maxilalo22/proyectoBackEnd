import express from 'express'
import { webRouter } from '../routes/web/web.router.js'
import { apiRouter } from '../routes/api/api.router.js'
import passport from 'passport'
import initializePassport from '../config/passport.config.js'
import { sessionConfig } from '../middlewares/session.js'
import session from 'express-session'

export const app = express()

app.use(express.json());
app.use('/static', express.static('./static'))


app.use(sessionConfig)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', webRouter)
app.use('/api', apiRouter)