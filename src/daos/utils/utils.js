import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'

export const createHash = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error al crear el hash de la contraseña: ' + error.message);
    }
};

export const isValidPassword = (user, password) => {
    return bcrypt.compare(password, user.password);
}



const __filename= fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname

export function matches(query) {
    return function (elem) {
        for (const key in query) {
            if (!elem.hasOwnProperty(key) || elem[key] !== query[key]) {
                return false
            }
        }
        return true
    }
}

export function toPOJO(obj) {
    return JSON.parse(JSON.stringify(obj))
}



