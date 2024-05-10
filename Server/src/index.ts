import * as net from 'net';

import * as data from '../../Util/data';
import * as request from '../../Util/Connection/request';
import * as response from '../../Util/Connection/response';

const BACKLOG = 100;

const server = net.createServer()
    .listen(data.PORT, data.IP, BACKLOG);
    
server.on('connection', socket => {
        console.log(`[SERVER] Created Server on ${data.IP}:${data.PORT}`);
        socket
            .on('data', buffer => {
                const clientRequest: request.Request = request.parseRequest(buffer.toString());
                socket.write(response.compileResponse({
                    protocol: 'HTTP/1.1',
                    headers: new Map(),
                    status: 'OK',
                    statusCode: 200,
                    body: `<html><body>[Server] Request: ${clientRequest.body}</body></html>`
                }));
                socket.end();
            })
    });