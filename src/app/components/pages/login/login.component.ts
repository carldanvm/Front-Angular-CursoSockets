import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';

  constructor(public wsService: WebsocketService) { }

  ingresar() {
    this.wsService.loginWS(this.nombre);
    this.nombre = '';
  }
}
