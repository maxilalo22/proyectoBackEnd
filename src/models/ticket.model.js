import crypto from "crypto";

export class Order {
    #_id;
    #code;
    #purchaseDatetime;
    #amount;
    #purchaser;

    constructor({
        _id = crypto.randomUUID(),
        code = crypto.randomUUID(),
        purchaseDatetime = new Date(),
        amount,
        purchaser,
    }) {
        if (!purchaser || !amount) {
            throw new Error("Todos los campos son obligatorios.");
        }

        this.#_id = _id;
        this.#code = code;
        this.#purchaseDatetime = purchaseDatetime;
        this.#amount = amount;
        this.#purchaser = purchaser;
    }

    get _id() {
        return this.#_id;
    }
    get code() {
        return this.#code;
    }
    get purchaseDatetime() {
        return this.#purchaseDatetime;
    }
    get amount() {
        return this.#amount;
    }
    get purchaser() {
        return this.#purchaser;
    }
}
