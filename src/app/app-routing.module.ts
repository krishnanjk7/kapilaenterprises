import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'client', loadChildren: './client/client.module#ClientModule'
  },
  {
    path: 'product', loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'invoice', loadChildren: './invoice/invoice.module#InvoiceModule'
  },
  {
    path: 'qc', loadChildren: './qc/qc.module#QcModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
