import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MouRoutingModule } from './mou-routing.module';
import { MouComponent } from './mou.component';


@NgModule({
  declarations: [MouComponent],
  imports: [
    CommonModule,
    MouRoutingModule
  ]
})
export class MouModule { }
