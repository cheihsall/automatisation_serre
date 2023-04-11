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

parser.on('data', (data) => {
  try {
    const json = JSON.parse(data);
    console.log(json);
  } catch (err) {
    console.error(err);
  }
});
//
//port.write('cool');
//parser.write('cool');
/* FIN code connection port serial esp32 */

@WebSocketGateway({ cors: true })
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  data = 'hello khadija ewl';
  logger = new ConsoleLogger();
  @WebSocketServer()
  public server: Server;
  public socket: Socket;
  private url = 'ws://192.168.43.68:81';
  constructor(
    @InjectModel(Parametres.name)
    private parametresModel: Model<ParametresDocument>,
  ) {
    parser.on('data', (data) => {
      try {
        //console.log(data);

        const json = JSON.parse(data);
        const date = new Date();
        const jour = date.getDate();
        const mois = date.getMonth() + 1;
        const annee = date.getFullYear();
        const heure = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const fullDate = `${annee}-${mois}-${jour}`;

        const temperature = json.Temperature;
        const humidite = json.Humidite;
        const humidite_sol = json.HumiditeSol;
        const lumiere = json.Luminosite;

        //insertion
        if (heure == 10 && minutes == 39 && seconds == 30) {
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
      } catch (err) {
        console.error(err);
      }
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
    const msg = 'hello c chikh';
    cient.onopen = () => {
      console.log('WebSocket client connected');
      cient.send(msg);
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
    parser.on('data', (data) => {
      try {
        const json = JSON.parse(data);
        //console.log(json.Rfid);
        if (json.idcarte != '') {
          client.emit('idcarte', json.idcarte);
        }
      } catch (err) {
        console.error(err);
      }
    });

    //  }, 5000);
    //FIN CHEIKH

    //DEBUT JOSEPHINE
    client.on('systeme', (data: any) => {
      //console.log(data);
      /* debut extracteur */
      if (data == '1') {
        const data = {
          extracteur: 1,
          toiture: 0,
          arrosage: 0,
        };
        //console.log(data)
        const jsonData = JSON.stringify(data);
        port.write(jsonData);

        // port.write(this.systemeON);
      }

      if (data == '0') {
        const data = {
          extracteur: 0,
          toiture: 0,
          arrosage: 0,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);

        //port.write(this.systemeOff);
      }
      /* Fin extracteur */

      /* debut Toit */
      if (data == '2') {
        const data = {
          extracteur: 0,
          toiture: 2,
          arrosage: 0,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        // port.write(this.ToitOuvert);
      }
      //this.logger.log(this.ToitOuvert);
      if (data == '3') {
        const data = {
          extracteur: 0,
          toiture: 3,
          arrosage: 0,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        //port.write(this.ToitFermer);
      }

      //this.logger.log(this.ToitFermer);
      if (data == '4') {
        const data = {
          extracteur: 0,
          toiture: 0,
          arrosage: 4,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        //port.write(this.ToitFermer);
      }
      if (data == '5') {
        const data = {
          extracteur: 0,
          toiture: 0,
          arrosage: 5,
        };

        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        //port.write(this.ToitFermer);
      }
      if (data == '6') {
        const data = {
          extracteur: 0,
          toiture: 0,
          arrosage: 6,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        // this.logger.log(data);

        //port.write(this.ToitFermer);
      }

      if (data == '7') {
        const data = {
          extracteur: 0,
          toiture: 0,
          arrosage: 7,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        // this.logger.log(data);

        //port.write(this.ToitFermer);
      }

      if (data == '8') {
        const data = {
          extracteur: 0,
          toiture: 0,
          arrosage: 8,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        //port.write(this.ToitFermer);
      }

      if (data == '9') {
        const data = {
          extracteur: 0,
          toiture: 0,
          arrosage: 9,
        };
        const jsonData = JSON.stringify(data);
        port.write(jsonData);
        //port.write(this.ToitFermer);
      }
    });

    //FIN JOSEPHINE

    //DEBUT KHADIJA
    parser.on('data', (data) => {
      try {
        const json = JSON.parse(data);

        // console.log(json);
        const parame = {
          temperature: json.Temperature,
          humidite: json.Humidite,
          humidite_sol: json.HumiditeSol,
          lumiere: json.Luminosite,
          etatvent: json.etatvent,
          etattoit: json.etatoit,
          etatpompe: json.etatpompe,
          insecte: json.insecte,
        };
        client.emit('connecte', parame);
      } catch (err) {
        console.error(err);
      }
    });
  }
  //FIN KHADIJA
}
