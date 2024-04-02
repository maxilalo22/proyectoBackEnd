import express from 'express'
import { webRouter } from '../routes/web/web.router.js'
import { apiRouter } from '../routes/api/api.router.js'
import passport from 'passport'
import initializePassport from '../config/passport.config.js'
import { sessionConfig } from '../middlewares/session.js'

export const app = express()

app.use(express.json());
app.use('/static', express.static('./static'))

initializePassport()
app.use(passport.initialize())
app.use(sessionConfig)

app.use('/', webRouter)
app.use('/api', apiRouter)