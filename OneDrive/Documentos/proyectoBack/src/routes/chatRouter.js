// chatRouter.js
import { Router } from 'express';
import { messageModel } from '../DAO/models/messageModel.js';
import { io } from '../main.js';

export const chatRouter = Router();

chatRouter.get('/api/messages', async (req, res) => {
    try {
        const messages = await messageModel.find().lean();
        res.json(messages);
    } catch (error) {
        console.error('Error al obtener mensajes:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/chat', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await messageModel.create({ user, message });
        io.emit('updateChat', newMessage);
        res.status(201).send({ message: 'Mensaje enviado correctamente.' });
    } catch (error) {
        console.error('Error al enviar mensaje:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});
