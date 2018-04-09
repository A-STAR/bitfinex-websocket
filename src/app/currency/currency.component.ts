import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bfx-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  socket: WebSocket;
  prices: number[] = [];

  constructor() { }

  ngOnInit() {
    this.initSocket();

    this.socketMessage();
  }

  private initSocket() {
    this.socket = new WebSocket('wss://api.bitfinex.com/ws');

    const event = {
      event: 'subscribe',
      channel: 'ticker',
      pair: 'BTCUSD'
    };

    this.socket.onopen = () => this.socket.send(JSON.stringify(event));
  }

  private socketMessage() {

    this.socket.onmessage = (event: MessageEvent) => {

      const data: any = JSON.parse(event.data);

      if (data[7]) {
        const lastPrice: number = data[7];

        this.prices.unshift(lastPrice);
      }

    };

  }

}
