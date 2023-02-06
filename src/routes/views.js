const { Router } = require("express");
const viewsRouter = Router()

const ProducManager = require("../../ProductManager")
const manager = new ProducManager("products.json")

viewsRouter.get("/", async (req, res)=>{
    let arr = await manager.getProducts();
    res.render("home", {arr})
    
})




module.exports =  viewsRouter;