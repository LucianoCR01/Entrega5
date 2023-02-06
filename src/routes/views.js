const { Router } = require("express");
const viewsRouter = Router()

const ProducManager = require("../../ProductManager")
const manager = new ProducManager("products.json")

viewsRouter.get("/realtimeproducts", async (req, res)=>{
    let arr = await manager.getProducts();
    res.render("realtimeproducts")
    
})




module.exports =  viewsRouter;