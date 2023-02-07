
const socket = io.connect();

const input = document.querySelector('#ell2')
document.querySelector('#ell').addEventListener('click', () => {
    socket.emit('idEliminar', input.value)
})

socket.on('messages', data => {
    document.getElementById('lista').innerText = data;
})

function formulario(){
    let objProducto = {}
    const title = document.querySelector('#title')
    const descripction = document.querySelector('#descripction')
    const price = document.querySelector('#price')
    const code = document.querySelector('#code')
    const stock = document.querySelector('#stock')
    objProducto.title = title
    objProducto.descripction = descripction
    objProducto.price = price
    objProducto.code = code
    objProducto.stock = stock
    console.log(objProducto)
    return objProducto 
}


document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('addProd', formulario())
})
