import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', (data) => {
  console.log(data);
});
/* FIN code connection port serial esp32 */

@WebSocketGateway({ cors: true, namespace: 'parametres' })
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  data = 'hello khadija ewl';
  logger = new ConsoleLogger();
  systemeON = '1';
  systemeOff = '0';
  ToitOuvert = '2';
  ToitFermer = '3';
  @WebSocketServer()
  public server: Server;
  public socket: Socket;
  //private parser: ReadlineParser;
  constructor(
    @InjectModel(Parametres.name)
    private parametresModel: Model<ParametresDocument>,
  ) {
    parser.on('data', (data) => {
      console.log(data);

      const date = new Date();
      const jour = date.getDate();
      const mois = date.getMonth() + 1;
      const annee = date.getFullYear();
      const heure = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const fullDate = `${jour}/${mois}/${annee}`;
      const temperature = data.split('/')[0];
      const humserre = data.split('/')[1];
      const humidite_sol = data.split('/')[2];
      const lumiere = data.split('/')[3];
      if (heure == 1 && minutes == 54 && seconds == 30) {
        const createdparam = new this.parametresModel({
          temperature: temperature,
          humidite: humserre,
          humidite_sol: humidite_sol,
          lumiere: lumiere,
          date: fullDate,
          heure: `${heure}:${minutes}:${seconds}`,
          moyenne: { temperature, humserre },
        });
        createdparam.save();
        console.log('les donnees de 8h sont inserer avec succes');
      }
      if (heure == 10 && minutes == 38 && seconds == 0) {
        const createdparam = new this.parametresModel({
          temperature: temperature,
          humserre: humserre,
          humidite_sol: humidite_sol,
          lumiere: lumiere,
          date: fullDate,
          heure: `${heure}:${minutes}:${seconds}`,
          moyenne: { temperature, humserre },
        });
        createdparam.save();
        console.log('les donnees de 12h sont inserer avec succes');
      }
      if (heure == 10 && minutes == 51 && seconds == 0) {
        const createdparam = new this.parametresModel({
          temperature: temperature,
          humserre: humserre,
          humidite_sol: humidite_sol,
          lumiere: lumiere,
          date: fullDate,
          heure: `${heure}:${minutes}:${seconds}`,
          moyenne: { temperature, humserre },
        });
        createdparam.save();
        console.log('les donnees de 18h sont inserer avec succes');
      }
    });
  }

  handleDisconnect() {
    console.log('disconnect');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    //

    console.log('Connexion Websocket');

    client.on('allumer', (data: any) => {
      console.log(data);
    });
    //FADEL DEBUT

    //FIN FADEL

    //DEBUT CHEIKH
    setInterval(() => {
      client.emit('idcvddarte', this.data);
    }, 5000);
    //FIN CHEIKH

    //DEBUT JOSEPHINE
    client.on('systeme', (data: any) => {
      console.log(data);
      /* debut extracteur */
      if (data == '1') {
        port.write(this.systemeON);
      }

      this.logger.log(this.systemeON);
      if (data == '0') {
        port.write(this.systemeOff);
      }
      /* Fin extracteur */

      /* debut Toit */
      if (data == '2') {
        port.write(this.ToitOuvert);
      }
      this.logger.log(this.ToitOuvert);
      if (data == '3') {
        port.write(this.ToitFermer);
      }
      //this.logger.log(this.ToitFermer);
    });

    //FIN JOSEPHINE

    //DEBUT KHADIJA
    parser.on('data', (data) => {
      const parame = {
        temperature: data.split('/')[0],
        humidite: data.split('/')[1],
        humidite_sol: data.split('/')[2],
        lumiere: data.split('/')[3],
      };
      client.emit('connecte', parame);
    });
  }
  //FIN KHADIJA
}

/* handleDisconnect() {
    console.log('Socket déconnecté');
  }

 

/*  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  } */
