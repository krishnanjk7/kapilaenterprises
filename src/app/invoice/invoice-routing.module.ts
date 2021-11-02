import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';


const routes: Routes = [
  {
    path:'', component: InvoiceComponent
  },
  {
    path:'invoice-print/:id/:type', component: PrintInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
