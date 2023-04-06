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

  realtime(){
    return new Observable( observer => {
      this.socket.on('connecte',(data:any) => {
       observer.next(data);
          })
     })

  }
  //JOSEPHINE
  arroser() {
    this.socket.emit('systeme', '4')
  }
  arreter() {
    this.socket.emit('systeme', '5')
  }
  arroseTomate(){
    this.socket.emit('systeme', '6')
  }
  arretomate(){
    this.socket.emit('systeme', '7')
  }
  arroseOignon() {
    this.socket.emit('systeme', '8' )
  }
  arretOignon() {
    this.socket.emit('systeme', '9' )
  }
/* pour l'ouverture et la fermeture du toit */
  ouverture() {
    this.socket.emit('systeme', '2' )
  }
  Fermeture() {
    this.socket.emit('systeme', '3' )
  }
  /* pour extracteur d'aire */
  Allumer() {
    this.socket.emit('systeme', '1' )
  }
  Eteindre() {
    this.socket.emit('systeme', '0' )
  }

  //FIN JOSEPHINE SOCKET

  //CHEIKH SOCKET

  login_nfc() {
    return new Observable(observer => {
      this.socket.on('idcarte', (data: unknown) => {
        observer.next(data);


      });
    });
     }
//FIN CHEIKH SOCKET

//FADEL SOCKET

//FIN FADEL SOCKET

//KHADIJA SOCKET


//FINKHADIJASOCKET

login(user: any) {
    return this.http.post('http://localhost:3000/auth/login', user);
  }

  getUser() {
    console.log(localStorage.getItem('token'));

    return this.http.get('http://localhost:3000/auth/profile', {
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

  updatePassword(email: any, data: any): Observable<any> {
console.log(data.newPass);
const donnee = { "newPassword": data.newPass, "password": data.actuelPass }
console.log(donnee);
    return this.http.patch(`http://localhost:3000/donnees/${email}`,  donnee , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

  }

}

