import { randomUUID } from 'node:crypto'


export class Usuario {
    #_id
    #nombre
    #email
    #password

    constructor({ _id = randomUUID(), nombre, email, password }) {
        this.#_id = _id
        this.nombre = nombre
        this.email = email
        this.password = password
    }

    get _id() { return this.#_id }
    get nombre() { return this.#nombre }
    get email() { return this.#email }

    set nombre(value) {
        if (!value) throw new Error('el nombre es obligatorio')
        this.#nombre = value
    }

    set email(value) {
        if (!value) throw new Error('el email es obligatorio')
        this.#email = value
    }

    set password(value) {
        if (!value) throw new Error('la contraseña es obligatoria')
        this.#password = value
    }

    get password() {
        return this.#password
    }

    toPOJO() {
        return {
            _id: this.#_id,
            nombre: this.#nombre,
            email: this.#email,
            password: this.#password
        }
    }
}