import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

Temperature: any;
luminosite: any;
humsol : any;
humserre: any;
  endpoint: any;
  httpClient: any;
  constructor(private socket: Socket, private http: HttpClient, private route: Router) {  }
  allumer() {
    this.socket.emit('allumer', true)
  }
realtime(){
  return new Observable( observer => {
    this.socket.on('connection',(data:any) => {
     observer.next(data);
        })
   })

}

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

  login_nfc() {
    return new Observable(observer => {
      this.socket.on('idcarte', (data: unknown) => {
        observer.next(data);


      });
    });
     }

login(user: any) {
    return this.http.post('http://localhost:3001/auth/login', user);
  }

  getUser() {
    console.log(localStorage.getItem('token'));

    return this.http.get('http://localhost:3001/auth/profile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      }
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }

  webserial() {
    return this.http.get('http://192.168.43.68:80');
  }
  updatePassword(id: any, data: any): Observable<any> {
    console.log(id);

    console.log(data);

    let API_URL = `${this.endpoint}/${id}`;

    return this.http.patch(`http://localhost:3001/donnees/${id}`, {"actuelPass": data.actuelPass,
  "newPass":data.newPass})
  }
}

