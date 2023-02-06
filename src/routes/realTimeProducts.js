const { Router } = require("express");
const realTime = Router()

const ProducManager = require("../../ProductManager")
const manager = new ProducManager("products.json")

realTime.get("/", async (req, res)=>{
    let arr = await manager.getProducts();
    res.render("home", {arr})
})



module.exports =  realTime;