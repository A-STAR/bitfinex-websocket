import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrencyService {

  private socket: WebSocket;
  prices$ = new BehaviorSubject<number[]>([]);

  constructor() { }

  initSocket() {
    this.socket = new WebSocket('wss://api.bitfinex.com/ws');

    const event = {
      event: 'subscribe',
      channel: 'ticker',
      pair: 'BTCUSD'
    };

    this.socket.onopen = () => this.socket.send(JSON.stringify(event));

    this.socketMessage();
  }

  private socketMessage() {

    this.socket.onmessage = (event: MessageEvent) => {

      const data: any = JSON.parse(event.data);

      if (data[7]) {
        const lastPrice: number = data[7];

        const prices = this.prices$.value;
        prices.unshift(lastPrice);

        this.prices$.next(prices);
      }

    };

  }

}
