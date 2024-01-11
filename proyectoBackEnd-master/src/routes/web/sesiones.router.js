import { Router } from 'express'
import passport from 'passport'

export const sesionesRouter = Router()


sesionesRouter.get('/login', function (req, res) {
    res.render('login.handlebars', {
        pageTitle: 'Login'
    })
})

sesionesRouter.get('/githublogin', passport.authenticate('loginGithub'))
//ESTA RUTA TIENE QUE SER LA MISMA QUE PUSISTE EN GITHUB
//MODIFICA EN AMBOS LADOS PARA QUE QUEDE IGUAL
//SACALE EL api/sessions
sesionesRouter.get('/api/sessions/githubcallback', passport.authenticate('loginGithub', {
    successRedirect: '/profile',
    failureRedirect: '/login',
}))