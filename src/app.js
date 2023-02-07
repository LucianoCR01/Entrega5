const ProducManager = require("../ProductManager")
const manager = new ProducManager("products.json")


const express = require ("express")
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const userRouterProd = require("./routes/producs")
app.use("/api/products", userRouterProd)

const userRouterCart = require("./routes/carts.js")
app.use("/api/carts", userRouterCart)

const realTime = require("./routes/realTimeProducts")
app.use("/", realTime)


//{Handlebars
const exphbs = require("express-handlebars")   
app.engine("hbs", exphbs.engine({
    extname:'.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layouts.hbs' 
}))
app.set('views', './src/views/partials');
app.set('view engine', 'hbs');

const viewsRouter = require("./routes/views")
app.use("/",viewsRouter)

//Handlebars}

const PORT = 8080
const Server = httpServer.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))
Server.on("error", error => console.log(error))

let objProd = {}

io.on('connection', async socket => {
    let arr = await manager.getProducts();
    let json = JSON.stringify(arr)
    console.log('Nuevo cliente conectado')   
    io.sockets.emit('messages', json)

    socket.on('idEliminar', async data => {
        await manager.deleteProduct(data);
    })
    
    socket.on('title', title => {
        objProd.title = title
    })

    socket.on('descripction', descripction => {
        objProd.descripction = descripction
    })

    socket.on('price', price => {
        objProd.price = price
    })

    socket.on('code', code => {
        objProd.code = code
        
    })

    socket.on('stock', async stock => {
        objProd.stock = stock
        await manager.addProduct(objProd);
    })
})

