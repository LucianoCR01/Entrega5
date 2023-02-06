const { Router } = require("express");
const userRouterCart = Router()

const CartsManager = require("../../CartsManager")
const manager = new CartsManager("carts.json")

const ProducManager = require("../../ProductManager")
const products = new ProducManager("products.json");


userRouterCart.post("/", async (req, res)=>{
    let prod = req.body;
    await manager.addProduct(prod)
    res.send("Producto agregado")
})

userRouterCart.get("/:cid", async (req, res)=>{
    let cid = req.params.cid;
    let busqueda = await manager.getCarrito(cid);
    if (busqueda) {
        res.send(busqueda)
    }else{
        res.send(`No se encontro el carrito con el id ${cid}`) 
    }
})

userRouterCart.post("/:cid/product/:pid", async (req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    let totalProducts = await products.getProducts(); // Trae todos los productos de products.json
    let productId = totalProducts.find((prod) => prod.id == pid); // Identifico un productos en particular por el PID
    let newProduct = { "id": productId.id, "quantity": 1 }; // Producto para agregar al carrito
    await manager.agregarProductoCarrito(cid,pid,newProduct)
    res.send(`Product added to cart`);
})

module.exports = userRouterCart;