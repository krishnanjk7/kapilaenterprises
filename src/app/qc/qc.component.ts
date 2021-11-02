import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QcService } from '../service/qc.service';
import { AddQcComponent } from '../shared/components/add-qc/add-qc.component';

export interface QcDTO {
  id: number;
  client_id: number;
  qc_no: number;
  qc_date: string;
  grand_total: number;
  client_name: string;
}

@Component({
  selector: 'app-qc',
  templateUrl: './qc.component.html',
  styleUrls: ['./qc.component.scss']
})
export class QcComponent implements OnInit, AfterViewInit {

  qcList: QcDTO[] = [];
  displayedColumns: string[] = ['qc_no', 'client_name', 'qc_date',  'grand_total', 'action'];
  dataSource = new MatTableDataSource<QcDTO>(this.qcList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private qcService: QcService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getQcList();
  }

  openDialog() {
    this.dialog.open(AddQcComponent,{
      data: { update: false, data: null }
    }).afterClosed().subscribe(r => {
      this.getQcList();
    });;
  }


  getQcList() {
    this.qcService.getAllQc().subscribe(
      (s: any) => {
       this.qcList = s;
       this.dataSource.data = this.qcList;
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

  updateQc(id,i) {
    this.dialog.open(AddQcComponent,{
      data: { update: true, data: this.qcList[i] }
    }).afterClosed().subscribe(r => {
      this.getQcList();
    });;
  }


}
