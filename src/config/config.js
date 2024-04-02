import dotenv from  'dotenv';

console.log('cargando config')

dotenv.config()

export const PORT = 8080
export const MONGODB_CNX_STR = 'mongodb+srv://maxvenditti94:mendoza110@cluster0.zyyalew.mongodb.net/'
export const MODO_EJECUCION = 'online'
//export const MODO_EJECUCION = 'offline'

export const COOKIE_SECRET = 'CookieMonsterSecret'
export const SESSION_SECRET = 'SecretWithBanana'
export const JWT_PRIVATE_KEY = 'jwtSecret'


export const ADMIN_SMS_NUMBER = process.env.ADMIN_SMS_NUMBER
export const TWILIO_SID =   process.env.TWILIO_SID
export const TWILIO_TOKEN = process.env.TWILIO_TOKEN


export const NODEMAILER_GMAIL_OPTIONS = {
    service: 'gmail',
    port: '587',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}

export const TWILIO_SMS_OPTIONS = {
    sid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_TOKEN,
    origin: process.env.ADMIN_SMS_NUMBER
}