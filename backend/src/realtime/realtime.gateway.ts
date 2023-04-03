import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import {
  Parametres,
  ParametresDocument,
} from 'src/parametres/entities/parametre.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { ConsoleLogger } from '@nestjs/common';

const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', (data) => {
  console.log(data);
});


/* FIN code connection port serial esp32 */

@WebSocketGateway({ cors: true })
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  data = 'hello khadija ewl';
  logger = new ConsoleLogger();
  systeme = '1';
  @WebSocketServer()
  public server: Server;
  public socket: Socket;

  constructor(
    @InjectModel(Parametres.name)
    private parametresModel: Model<ParametresDocument>,
  ) {}

  handleDisconnect() {
    console.log('disconnect');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Connexion Websocket');


    setInterval(() => {
      client.emit('idcvddarte', this.data);
    }, 1000);

    /* partie joséphine */
    client.on('systeme', (data: any) => {
      console.log(data);
      if (data == '1') {
        //this.systeme = onData;
        parser.on('data',(data)=>{
          port.write(this.systeme);
          })
      }
      this.logger.log(this.systeme);
      if (data == '2') {
        parser.on('data',(data)=>{
          port.write(this.systeme);
          })
        /*  console.log('arduino arrete  darroser les plante'); */
      }
    });


  




    
/* Fin partie Joséphine */
    client.on('request', (data: any) => {
      console.log(data);
    });
  }

  /*  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  } */
}
