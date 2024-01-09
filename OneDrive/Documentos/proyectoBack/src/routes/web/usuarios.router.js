import { Router } from 'express'

export const usuariosRouter = Router()


usuariosRouter.get('/register', function (req, res) {
    res.render('register.handlebars', {
        pageTitle: 'Registro'
    })
})


usuariosRouter.get('/resetpassword', function (req, res) {
    res.render('resetpassword.handlebars', {
        pageTitle: 'Reestablecer contraseña'
    })
})

usuariosRouter.get('/edit', function (req, res) {
    res.render('edit.handlebars', {
        pageTitle: 'Editar mis datos'
    })
})


usuariosRouter.get('/profile', function (req, res) {
    res.render('profile.handlebars', {
        pageTitle: 'Perfil',
        user: req.user
    })
})