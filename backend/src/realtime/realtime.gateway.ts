import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server, WebSocket } from 'ws';
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

@WebSocketGateway({ cors: true })
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
  private url = 'ws://192.168.43.68:81';
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
      const fullDate = `${annee}-${mois}-${jour}`;
      const temperature = data.split('/')[0];
      const humidite = data.split('/')[1];
      const humidite_sol = data.split('/')[2];
      const lumiere = data.split('/')[3];

      //insertion
      if (heure == 13 && minutes == 37 && seconds == 30) {
        const createdparam = new this.parametresModel({
          temperature: temperature,
          humidite: humidite,
          humidite_sol: humidite_sol,
          lumiere: lumiere,
          date: fullDate,
          heure: `${heure}:${minutes}:${seconds}`,
          moyenne: { temperature, humidite },
        });
        createdparam.save();
        console.log('les donnees de 8h sont inserer avec succes');
      }
      if (heure == 12 && minutes == 0 && seconds == 0) {
        const createdparam = new this.parametresModel({
          temperature: temperature,
          humidite: humidite,
          humidite_sol: humidite_sol,
          lumiere: lumiere,
          date: fullDate,
          heure: `${heure}:${minutes}:${seconds}`,
          moyenne: { temperature, humidite },
        });
        createdparam.save();
        console.log('les donnees de 12h sont inserer avec succes');
      }
      if (heure == 18 && minutes == 0 && seconds == 0) {
        const createdparam = new this.parametresModel({
          temperature: temperature,
          humidite: humidite,
          humidite_sol: humidite_sol,
          lumiere: lumiere,
          date: fullDate,
          heure: `${heure}:${minutes}:${seconds}`,
          moyenne: { temperature, humidite },
        });
        createdparam.save();
        console.log('les donnees de 18h sont inserer avec succes');
      }
      //client.emit('connection', 'enregistrement dans la base de données');
    });
  }

  handleDisconnect() {
    console.log('disconnect');
  }
  handleConnection(
    @ConnectedSocket() client: Socket,
    cient = new WebSocket(this.url),
  ) {
    //
    console.log('Connexion Websocket');

    client.on('allumer', (data: any) => {
      console.log(data);
    });
    //FADEL DEBUT

    cient.onopen = () => {
      console.log('WebSocket client connected');
    };
    cient.onerror = (error) => {
      console.error('WebSocket client error:', error);
    };
    cient.onmessage = (message) => {
      console.log('WebSocket client received message:', message.data);
    };

    //FIN FADEL

    //DEBUT CHEIKH

    //setInterval(() => {
    /*parser.on('data', (data) => {
      try {
        const json = JSON.parse(data);
        console.log(json.idcarte);
        client.emit('idcarte', json.idcarte);
      } catch (err) {
        console.error(err);
      }
    });*/

    //  }, 5000);
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
