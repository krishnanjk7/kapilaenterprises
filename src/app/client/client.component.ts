import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../service/client.service';
import { AddClientComponent } from '../shared/components/add-client/add-client.component';

export interface ClientDTO {
  id: number;
  name: string;
  holder_name: string;
  email: string;
  mobile: string;
  address: string;
  gstin: string;
}


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientList: ClientDTO[] = [];
  displayedColumns: string[] = ['name', 'holder_name', 'email', 'mobile', 'address', 'gstin', 'action'];
  dataSource = new MatTableDataSource<ClientDTO>(this.clientList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClientList();
  }

  getClientList() {
    this.clientService.getAllClient().subscribe(
      (s: any) => {
        console.log(s);
       this.clientList = s;
       this.dataSource.data = this.clientList;
      },
      (e) => {
        console.log(e);

      }
    )
  }

  openDialog() {
    this.dialog.open(AddClientComponent,{
      data: { update: false, data: null }
    }).afterClosed().subscribe(r => {
      this.getClientList();
    });;
  }

  updateClient(id: number) {
    const clientData = this.clientList.filter(c=> c.id == id);
    this.dialog.open(AddClientComponent,{
      data: { update: true, data: clientData[0] }
    }).afterClosed().subscribe(r => {
      this.getClientList();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
