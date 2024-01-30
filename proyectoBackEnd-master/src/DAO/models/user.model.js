import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { hasheadasSonIguales } from "../../criptografia.js"

const collection = 'usuarios'

const schema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: '(no aplica)' },
    first_name: { type: String, required: true },
    last_name: { type: String },
    age: {type: Number},
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carts' }],
    role: {type: String, default: 'user'}

}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        login: async function (email, password) {
            let datosUsuario

            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                datosUsuario = {
                    email: 'admin',
                    first_name: 'admin',
                    last_name: 'admin',
                    role: 'admin'
                }
            } else {
                const usuario = await mongoose.model(collection).findOne({ email }).lean()

                if (!usuario) {
                    throw new Error('login failed')
                }

                if (!hasheadasSonIguales(password, usuario['password'])) {
                    throw new Error('login failed')
                }

                datosUsuario = {
                    email: usuario['email'],
                    first_name: usuario['nombre'],
                    last_name: usuario['apellido'],
                    age: usuario['edad'],
                    role: 'user',
                    id: usuario['_id']
                }
            }
            return datosUsuario
        }
    }
})

schema.options.toObject = {
    transform: function (doc, ret) {
        delete ret.password;
    }
};
export const usuariosManager = mongoose.model(collection, schema)