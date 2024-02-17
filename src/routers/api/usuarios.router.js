import { Router } from 'express'
import passport from 'passport'
import { UsuariosDaoMongoose } from '../../DAOS/usuarios/mongoDB/usuarios.dao.mongoose.js'
import { solo } from '../../middlewares/autorizacion.js'
import { appendJwtAsCookie } from '../../middlewares/autenticacion.js'


export const usuariosRouter = Router()

usuariosRouter.post('/',
    passport.authenticate('local-register',
        { failWithError: true, session: false }),
    appendJwtAsCookie,
    async function (req, res) {
        res['creado'](req.user)
    },
)

usuariosRouter.put('/current',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    async function (req, res, next) {
        try {
            req.user = await UsuariosDaoMongoose.actualizar(req.body)
            next()
        } catch (error) {
            res['notFound'](error.message)
        }
    },
    appendJwtAsCookie,
    (req, res, next) => {
        res['ok'](req.user)
    }
)

usuariosRouter.patch('/',
    async function (req, res, next) {
        try {
            req.user = await UsuariosDaoMongoose.resetearContrasenia(req.body)
            next()
        } catch (error) {
            res['notFound'](error.message)
        }
    },
    appendJwtAsCookie,
    (req, res, next) => {
        res['ok'](req.user)
    }
)

usuariosRouter.get('/current',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    async (req, res) => {
        res['ok'](req.user)
    },
)

usuariosRouter.get('/',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    solo(['admin']),
    async (req, res) => {
        const usuarios = await UsuariosDaoMongoose.find().lean()
        res['ok'](usuarios)
    },
)
