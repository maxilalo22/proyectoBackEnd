import fs from 'fs/promises'
import { matches } from '../../utils/utils.js'

export class BebidasDaoFiles {

  constructor(path) {
    this.path = path
  }

  async #readbebidas() {
    return JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #writebebidas(bebidas) {
    await fs.writeFile(this.path, JSON.stringify(bebidas, null, 2))
  }

  async create(bebidaPojo) {
    const bebidas = await this.#readbebidas()
    bebidas.push(bebidaPojo)
    await this.#writebebidas(bebidas)
    return bebidaPojo
  }

  async readOne(query) {
    const bebidas = await this.#readbebidas()
    const buscado = bebidas.find(matches(query))
    return buscado
  }

  async readMany(query) {
    const bebidas = await this.#readbebidas()
    const buscados = bebidas.filter(matches(query))
    return buscados
  }
}