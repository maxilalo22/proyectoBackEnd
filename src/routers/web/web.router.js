import { Router } from 'express'



export const webRouter = Router()

webRouter.get('/', (req, res) => { return res.redirect('/profile') })

webRouter.get('/register', (req, res) => {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

webRouter.get('/resetpassword', (req, res) => {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

webRouter.get('/edit', function (req, res) {
  res.render('edit.handlebars', {
    pageTitle: 'Editar mis datos'
  })
})

webRouter.get('/profile',
  (req, res) => {
    res.render('profile.handlebars', {
      pageTitle: 'Perfil',
      user: req.user,
    })
  })

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})