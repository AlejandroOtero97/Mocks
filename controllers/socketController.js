import { normalize, schema } from 'normalizr';
import ContainerMongoose from '../containers/ContainerMongoose.js';
import mongoose from '../mongoConfig.js';

const productos = new ContainerMongoose(mongoose.collections.products, mongoose.url, mongoose.options);
const mensajes = new ContainerMongoose(mongoose.collections.messages, mongoose.url, mongoose.options);

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMessages = new schema.Entity('messages', {author: schemaAuthor}, { idAttribute: '_id' });

const normalizeMessages = (messages) => {
    const messagesNormalized = normalize(messages, [schemaMessages]);
    return messagesNormalized;
}

async function socketController(socket, io) {
    socket.emit('connectionToServer', { 
        productsData: await productos.getAll(), 
        messagesData: normalizeMessages(await mensajes.getAll())
    });
    socket.on("enviarMensaje", async (data) => {
        await mensajes.save(data);
        io.sockets.emit('actualizarMensajes', { messagesData: normalizeMessages(await mensajes.getAll()) })
    })
    socket.on('agregarProducto', async (data) => {
        await productos.save(data);
        io.sockets.emit('actualizarTabla', { productsData: await productos.getAll() })
    })
}
  
export default socketController;