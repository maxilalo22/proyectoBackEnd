/* import { Router } from 'express'
import passport from 'passport'

import { appendJwtAsCookie, removeJwtFromCookies } from '../../src/middlewares/authentication.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
    passport.authenticate('local-login',
        { failWithError: true, session: false }),
    appendJwtAsCookie,
    async function (req, res) {
        res['creado'](req.user)
    },
)

sesionesRouter.get('/current',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    function (req, res) {
        res['ok'](req.user)
    },
)

sesionesRouter.delete('/current',
    removeJwtFromCookies,
    (req, res) => {
        res['ok']({ message: 'logout OK' })
    }
) */

/* import { Router } from 'express';
import passport from 'passport'
import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/authentication.js'

export const sesionesRouter = Router();

sesionesRouter.post('/', passport.authenticate('local-login', { failWithError: true, session: false }), appendJwtAsCookie, async function (req, res) {
    res['creado'](req.user);
});

sesionesRouter.get('/current', passport.authenticate('jwt', { failWithError: true, session: false }), function (req, res) {
    res['ok'](req.user);
});

sesionesRouter.delete('/current', removeJwtFromCookies, (req, res) => {
    res['ok']({ message: 'Logout OK' });
}); */

import { Router } from "express";
import { auth } from '../../middlewares/authentication.js'
import passport from  'passport'

export const sesionesRouter = Router();

sesionesRouter.get('/', (req, res) => {
    res.send('BIENVENIDO!!!')
})

sesionesRouter.get('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req, res) => {
    console.log("User authenticated:", req.user);
    // Si la autenticación fue exitosa, la sesión ya se ha establecido correctamente
    // Ahora establecemos req.session.user y req.session.admin según corresponda
    if (req.user) {
        req.session.user = req.user.email;
        req.session.admin = req.user.role === 'admin';
        res.send({ status: "success", payload: req.user });
    } else {
        res.status(400).send({ status: "error", error: "Invalid credentials" });
    }
});



/* sesionesRouter.get('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}),  setSession, (req, res) => {
    if(!req.user) return res.status(400).send({status:"error", error:"Invalid Credentials"})
    req.session.user ={
        name: req.user.name,
        email: req.user.email,
    }
    req.session.admin={
        name: req.user.name,
        email:req.user.email,
    }
    res.send({status:"success",payload:req.user})
    /* const email = req.body.email;
    const password = req.body.password;

    // Verificar si se proporcionaron email y password en el cuerpo de la solicitud
    if (email && password) {
        // Verificar si se trata del administrador
        if (email === 'admin@admin.com' && password === 'admin') {
            // Si es el administrador, establecer la sesión para el administrador
            req.session.user = email;
            req.session.admin = true;
            return res.send('login success as admin!');
        } else {
            if (email && password)
            req.session.user = email;
            req.session.admin = false; // No es un administrador
            return res.send('login success as normal user!');
        }
    } else {
        // Si falta el correo electrónico o la contraseña, devolver un mensaje de error de datos faltantes
        return res.status(400).send({ message: 'Faltan datos por enviar' });
    } 
}); */

sesionesRouter.get('/faillogin', (req, res) => {
    console.log('Failed login attempt');
    res.status(401).send({ error: "Failed login attempt" });
});


sesionesRouter.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
})

sesionesRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ status: 'logout error', body: err })
        }
        res.send('Logout ok')
    })
})

sesionesRouter.post('/register', passport.authenticate('register',{failureRedirect:'/failregister'}), async(req,res)=>{
    res.send({status: "success", message: "User registered"})
})

sesionesRouter.get('/failregister', async (req, res) => {
    console.log('Failed Strategy');
    res.send({ error: "Failed" });
});

