import * as net from 'net';
import * as cheerio from 'cheerio';

import * as data from '../../Util/data';
import * as request from '../../Util/Connection/request';
import * as messageHandler from './Messaging/messageHandler';

const BACKLOG = 100;

const server = net.createServer()
    .listen(data.PORT, data.IP, BACKLOG);
console.log(`[SERVER] Created Server on ${data.IP}:${data.PORT}`);
    
server.on('connection', (socket: net.Socket) => {
    // Send initial signal to allow for messages
    messageHandler.sendReady(socket);

    console.log('[SERVER] Sent READY signal');
    socket.on('data', (buffer: Buffer) => {
        const clientRequest: request.Request = request.parseRequest(buffer.toString());
        if (parseInt(clientRequest.statusCode) == 200) {
            const $ = cheerio.load(clientRequest.body);
            const requestText = $('#client_msg').text();
            switch (requestText) {
                case 'SOCKETKILL':
                    socket.end();
                    console.log('[SERVER] Closing connection');
                    break;
                default:
                    console.log(`[SERVER] Recieved message: ${requestText}`);
                    messageHandler.sendReady(socket);
            }
        } else {
            console.log(`[SERVER] Bad request recieved status code: ${clientRequest.statusCode}`)
        }
    });
});

server.on('listening', (socket: net.Socket)  => {
    console.log(`[SERVER] Listening on port ${data.PORT}`)
});