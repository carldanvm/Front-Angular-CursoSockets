import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socketStatus = false
  public usuario!: Usuario

  constructor( private socket: Socket) { 

    this.checkStatus()
  }

  checkStatus(){
    
    this.socket.on('connect', () => {
      console.log('Conectado al servidor')
      this.socketStatus = true
    })

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor')
      this.socketStatus = false
    })

  }

  emit(evento: string, payload?: any, callback?: Function){
    this.socket.emit(evento, payload, callback)
  }

  listen(evento: string){
    return this.socket.fromEvent(evento)
  }

  loginWS(nombre: string){
    
    this.emit('configurar-usuario', { nombre }, (resp: any) => {
      
      console.log(resp);
      
    })

  }

}
