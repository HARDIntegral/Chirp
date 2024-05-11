import * as net from 'net';

import * as input from '../IO/input';
import * as response from '../../../Util/Connection/response';

export async function sendMessage(socket: net.Socket): Promise<void> {
    const userInput: string = await input.getInput();

    // checks for kill statement
    if (userInput == 'exit()') {
        socket.write(response.compileResponse({
            protocol: 'HTTP/1.1',
            status: 'OK',
            statusCode: 200,
            body: `<html><body><div id="client_msg">SOCKETKILL</div></body></html>`
        }));
    } else {
        const socketResponse = response.compileResponse({
            protocol: 'HTTP/1.1',
            status: 'OK',
            statusCode: 200,
            body: `<html><body><div id="client_msg">${userInput}</div></body></html>`
        });
        socket.write(socketResponse);
    }  
}