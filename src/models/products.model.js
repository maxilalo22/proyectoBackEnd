import { randomUUID } from 'node:crypto';

export class Producto {
    #_id
    #title
    #price
    #description
    #code
    #status
    #stock
    #category

    constructor({ _id = randomUUID(), title, price, description, code, status, stock, category }) {
        this.#_id = _id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category;
    }

    get _id() { return this.#_id; }
    get title() { return this.#title; }
    get price() { return this.#price; }
    get description() { return this.#description; }
    get code() { return this.#code; }
    get status() { return this.#status; }
    get stock() { return this.#stock; }
    get category() { return this.#category; }

    set title(value) {
        if (!value || value.trim() === '') {
            throw new Error('El title es obligatorio');
        }
        this.#title = value;
    }

    set price(value) {
        if (!value) {
            throw new Error('El precio es obligatorio');
        }
        if (value <= 0) {
            throw new Error('El precio debe ser positivo');
        }
        this.#price = value;
    }

    set description(value) {
        if (!value || value.trim() === '') {
            throw new Error('La descripción es obligatoria');
        }
        this.#description = value;
    }

    set code(value) {
        if (!value || value.trim() === '') {
            throw new Error('El código es obligatorio');
        }
        this.#code = value;
    }

    set status(value) {
        if (!value || (value !== 'activo' && value !== 'inactivo')) {
            throw new Error('El estado debe ser "activo" o "inactivo"');
        }
        this.#status = value;
    }

    set stock(value) {
        if (!Number.isInteger(value) || value < 0) {
            throw new Error('El stock debe ser un número entero positivo');
        }
        this.#stock = value;
    }

    set category(value) {
        if (!value || value.trim() === '') {
            throw new Error('La categoría es obligatoria');
        }
        this.#category = value;
    }

    toPOJO() {
        return {
            _id: this.#_id,
            title: this.#title,
            price: this.#price,
            description: this.#description,
            code: this.#code,
            status: this.#status,
            stock: this.#stock,
            category: this.#category
        };
    }
}


