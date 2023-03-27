import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private socket: Socket) {  }
  allumer() {
    this.socket.emit('allumer', true)
  }
}
