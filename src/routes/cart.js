import express from 'express';
import { Container } from '../container/containerFs.js';
const cartRoute = express.Router();

const cart = new Container('src/db/cart.txt');
const products = new Container('src/db/products.txt');

cartRoute.post('/', async(req, res) => {
    const cartX = {
        timestamp: Date.now(),
        products: []
      };
      const id = await cart.save(cartX);
    if(id){
        res.status(200).json({"success" : "cart added with ID: " + newCartId})
    }else{
        res.status(400).json({error : -6, description: "invalid key. Please verify the body content"})
    }
});

cartRoute.delete('/:id/productos/:id_prod', async (req, res) => {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);
    const cartX = await cart.getById(idCarrito);
    let deleteId = -1;
    cartX.products.forEach((product, index) => {
        if (product.id == productId) {
            deleteId = index;
        }
    });
    if (deleteId >= 0) {
        cartX.products.splice(deleteId, 1);
        await cartX.update(idCart, cartX);
        res.status(200).json({"success": "cart successfully removed"})
    }else{
        res.status(404).json({error : -7, description: "product not found"})
    }
});

cartRoute.post('/:id/productos', async(req,res) => {
    const cartId = parseInt(peticion.params.id);
    const productId = req.body.productId;
    const product = await products.getById(productId);
    const cartX = await cart.getById(cartId);
    cartX.products.push(product);
    await cart.update(cartId, cartX);
    res.status(200).json({"success" : "product added"})
});

cartRoute.get('/:id/productos', async(req, res) => {
    const id = parseInt(req.params.id);
    const productsList = await cart.getById(id)
    if(productsList){
        res.status(200).json(productsList.products)
    }else{
        res.status(404).json({error : -8, description: "cart not found"})
    }
});

cartRoute.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const wasDeleted = await cart.deleteById(id);
    res.status(200).json({"success": "cart successfully removed"})
});

export { cartRoute };