






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

  handleDisconnect(client: any) {
    throw new Error('Method not implemented.');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
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
