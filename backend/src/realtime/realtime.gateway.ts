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
  try {
    const json = JSON.parse(data);
    console.log(json.idcarte);
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
  fanOn = '0';
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
      if (heure == 13 && minutes == 4 && seconds == 10) {
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrr');
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

      if (heure == 12 && minutes == 56 && seconds == 10) {
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

    //setInterval(() => {
    parser.on('data', (data) => {
      try {
        const json = JSON.parse(data);
        console.log(json.idcarte);
        client.emit('idcarte', json.idcarte);
      } catch (err) {
        console.error(err);
      }
    });

    //  }, 5000);
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

/*
import { Injectable } from '@nestjs/common';
import {
  Parametres,
  ParametresDocument,
} from 'src/parametres/entities/parametre.entity';
import {
 
  OnGatewayConnection,
  
} from '@nestjs/websockets';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import * as socketio from 'socket.io';
import { CreateParametreDto } from 'src/parametres/dto/create-parametre.dto';

@Injectable()
export class ParametresService implements OnGatewayConnection {
  private port: SerialPort;
  private parser: ReadlineParser;

  constructor(
    @InjectModel(Parametres.name)
    private ParametresSchema: Model<ParametresDocument>,
  ) {
    this.port = new SerialPort({
      path: '/dev/ttyUSB0',
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
    });
    this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
  }

  async handleConnection(client: socketio.Socket, ...args: any[]) {
    console.log('Connexion Websocket');
    client.on('allumer', (data: any) => {
      console.log(data);
    });
    this.parser.on('data', (data) => {
      const capteur = data.split('/');
      console.log(capteur);
   
      const Humidite = 60;
      const temperature = 25;
      const humsol = parseInt(capteur[2]);
      console.log(humsol);
      const luminosite = parseInt(capteur[3]);
      console.log(luminosite);
      client.emit('data', { temperature, Humidite, humsol, luminosite });
      console.log('data');
      const date = new Date();
    
      const enregistrements = [
        { heure: 14, min: 5, secondes: 30 },
        { heure: 10, min: 32, secondes: 0 },
        { heure: 19, min: 0, secondes: 0 },
      ];
      console.log('enregistrements');
      for (const enregistrement of enregistrements) {
        console.log('temperature2');
        if (
          date.getHours() === enregistrement.heure &&
          date.getMinutes() === enregistrement.min &&
          date.getSeconds() === enregistrement.secondes
        ) {
          
          console.log('temperature3');
          this.create({ temperature, Humidite, humsol, luminosite });
          console.log(
            `insertion du ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          );
        }
      }
    });
  }

  create(createparametreDto: CreateParametreDto) {
    const createdparam = new this.ParametresSchema(createparametreDto);
    return createdparam.save();
  }

  findAll() {
    return this.ParametresSchema.find().exec();
  }

  findOne(id: string) {
    return this.ParametresSchema.findById(id).exec();
  }
}
*/
