import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

const URI = 'wss://api.bitfinex.com/ws';

@Injectable()
export class CurrencyService {

  private socket: WebSocket;
  private prices: number[] = [];
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

    this.prices$ = Observable.create(this.socketMessage.bind(this));
  }

  private socketMessage(observer: Observer<number[]>) {

    this.socket.onmessage = (event: MessageEvent) => {

      const data: any = JSON.parse(event.data);

      if (data[7]) {
        const lastPrice: number = data[7];

        this.prices.unshift(lastPrice);

        observer.next(this.prices);
      }

    };

  }

}
