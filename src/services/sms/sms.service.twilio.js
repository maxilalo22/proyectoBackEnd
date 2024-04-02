import twilio from 'twilio'
import { TWILIO_TOKEN, TWILIO_SID } from '../../config/config.js';


const client = twilio(TWILIO_SID, TWILIO_TOKEN);

export class SmsServiceTwilio {
    constructor({ sid, authToken, origin }) {
        this.client = twilio(sid, authToken)
        this.origin = origin
    }

    async enviar({ to, message }) {
        const info = await this.client.messages.create({
            from: this.origin,
            to: '+542613414659',
            body: message,
        })
        console.log(info)
    }
} 


