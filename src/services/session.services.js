import { UsuariosDaoMongoose } from "../DAOS/usuarios/file/usuarios.dao.file.js";
import { removeJwtFromCookies } from './path/to/removeJwtFromCookies.js';


const UsuariosDaoMongoose = new UsuariosDaoMongoose(); 

export async function authenticateUser(credentials) {
    console.log("sessions.service credentials", credentials);
    try {
        const user = await UsuariosDaoMongoose.authentication(credentials);
        return user;
    } catch (error) {
        throw new Error("Error en la autenticación del usuario: " + error.message);
    }
}

export async function deleteAuthToken(req, res, next) {
    try {
        removeJwtFromCookies(req, res, next);
        res.json({
            status: "success",
            message: "Token deleted successfully!",
        });
    } catch (error) {
        next(error);
    }
}
