import { Injectable } from '@nestjs/common';
import { Parametres, ParametresDocument } from './entities/parametre.entity';
import {
  // ConnectedSocket,
  OnGatewayConnection,
  //ConnectedSocket,
  // OnGatewayConnection,
  // OnGatewayDisconnect,
  // SubscribeMessage,
  // WebSocketGateway,
  //WebSocketServer,
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
  //insertion bdd
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
      //const temperature = parseInt(capteur[0]);
      //console.log(temperature);
      // const Humidite = parseInt(capteur[1]);
      // console.log(Humidite);
      const Humidite = 60;
      const temperature = 25;
      const humsol = parseInt(capteur[2]);
      console.log(humsol);
      const luminosite = parseInt(capteur[3]);
      console.log(luminosite);
      client.emit('data', { temperature, Humidite, humsol, luminosite });
      console.log('data');
      const date = new Date();
      // inserer
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
          /* if (
            !isNaN(temperature) &&
            !isNaN(Humidity) &&
            !isNaN(humsol) &&
            !isNaN(luminosite)
          ) { */
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