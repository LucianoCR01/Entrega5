const { Router } = require("express");
const publicRouter = Router()

const ProducManager = require("../../ProductManager")
const manager = new ProducManager("products.json")

publicRouter.get("/", async (req, res)=>{
    let arr = await manager.getProducts();
    res.render("home", {arr})
    
})




module.exports =  publicRouter;