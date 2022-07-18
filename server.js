import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { faker } from '@faker-js/faker'

import session from 'express-session';
import MongoStore from 'connect-mongo';
import express from 'express';
import cookieParser from 'cookie-parser';

import webControllers from './controllers/webController.js';
import apiControllers from './controllers/apiController.js';
import socketController from './controllers/socketController.js';


const mongOptions = { useNewUrlParser: true, useUnifiedTopology: true}
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

app.get("/api/productos-test", (req, res) => {
    faker.locale = "en";
    const productosFaker = [];

  for (let i = 0; i < 5; i++) {
    productosFaker.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(100, 3000, 0, '$'),
      thumbnail: faker.image.business()
    });
  }
  res.json(productosFaker);
}); 

app.get('/', webControllers.inicio)
app.get('/login', webControllers.login)
app.get('/logout', webControllers.logout)

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Alejandro:otero@coderhouse.av1btb7.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: mongOptions    
    }),
    secret: 'foo',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
 
app.get('/api/login', apiControllers.session);
app.post('/api/login/:name', apiControllers.login);
app.get('/api/logout', apiControllers.logout);


io.on('connection', socket => socketController(socket, io))

const server = httpServer.listen(8080, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})