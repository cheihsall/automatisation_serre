import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private socket: Socket) {  }
  arroser() {
    this.socket.emit('systeme', 'arroser')
  }
  arreter() {
    this.socket.emit('systeme', 'arreter')
  }
  arroseTomate(){
    this.socket.emit('systeme', 'arrosage des Tomates')
  }
  arretomate(){
    this.socket.emit('systeme', 'arret arrosage  Tomates')
  }
  arroseOignon() {
    this.socket.emit('systeme', 'arrosage des Oignons' )
  }
  arretOignon() {
    this.socket.emit('systeme', 'arret arrosage Oignons' )
  }
/* pour l'ouverture et la fermeture du toit */
  ouverture() {
    this.socket.emit('systeme', 'ouverture toit' )
  }
  Fermeture() {
    this.socket.emit('systeme', 'Fermeture toit' )
  }
  /* pour extracteur d'aire */
  Allumer() {
    this.socket.emit('systeme', 'Extracteur Allumé' )
  }
  Eteindre() {
    this.socket.emit('systeme', 'Extracteur éteinte' )
  }
 
}
