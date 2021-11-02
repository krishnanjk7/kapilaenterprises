import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '../shared/shared.module';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';


@NgModule({
  declarations: [InvoiceComponent, PrintInvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule
  ]
})
export class InvoiceModule { }
