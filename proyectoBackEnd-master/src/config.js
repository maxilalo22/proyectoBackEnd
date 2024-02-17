import dotenv from 'dotenv'

dotenv.config()

export default {
    sessionSecret: process.env.SESSION_SECRET,
    adminMail: process.env.ADMIN_EMAIL,
    githubApp: process.env.GITHUB_APP_ID,
    githubClient: process.env.GITHUB_CLIENT_ID,
    gitClientSecret: process.env.GITHUB_CLIENT_SECRET,
    githubCallback: process.env.GITHUB_CALLBACK_URL,
    mongoUrl: process.env.URL_MONGO_DB
}