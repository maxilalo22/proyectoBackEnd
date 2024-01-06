import mongoose from 'mongoose'

export const mongoConf = (uri) =>{
  mongoose.connect(uri,{
    dbName: "ecommerce",
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000, 
  })
  .then(()=> console.log("Conectado a MongoDB"))
  .catch(()=> console.log("Error al conectar: ", error))
}