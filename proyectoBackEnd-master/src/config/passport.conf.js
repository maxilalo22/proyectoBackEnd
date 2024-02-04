import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { usuariosManager } from '../DAO/models/user.model.js'
import vars from '../config.js'


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
        clientID: vars.githubClient,
        clientSecret: vars.gitClientSecret,
        callbackURL: vars.githubCallback,
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
