import express from 'express';
import { Container } from '../contenedor/containerFs.js';
const productRoute = express.Router();

const products = new Container('src/db/products.txt');

const authMiddleware = app.use((req, res, next) => {
    const admin = req.headers.admin;
    if(req.header(admin)){
        next()
    }else{
        res.status(401).json({"error": "unauthorized"})
    }
})

productsRoute.get('/', async (req, res) => {
    const productsList = await products.getAll();
    res.status(200).json(products);
})

productsRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await products.getById(id);
    if(product){
        res.status(200).json(product)
    }else{
        res.status(400).json({"error": "product not found"})
    }
})

productsRoute.post('/',authMiddleware, async (req,res) => {
    const {body} = req;
    body.timestamp = Date.now();
    const newProductId = await products.save(body);
    if(newProductId){
        res.status(200).json({"success" : "product added with ID: " + newProductId})
    }else{
        res.status(400).json({"error": "invalid"})
    }
})


productsRoute.put('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const wasUpdated = await products.update(id,body);
    if(wasUpdated){
        res.status(200).json({"success" : "product updated"})
    }else{
        res.status(404).json({"error": "product not found"})
    }
})

routerProducts.delete('/:id', authMiddleware, async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await products.deleteById(id);
    if(wasDeleted){
        res.status(200).json({"success": "product successfully removed"})
    }else{
        res.status(404).json({"error": "product not found"})
    }
})