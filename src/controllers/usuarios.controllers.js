import { usuariosService } from '../services/usuarios.services.js'

export async function postController(req, res, next) {
  try {
    const usuario = await usuariosService.registrar(req.body)
    res.result(usuario)
  } catch (error) {
    next(error)
  }
}

export async function deleteController(req, res, next) {
  try {
    await usuariosService.darDeBaja(req.params.id)
    res.deleted()
  } catch (error) {
    next(error)
  }
}