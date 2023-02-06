
const socket = io.connect();

const input = document.querySelector('#ell')
document.querySelector('#ell').addEventListener('click', () => {
    socket.emit('idEliminar', input.value)
    console.log(input)
})

socket.on('messages', data => {
    document.querySelector('h3').innerText = data;
})

const funciona = document.querySelector('.funciona')
document.querySelector("#botAdd").addEventListener('click', () => {
    socket.emit('addProd', funciona.value)
    console.log(funciona)
})
