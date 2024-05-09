import * as net from 'net';

const PORT = 8000
const LOCALHOST = '127.0.0.1'

const socket = new net.Socket();
socket.connect(PORT, LOCALHOST, () => {
    socket.write(`testing\n`);
});

socket.on('data', (data) => {
    console.log(data.toString("binary"));
});

socket.on('close', () => {
    console.log(`[CLIENT] Connection closed!\n`);
});
