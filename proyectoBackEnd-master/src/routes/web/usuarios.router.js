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
        pageTitle: 'Editar mis datos',
        logged: true
    })
})


usuariosRouter.get('/profile', function (req, res) {

    //LE PASAMOS DATOS PARA QUE LOS PUEDA PINTAR LA VISTA
    // ESTO ES MAS FACIL QUE AGREGARLE LOGICA EN JS A LA VISTA
    res.render('profile.handlebars', {
        pageTitle: 'Perfil',
        user: {
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            email: req.user.email
        },
        logged: true
    })
})