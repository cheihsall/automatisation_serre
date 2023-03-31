






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
