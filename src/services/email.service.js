import nodemailer from 'nodemailer'

export class EmailService{
    constructor(){
        
    }
    async enviar(to, subject, html){
        console.log(`to: ${to} - subject: ${subject} - html: ${html}`);
    }
}
