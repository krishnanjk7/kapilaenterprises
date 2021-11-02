import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';

import { AddClientComponent } from './components/add-client/add-client.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { HeaderComponent } from './components/header/header.component';
import { AddQcComponent } from './components/add-qc/add-qc.component';

const matModules = [
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatGridListModule,
  MatListModule,
  MatDividerModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatRadioModule
];

@NgModule({
  declarations: [
    AddClientComponent,
    AddProductComponent,
    AddInvoiceComponent,
    HeaderComponent,
    AddQcComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    matModules,
    RouterModule
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    matModules,
    AddClientComponent,
    HeaderComponent,
    AddQcComponent
  ],
  entryComponents: [
    AddClientComponent,
    AddProductComponent,
    AddInvoiceComponent,
    HeaderComponent,
    AddQcComponent
  ]
})
export class SharedModule { }
