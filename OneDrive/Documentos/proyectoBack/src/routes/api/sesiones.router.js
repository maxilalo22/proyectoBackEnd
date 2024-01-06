import { Router } from 'express'
import { soloLogueadosApi } from '../../middlewares/autorizacion.js'
import passport from 'passport'

export const sesionesRouter = Router()

sesionesRouter.post(
  '/',
  passport.authenticate('loginLocal', {failWithError: true}),async (req, res, next) => {
   req.session.save(()=>{
    console.log('session guardada')
   })
    res.status(201).json({ status: 'success', message: 'login success' })
  }
)

sesionesRouter.get('/current', soloLogueadosApi, (req, res) => {
  res.json(req.user)
})

sesionesRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: 'logout error', body: err })
    }
    res.redirect('/login')
  })
})
