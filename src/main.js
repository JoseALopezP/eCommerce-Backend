const express = require('express');
const app = express();
const {Server: HttpServer} = require('http');
import { productRoute } from './routes/products.js';
import { cartRoute } from './routes/cart.js';


const port = process.env.PORT;
const publicRoot = './public';

//json
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const httpServer = new HttpServer(app);

//Routes
aplicacion.use('/api/products', productRoute);
aplicacion.use('/api/cart', cartRoute);

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