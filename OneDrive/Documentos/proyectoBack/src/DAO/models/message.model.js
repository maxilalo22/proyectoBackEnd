import mongoose from 'mongoose'

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
});

mongoose.set("strictQuery", false);

export const messageModel = mongoose.model(messageCollection, messageSchema);