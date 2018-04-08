import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';

import { CurrencyComponent } from './currency.component';

@NgModule({
  imports: [
    CommonModule,
    CurrencyRoutingModule
  ],
  declarations: [CurrencyComponent]
})
export class CurrencyModule { }
