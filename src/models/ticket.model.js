import { randomUUID } from 'node:crypto'

export class Ticket {
    #_id
    #purchaseDatetime
    #amount
    #usuario
    #bebidas
    
    constructor({ _id = randomUUID(), purchaseDatetime, amount, usuario, bebidas }) {
        this.#_id = _id
        this.#purchaseDatetime
        this.#amount
        this.#usuario
        this.#bebidas = []
    }    

    get code() { return this.#_id }
    get purchaseDatetime() { return this.#purchaseDatetime }
    get amount() { return this.#amount }
    get usuario() { return this.#usuario }
    get bebidas() { return this.#bebidas }

    toPOJO() {
        return {
            code: this.#_id,
            purchaseDatetime: this.purchaseDatetime,
            usuario: this.#usuario,
            amount: this.#amount,
            bebidas: this.#bebidas
        }    
    }    
}    
