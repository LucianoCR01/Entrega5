
const socket = io.connect();

const input = document.querySelector('#ell2')
document.querySelector('#ell').addEventListener('click', () => {
    socket.emit('idEliminar', input.value)
    console.log(input)
})

socket.on('messages', data => {
    document.getElementById('lista').innerText = data;
})

const funciona = document.querySelector('#botAdd2')
document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('addProd', funciona.value)
    console.log(funciona)
})
