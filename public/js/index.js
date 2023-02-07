
const socket = io.connect();

const input = document.querySelector('#ell2')
document.querySelector('#ell').addEventListener('click', () => {
    socket.emit('idEliminar', input.value)
})

socket.on('messages', data => {
    document.getElementById('lista').innerText = data;
})


    
    const title = document.querySelector('#title')
    const descripction = document.querySelector('#descripction')
    const price = document.querySelector('#price')
    const code = document.querySelector('#code')
    const stock = document.querySelector('#stock')


document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('title', title.value)
})

document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('descripction', descripction.value)
})

document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('price', price.value)
})

document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('code', code.value)
})

document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('stock', stock.value)
})
