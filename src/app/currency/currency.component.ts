import { Component, OnInit } from '@angular/core';

import { CurrencyService } from './shared/currency.service';

@Component({
  selector: 'bfx-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  constructor(public currency: CurrencyService) { }

  ngOnInit() {
  }

}
