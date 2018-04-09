import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map } from 'rxjs/operators/map';

const URI = 'wss://api.bitfinex.com/ws';

@Injectable()
export class CurrencyService {

  private socket: WebSocket;
  private data: number[] = [];
  private data$: Observable<number[]>;
  prices$: Observable<number[]>;

  constructor() { }

  initSocket() {
    this.socket = new WebSocket(URI);

    const event = {
      event: 'subscribe',
      channel: 'ticker',
      pair: 'BTCUSD'
    };

    this.socket.onopen = () => this.socket.send(JSON.stringify(event));

    this.data$ = Observable.create(this.socketMessage.bind(this));

    this.prices$ = this.data$.pipe(
      map((response: any[]) => response.filter(data => data[7])),
      map((response: any[]) => response.map(data => data[7]))
    );
  }

  private socketMessage(observer: Observer<number[]>) {

    this.socket.onmessage = (event: MessageEvent) => {

      const data: any = JSON.parse(event.data);

      this.data.unshift(data);

      observer.next(this.data);

    };

  }

}
