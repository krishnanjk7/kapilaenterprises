import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QcRoutingModule } from './qc-routing.module';
import { QcComponent } from './qc.component';
import { PrintQcComponent } from './print-qc/print-qc.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [QcComponent, PrintQcComponent],
  imports: [
    CommonModule,
    QcRoutingModule,
    SharedModule
  ]
})
export class QcModule { }
