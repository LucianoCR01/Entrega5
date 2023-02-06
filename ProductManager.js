const fs = require("fs")

class ProducManager{
    products;
    constructor(file){
        this.products = file
    }

    async getNewId(){
        let datos = await this.getProducts()
        if (datos.length == 0){
            return 1
        } else{
          return datos[datos.length - 1].id + 1 
        }
    }

    async addProduct(nuevoProducto){
        // nuevoProducto.id = await this.getNewId()
        let datos = await this.getProducts()
        datos.push(nuevoProducto)
        await fs.promises.writeFile(this.products, JSON.stringify(datos))
    }

    async getProducts(){
        let products = await fs.promises.readFile(this.products, "utf-8")
        let objProduc = JSON.parse(products)
        return objProduc
    }

    async getProdctById(id){
        let arr =  await this.getProducts()
        return arr.find(busq => busq.id == id)
        
    }

    async updateProduct(id,actualizar){
        let arr =  await this.getProducts()
        let pos = arr.findIndex(ele => ele.id === id)
        actualizar.id = id
        arr.splice(pos,1,actualizar)
        await fs.promises.writeFile(this.products, JSON.stringify(arr))
    }

    async deleteProduct(id){
        let arr =  await this.getProducts()
        let pos = arr.findIndex(ele => ele.id == id)
        arr.splice(pos,1)
        await fs.promises.writeFile(this.products, JSON.stringify(arr))
    } 
}

module.exports = ProducManager;