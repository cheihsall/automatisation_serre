import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {


  endpoint: any;
  httpClient: any;
  constructor(private socket: Socket, private http: HttpClient, private route: Router) {  }
  allumer() {
    this.socket.emit('allumer', true)
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

}

