
export class Suscriptor {
    #email
    constructor({email}) {
        if (!email) throw new Error('El correo electrónico es obligatorio');
        this.#email = email;
    }
    get email() { return this.#email; }
    toPOJO(){
        return {
            email: this.#email
        };
    }
}
