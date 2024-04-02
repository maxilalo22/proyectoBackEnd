import { randomUUID } from 'node:crypto'

export class Tienda {
    #_id
    #nombre
    #productos
    constructor({ _id = randomUUID(), nombre }) {
        this.#_id = _id
        this.nombre = nombre
        this.#productos = []
    }

    get _id() { return this.#_id }
    get nombre() { return this.#nombre }
    get productos() { return this.#productos }

    set nombre(value) {
        if (!value) throw new Error('el nombre es obligatorio')
        this.#nombre = value
    }

    toPOJO() {
        return {
            _id: this.#_id,
            nombre: this.#nombre,
            productos: this.#productos
        }
    }
}