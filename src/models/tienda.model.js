import { randomUUID } from 'node:crypto'

export class Tienda {
    #_id
    #nombre
    #bebidas
    constructor({ _id = randomUUID(), nombre }) {
        this.#_id = _id
        this.nombre = nombre
        this.#bebidas = []
    }

    get _id() { return this.#_id }
    get nombre() { return this.#nombre }
    get bebidas() { return this.#bebidas }

    set nombre(value) {
        if (!value) throw new Error('Nombre es obligatorio')
        this.#nombre = value
    }

    toPOJO() {
        return {
            _id: this.#_id,
            nombre: this.#nombre,
            bebidas: this.#bebidas
        }
    }
}