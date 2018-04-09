import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment';

@Injectable()
export class WebSocketService {

  private socket: WebSocket;

  constructor() { }

  connect(message): Subject<MessageEvent> {
    this.socket = new WebSocket(environment.ws);

    this.socket.onopen = () => this.socket.send(JSON.stringify(message));

    const observable$: Observable<MessageEvent> = Observable.create(this.message.bind(this));

    const observer = {
      next(data: Object) {
        this.socket.send(JSON.stringify(data));
      }
    };

    return Subject.create(observer, observable$);
  }

  private message(observer: Observer<MessageEvent>) {
    this.socket.onmessage = (message: MessageEvent) => observer.next(message);
  }

}
