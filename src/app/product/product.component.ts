import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../service/product.service';
import { AddProductComponent } from '../shared/components/add-product/add-product.component';

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  hsn: string;
  tax_id: number;
  mou_id: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList: ProductDTO[] = [];
  displayedColumns: string[] = ['name', 'description', 'hsn', 'tax_id', 'mou_id', 'action'];
  dataSource = new MatTableDataSource<ProductDTO>(this.productList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getAllProduct().subscribe(
      (s: any) => {
        console.log(s);
       this.productList = s;
       this.dataSource.data = this.productList;
      },
      (e) => {
        console.log(e);

      }
    )
  }

  openDialog() {
    this.dialog.open(AddProductComponent,{
      data: { update: false, data: null }
    }).afterClosed().subscribe(r => {
      this.getProductList();
    });;
  }

  updateProduct(id: number) {
    const clientData = this.productList.filter(c=> c.id == id);
    this.dialog.open(AddProductComponent,{
      data: { update: true, data: clientData[0] }
    }).afterClosed().subscribe(r => {
      this.getProductList();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
