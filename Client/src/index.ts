import * as net from 'net';

import * as input from './IO/input';
import * as data from '../../Util/data';
import * as request from '../../Util/Connection/request';
import * as response from '../../Util/Connection/response';
const socket = new net.Socket();

socket.connect(data.PORT, data.IP, async () => {
    const userInput: string = await input.getInput();
    const socketResponse = response.compileResponse({
        protocol: 'HTTP/1.1',
        headers: new Map(),
        status: 'OK',
        statusCode: 200,
        body: `<html><body>${userInput}</body></html>`
    });
    socket.write(socketResponse);
});

socket.on('data', (data) => {
    console.log(data.toString());
});

socket.on('close', () => {
    console.log(`[CLIENT] Connection closed!\n`);
});

