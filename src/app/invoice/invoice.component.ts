import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '../service/invoice.service';
import { AddInvoiceComponent } from '../shared/components/add-invoice/add-invoice.component';

export interface InvoiceDTO {
  id: number;
  client_id: number;
  invoice_no: number;
  invoice_date: string;
  grand_total: number;
  client_name: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, AfterViewInit {

  invoiceList: InvoiceDTO[] = [];
  displayedColumns: string[] = ['invoice_no', 'client_name', 'invoice_date',  'grand_total', 'action'];
  dataSource = new MatTableDataSource<InvoiceDTO>(this.invoiceList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private invoiceService: InvoiceService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getInvoiceList();
  }

  openDialog() {
    this.dialog.open(AddInvoiceComponent,{
      data: { update: false, data: null }
    }).afterClosed().subscribe(r => {
      this.getInvoiceList();
    });;
  }


  getInvoiceList() {
    this.invoiceService.getAllInvoice().subscribe(
      (s: any) => {
       this.invoiceList = s;
       this.dataSource.data = this.invoiceList;
       this.cd.detectChanges();
      },
      (e) => {
        console.log(e);

      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateInvoice(id,i) {
    
    this.dialog.open(AddInvoiceComponent,{
      data: { update: true, data: this.invoiceList[i] }
    }).afterClosed().subscribe(r => {
      this.getInvoiceList();
    });;
  }
}
