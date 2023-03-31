






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

/* import { SerialPort } from 'serialport';
const {Readline } = require('@serialport/parser-readline')
export const RealtimeService= () => {
  const port = new SerialPort(
 
    {
      path: '/dev/ttyACM0', baudRate: 9600
    },
    (err) => {
      if (err) {
        console.error(err)
        
        
      }
      console.log('success')
    },
  );
  
  const parser = new Readline({ delimiter: '\r\n' });
  
  port.pipe(parser);

 
  parser.on('data', (data) => {
    console.log(data);
   
  })
  
} */
  
/* const SerialPort = require('serialport'); */



@WebSocketGateway({ cors: true })
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  data = 'hello khadija ewl';
  @WebSocketServer()
  server: Server;

  

  handleDisconnect(client: any) {
    throw new Error('Method not implemented.');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Connexion Websocket') 
    setInterval(() => {
      
      client.emit('parametre', this.data);
    }, 1000);
    client.on('systeme', (data: any) => {
      console.log(data);
      if (data == 'arroser'){
      /*   console.log('arduino arrose les plante'); */
        
      }
      if (data == 'arreter'){
       /*  console.log('arduino arrete  darroser les plante'); */
        
      }
    });
   
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
