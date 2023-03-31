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
      client.emit('idBcarte', this.data);
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
