import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { usuariosManager } from '../DAO/models/usuarios.js'
import { GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../config.js'

export const initializePassport = (app) => {
  passport.use(
    'loginLocal',
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (username, password, done) => {
        try {
          const datosUsuario = await usuariosManager.login(username, password)
          console.log(datosUsuario)
          return done(null, datosUsuario)
        } catch (error) {
          console.log('first')
          done(error)
        }
      }
    )
  )

  passport.use(
    'loginGithub',
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (_, __, profile, done) => {
        let usuario = await usuariosManager.findOne({ email: profile.username })
        if (!usuario) {
          usuario = await usuariosManager.create({
            nombre: profile.displayName,
            email: profile.username,
          })
        }
        done(null, usuario.toObject())
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    let user_found = await usuariosManager.findById(id)
    done(null, user_found)
  })

  app.use(passport.initialize())
  app.use(passport.session())
}
