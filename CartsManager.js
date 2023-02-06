const fs = require("fs")

class CartsManager{
    carts;
    constructor(file){
        this.carts = file
    }

    async getNewId(){
        let datos = await this.getProducts()
        if (datos.length == 0){
            return 1
        } else{
          return datos[datos.length - 1].id + 1 
        }
    }

    async addProduct(){
        let id = await this.getNewId()
        let objVacio = { "id": id,
            "products":[] 
        }
        let datos = await this.getProducts()
        datos.push(objVacio)
        await fs.promises.writeFile(this.carts, JSON.stringify(datos))
    }

    async getProducts(){
        let products = await fs.promises.readFile(this.carts, "utf-8")
        let objProduc = JSON.parse(products)
        return objProduc
    }

    async getCarrito(id){
        let arr =  await this.getProducts()
        return arr.find(busq => busq.id == id)
    }

    async agregarProductoCarrito(cid,pid,newProduct){
        let carritos =  await this.getProducts()
        let pos = carritos.findIndex(ele => ele.id == cid)
        let cartValues = Object.values(carritos[cid - 1]);
        let cartProducts = cartValues[1];
        let isInCart = cartProducts.find((prod) => prod.id == pid);
        if (isInCart){
            isInCart.quantity++;
            }else{
            cartProducts.push(newProduct);
        }
        let obj = {"id":Math.floor(cid),"products":cartProducts}
        carritos.splice(pos,1,obj)
        await fs.promises.writeFile(this.carts, JSON.stringify(carritos))
    
    }

}

module.exports = CartsManager;