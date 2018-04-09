import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';

import { CurrencyService } from './shared/currency.service';

import { CurrencyComponent } from './currency.component';

@NgModule({
  imports: [
    CommonModule,
    CurrencyRoutingModule
  ],
  declarations: [CurrencyComponent],
  providers: [CurrencyService]
})
export class CurrencyModule { }
