import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
    res.sendFile('home.html', { root: 'src/views' })
})