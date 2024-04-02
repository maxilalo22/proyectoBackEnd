import { model } from 'mongoose';
import { encriptar } from '../../utils/encript.js'
import { Schema } from 'mongoose';
import {randomUUID} from  "crypto";

const collName = 'users';

export const usuariosSchema = new Schema({
    _id: { type: String, default: randomUUID },
    nombre: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user'}
}, {
    strict: 'throw',
    versionKey: false
});

/* usuariosSchema.statics.registrar = async function(userData) {
    try {
        // Encripta la contraseña antes de crear el usuario
        userData.password = await encriptar(userData.password);
        const user = await model(collName).create(userData);
        return user.toObject();
    } catch (error) {
        throw new Error(error.message);
    }
}; */
