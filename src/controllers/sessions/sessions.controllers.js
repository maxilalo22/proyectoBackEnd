import {
    authenticateUser,
    deleteAuthToken,
} from "../services/sessions.service.js";

export async function loginUser(req, res, next) {
    try {
        const User = await authenticateUser(req.body);
        console.log("Authenticated user:", User); // Agregar mensaje para verificar si el usuario se autentica correctamente
        if (!User) {
            const error = new Error("Invalid credentials");
            error.code = 401;
            throw error;
        }

        res.status(201).json({
            status: "success",
            message: "Login successful!",
            payload: User,
        });
    } catch (error) {
        console.error("Error occurred during user login:", error); // Agregar mensaje para registrar cualquier error que ocurra durante el inicio de sesión
        next(error);
    }
}


export function logoutUser(req, res) {
    deleteAuthToken(req, res);
}
