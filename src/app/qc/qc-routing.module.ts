import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintQcComponent } from './print-qc/print-qc.component';
import { QcComponent } from './qc.component';


const routes: Routes = [
  { path:'', component: QcComponent },
  {
    path:'qc-print/:id', component: PrintQcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QcRoutingModule { }
