import {productsRoute} from './routes/products.js';
import {cartRoute} from './routes/cart.js';
import express from "express";
import http from "http";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const {Server: HttpServer} = http;

const port = process.env.PORT;
const publicRoot = './public';

//json
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const httpServer = new HttpServer(app);

//Routes
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);

//Public
app.use(express.static(publicRoot));

app.use((req, res, next) => {
    if (!req.route) {
      res.status(404).send({ error : -2, descripcion: `ruta ${peticion.url} no encontrada` });
    } else {
      next();
    }
  })

//Server
const server = httpServer.listen(port, () => {
    console.log(`Server listening to: ${server.address().port}`);
});



server.on('error', error => console.log(`Error: ${error}`));