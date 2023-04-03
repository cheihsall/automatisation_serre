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
  path: '/dev/ttyUSB0',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', (data) => {
  console.log(data);
});
//
port.write('cool');
parser.write('cool');
/* FIN code connection port serial esp32 */

@WebSocketGateway({ cors: true })
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  data = 'hello khadija ewl';
  logger = new ConsoleLogger();
  fanOn = '0';
  @WebSocketServer()
  public server: Server;
  public socket: Socket;

  constructor(
    @InjectModel(Parametres.name)
    private parametresModel: Model<ParametresDocument>,
  ) { }

  handleDisconnect() {
    console.log('disconnect');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Connexion Websocket');

    client.on('allumer', (data: any) => {
      console.log(data);
    });
    //FADEL DEBUT

    const date = new Date();
    const jour = date.getDate();
    const mois = date.getMonth() + 1;
    const annee = date.getFullYear();
    const heure = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const temperature = 30;
    const humidite = 20;
    const humidite_sol = 80;
    const lumiere = 10;
    client.on('fanOn', (onData) => {
      //port.write(onData);
      this.fanOn = onData;
      /*port.drain((err) => {
        console.log(err);
      });*/
    });
    client.on('fanOff', (offData) => {
      this.fanOn = offData;
      //port.write(offData);
      /*port.drain((err) => {
        console.log(err);
      });*/
    });

    parser.on('data', (data) => {
      //port.write('cool');
      //console.log(data);
      port.write(this.fanOn);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      port.drain((err) => {
        //console.log(err);
      });
      this.logger.log(this.fanOn);
      const param = {
        temperature: data.split('/')[0],
        humidite: data.split('/')[1],
        humidite_sol: data.split('/')[2],
        lumiere: data.split('/')[3],
      };
      console.log(data);
      
      client.emit('connection', param);
      const fullDate = `${jour}/${mois}/${annee}`;
      if (heure == 8 && minutes == 0 && seconds == 0) {
        const createdparam = new this.parametresModel({
          '8h': {
            temperature: temperature,
            humidite: humidite,
            humidite_sol: '--',
            lumiere: '--',
          },
          '12h': {
            temperature: '--',
            humidite: '--',
            humidite_sol: '--',
            lumiere: '--',
          },
          '19h': {
            temperature: '--',
            humidite: '--',
            humidite_sol: '--',
            lumiere: '--',
          },
          temperature: temperature,
          humidite: humidite,
          humidite_sol: humidite_sol,
          lumiere: lumiere,
          date: fullDate,
          heure: `${heure}:${minutes}:${seconds}`,
          moyenne: { temperature, humidite },
        });
        createdparam.save();
        client.emit('connection', 'enregistrement dans la base de données');
      }
      if (heure == 8 && minutes == 0 && seconds == 0) {
        this.parametresModel
          .updateOne(
            { date: fullDate },
            {
              '12h16': {
                temperature: temperature,
                humidite: humidite,
                humidite_sol: humidite_sol,
                lumiere: lumiere,
              },
            },
          )
          .then((data) => {
            console.log(data);
          });
        client.emit('connection', 'enregistrement dans la base de données');
      }
      if (heure == 12 && minutes == 0 && seconds == 0) {
        this.parametresModel
          .updateOne(
            { date: fullDate },
            {
              '12h17': {
                temperature: temperature,
                humidite: humidite,
                humidite_sol: humidite_sol,
                lumiere: lumiere,
              },
            },
          )
          .then((data) => {
            console.log(data);
          });
        client.emit('connection', 'enregistrement dans la base de données');
      }
      if (heure == 19 && minutes == 0 && seconds == 0) {
        this.parametresModel
          .updateOne(
            { date: fullDate },
            {
              '12h18': {
                temperature: temperature,
                humidite: humidite,
                humidite_sol: humidite_sol,
                lumiere: lumiere,
              },
            },
          )
          .then((data) => {
            console.log(data);
          });
        client.emit('connection', 'enregistrement dans la base de données');
      }
    });
    //FIN FADEL

    //DEBUT CHEIKH
    /* setInterval(() => {
      client.emit('idcvddarte', this.data);
    }, 5000); */
    //FIN CHEIKH

    //DEBUT JOSEPHINE
    client.on('systeme', (data: any) => {
      console.log(data);
      if (data == 'arroser') {
        /*   console.log('arduino arrose les plante'); */
      }
      if (data == 'arreter') {
        /*  console.log('arduino arrete  darroser les plante'); */
      }
    });

    //FIN JOSEPHINE

    //DEBUT KHADIJA
    client.on('KHADIJA', (data: any) => {
      console.log(data);
    });
    parser.on('data', (data)=> {
      const param = {
        temperature: data.split('/')[0],
        humidite: data.split('/')[1],
        humidite_sol: data.split('/')[2],
        lumiere: data.split('/')[3],
      };
      client.emit('connecte', param);
    });
  }
  //FIN KHADIJA
  /*  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  } */
}
