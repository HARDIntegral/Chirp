import * as net from 'net';
import * as cheerio from 'cheerio';

import * as data from '../../Util/data';
import * as request from '../../Util/Connection/request';
import * as messageHandler from './Messaging/messageHandler';

const socket = new net.Socket();

socket.connect(data.PORT, data.IP, async () => {
    console.log(`[CLIENT] Connected to server on port ${data.PORT}`);
});

socket.on('data', async data => {
    const serverRequest = request.parseRequest(data.toString());
    if (parseInt(serverRequest.statusCode) == 200) {
        const $ = cheerio.load(serverRequest.body);
        switch ($('#msg_accept_ready').text()) {
            case 'READY':
                messageHandler.sendMessage(socket);
                break;
            default:
                console.log('[CLIENT] Improper server request recieved');
        }
    } else {
        console.log(`[CLIENT] Bad request recieved status code: ${serverRequest.statusCode}`);
    }
});

socket.on('close', () => {
    console.log(`[CLIENT] Connection closed!\n`);
});

