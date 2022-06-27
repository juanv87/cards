import mongoose from "mongoose";

/*
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log("Ya estabamos conectados");
    return;
  }
  /* 
  Si esto es mayor a 0 significa que hay alguna conexion extra que quiero revisar.
  */
  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooConnection.isConnected === 1) {
      console.log("Usando conection anterior");
      return;
    }
    /* 
    Si no obtengo 1 lo desconecto. Es para evitar tener muchas conexiones simultáneas.
    */
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongooConnection.isConnected = 1;
  console.log("Conectado a MongoDb", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;
  if (mongooConnection.isConnected === 0) return;
  await mongoose.disconnect();
  console.log("Desconectado de MongoDB");
};
