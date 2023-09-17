import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  messageSubscription!: Subscription

  mensajes: any[] = [];

  constructor(public chatService: ChatService) {

  }

  ngOnInit(): void {

    this.messageSubscription = this.chatService.getMessages().subscribe(msg => {

      this.mensajes.push(msg);

      setTimeout(() => {
        var elem = document.getElementById('chat-mensajes');
        if (elem) {
          elem.scrollTop = elem.scrollHeight;
        }
      }, 0);

    })
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  enviar() {

    if(this.texto.trim().length === 0) {
      return;
    }

    this.chatService.sendMessage(this.texto);

    this.texto = '';


  }
}

