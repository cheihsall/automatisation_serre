import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';

import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';


/* code connection port serial esp32 */

const port = new SerialPort({
  path: '/dev/ttyUSB0',
  baudRate: 115200,

});
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
  parser.on('data', (data) => {
    console.log(data);
   
  })

port.write('cool');
parser.write('cool');
/* FIN code connection port serial esp32 */
  





@WebSocketGateway({ cors: true })
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  data = 'kjjhgf';
  @WebSocketServer()
  server: Server;

  handleDisconnect() {
    console.log('disconnect');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Connexion Websocket');

    setInterval(() => {
      client.emit('idcavrte', this.data);
    }, 5000);
    client.on('systeme', (data: any) => {
      console.log(data);
      if (data == 'arroser') {
        /*   console.log('arduino arrose les plante'); */
      }
      if (data == 'arreter') {
        /*  console.log('arduino arrete  darroser les plante'); */
      }
    });

    client.on('request', (data: any) => {
      console.log(data);
    });
 }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
