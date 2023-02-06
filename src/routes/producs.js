const { Router } = require("express");
const userRouterProd = Router()

const ProducManager = require("../../ProductManager")
const manager = new ProducManager("products.json")

userRouterProd.get("/", async (req, res) =>{
    let max = req.query;
    let arr = await manager.getProducts();
    let num = Object.values(max)
    let arrFor = []

    if (Object.keys(max) == "limit" && arr.length >= Math.floor(num) ){
        for (let i=0; i < Math.floor(num); i++){
        arrFor.push(arr[i])  
        }
        res.send(arrFor)
    }else{        
        res.send(arr)
    } 
})

userRouterProd.get("/:pid", async (req, res) =>{
    let pid = req.params.pid;
    let busqueda = await manager.getProdctById(pid);
    if (busqueda) {
        res.send(busqueda)
    }else{
        res.send(`No se encontro el objeto con el id ${pid}`) 
    }
})

userRouterProd.post("/", async (req, res)=>{
    let prod = req.body;
    await manager.addProduct(prod)
    res.send("Producto agregado")
})

userRouterProd.put("/:pid", async (req, res)=>{
    let pid = req.params.pid;
    let prod = req.body;
    await manager.updateProduct(pid,prod)
    res.send("Producto Actualizado")
})

userRouterProd.delete("/:pid", async (req, res)=>{
    let pid = req.params.pid;
    await manager.deleteProduct(pid)
    res.send("Producto Eliminado")
})





module.exports = userRouterProd;