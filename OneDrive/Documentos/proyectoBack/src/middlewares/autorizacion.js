export function onlyLogueadosRest(req, res, next) {
    if (!req.session['user']) {
        return res
            .status(403)
            .json({
                status: 'error',
                message: 'No tienes autorización para ver esto. Solo para usuarios registrados!!!'
            })
    }
    next()
}

export function onlyLogueadosWeb(req, res, next) {
    if (!req.session['user']) {
        return res.redirect('/login')
    }
    next()
}