import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, filter, scan } from 'rxjs/operators';

import { WebSocketService } from '../../core/websocket.service';

@Injectable()
export class CurrencyService {

  private messages$: Subject<any>;
  prices$: Observable<number[]>;

  constructor(private ws: WebSocketService) {
    this.init();
  }

  init() {
    const message = {
      event: 'subscribe',
      channel: 'ticker',
      pair: 'BTCUSD'
    };

    this.messages$ = this.ws.connect(message);

    this.prices$ = this.messages$.pipe(
      map((event: MessageEvent) => JSON.parse(event.data)),
      filter((data: any) => data[7] ? true : false),
      map((data: any[]) => data[7]),
      scan((prices: number[], price: number) => [price, ...prices], [])
    );
  }

  send(message: Object) {
    this.messages$.next(message);
  }

}
