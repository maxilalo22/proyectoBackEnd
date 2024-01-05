import { Router } from 'express'
import { usuariosManager } from '../../DAO/models/usuarios.js'
import { soloLogueadosApi } from '../../middlewares/autorizacion.js'
import { hashear } from '../../criptografia.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', async (req, res) => {
    try {
        req.body.password = hashear(req.body.password)

        const usuario = await usuariosManager.create(req.body)

        req.login(usuario.toObject(), error => {
            if (error) {
                res.status(401).json({ status: 'error', message: error.message })
            } else {
                res.status(201).json({ status: 'success', payload: usuario.toObject() })
            }
        })
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message })
    }
})

usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
    const usuario = await usuariosManager.findOne({ email: req['user'].email }, { password: 0 }).lean()
    res.json({ status: 'success', payload: usuario })
})

usuariosRouter.put('/', async function (req, res) {
    try {

        if (req.body.password) {
            req.body.password = hashear(req.body.password)
        }

        const actualizado = await usuariosManager.findOneAndUpdate(
            { email: req.body.email },
            { $set: req.body },
            { new: true }
        )

        if (!actualizado) {
            return res.status(404).json({ status: 'error', message: 'usuario no encontrado' })
        }

        res.json({ status: 'success', payload: actualizado })
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message })
    }
})