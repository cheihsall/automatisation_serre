






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
  data = 'kjjhgf';
  @WebSocketServer()
  server: Server;


  handleDisconnect() {
    console.log('disconnect');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Connexion Websocket') 
   
    client.on('systeme', (data: any) => {
      client.emit('idcarte', this.data);
    }, 5000);
    client.on('allumer', (data: any) => {
      console.log(data);
      if (data == 'arroser'){
      /*   console.log('arduino arrose les plante'); */
        
      }
      if (data == 'arreter'){
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
