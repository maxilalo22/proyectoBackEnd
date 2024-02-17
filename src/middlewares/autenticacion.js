import passport from 'passport'
import { UsuariosDaoFiles } from "../DAOS/usuarios/file/usuarios.dao.file.js"
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_PRIVATE_KEY } from '../config/config.js'

const COOKIE_OPTS = { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }

export function adminAuthorization(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'No tienes permisos de administrador' });
    }
}


export async function appendJwtAsCookie(req, res, next) {
    try {
        const accessToken = await encriptar(req.user)
        res.cookie('authorization', accessToken, COOKIE_OPTS)
        next()
    } catch (error) {
        next(error)
    }
}

export async function removeJwtFromCookies(req, res, next) {
    res.clearCookie('authorization', COOKIE_OPTS)
    next()
}

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req?.signedCookies) {
            token = req.signedCookies['authorization']
        }
        return token
    }]),
    secretOrKey: JWT_PRIVATE_KEY,
}, function loginUser(user, done) {
    done(null, user)
}))

//--------local----------

import { Strategy as LocalStrategy } from 'passport-local'
import { encriptar } from '../DAOS/utils/encript.js'

passport.use('local-register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
},
    async (req, _u, _p, done) => {
        try {
            const datosUsuario = await Usuario.registrar(req.body)
            done(null, datosUsuario)
        } catch (error) {
            done(null, false, error.message)
        }
    }))

passport.use('local-login', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const datosUsuario = await UsuariosDaoFiles.autenticar(email, password)
        done(null, datosUsuario)
    } catch (error) {
        return done(null, false, error.message)
    }
}))

export const autentication = passport.initialize()
