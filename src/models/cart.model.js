import { randomUUID } from "node:crypto";

export class CartModel {
    constructor({ id = randomUUID(), productos = [] } = {}) {
        this._id = id;
        this._productos = productos;
    }

    get id() {
        return this._id;
    }

    get productos() {
        return this._productos;
    }

    set productos(value) {
        this._productos = value;
    }
}
