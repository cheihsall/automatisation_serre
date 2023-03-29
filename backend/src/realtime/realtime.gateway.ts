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
  data = 'hello khadija ewl';
  @WebSocketServer()
  server: Server;

  handleDisconnect() {
    console.log('disconnect');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    setInterval(() => {
      client.emit('parametre', this.data);
    }, 1000);
    client.on('allumer', (data: any) => {
      console.log(data);
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
