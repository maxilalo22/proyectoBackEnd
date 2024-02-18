import { Suscriptor } from "../models/suscriptor.model.js"
import { suscriptoresDao } from "./index.js"



export class NewslettersService {
    constructor(suscriptoresDao, enviadorMails){
        this.enviadorMails = enviadorMails
        this.suscriptoresDao = suscriptoresDao
    }
    
    async suscribirse({email}){
        const suscriptor =  new Suscriptor({ email })
        await this.suscriptoresDao.create(suscriptor.toPOJO)
        await this.enviadorMails.enviar({to: email, subject: 'registro exitoso', html:'Registrado'})
    }

    async desuscribirse({email}){
        await this.suscriptoresDao.deleteOne({ email })
        await this.enviadorMails.enviar({to: email, subject: 'Desuscripcion exitosa', html:'Desuscripto'})
    }

    async enviar(){
        const suscriptores = await this.suscriptoresDao.readMany();
        console.log("Suscriptores:", suscriptores); // Añadido para depurar
        for (const suscriptor of suscriptores){
            console.log("Suscriptor:", suscriptor); // Añadido para depurar
            console.log("Enviando correo a:", suscriptor.email); // Añadido para depurar
            await this.enviadorMails.enviar({to: suscriptor.email, subject: 'novedades', html:'etc etc'});
        }
    }
    
    
    
}