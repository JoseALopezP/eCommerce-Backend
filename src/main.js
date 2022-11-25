import {productsRoute} from './routes/products.js';
import {cartRoute} from './routes/cart.js';
import express from "express";
import http from "http";

const app = express();

const {Server: HttpServer} = http;


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
      res.status(404).send({ error : -2, descripcion: `ruta ${req.url} no encontrada` });
    } else {
      next();
    }
  })


export {httpServer};