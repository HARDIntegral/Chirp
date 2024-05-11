import * as net from 'net';

import * as response from '../../../Util/Connection/response';

export function sendReady(socket: net.Socket) {
    socket.write(response.compileResponse({
        protocol: 'HTTP/1.1',
        status: 'OK',
        statusCode: 200,
        body: '<html><body><div id="msg_accept_ready">READY</div></body></html>'
    }));
} 