import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/service/client.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { LookupService } from 'src/app/service/lookup.service';
import { ProductService } from 'src/app/service/product.service';
import { QcService } from 'src/app/service/qc.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { AddProductComponent } from '../add-product/add-product.component';

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  hsn: string;
  tax_id: number;
  mou_id: string;
}

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
  selector: 'app-add-qc',
  templateUrl: './add-qc.component.html',
  styleUrls: ['./add-qc.component.scss']
})
export class AddQcComponent implements OnInit {

  addInvoiceForm = new FormGroup({
    client_id: new FormControl('', Validators.required),
    qc_date: new FormControl('', Validators.required),
    remarks: new FormControl(''),
    sub_total: new FormControl('', Validators.required),
    round_off: new FormControl('', Validators.required),
    grand_total: new FormControl('', Validators.required)
  });

  addProductForm = new FormGroup({
    prod_id: new FormControl('', Validators.required),
    prod_name: new FormControl('', Validators.required),
    prod_mou: new FormControl('', Validators.required),
    prod_mou_name: new FormControl('', Validators.required),
    prod_qty: new FormControl('', Validators.required),
    prod_rate: new FormControl('', Validators.required),
    prod_finaltotal: new FormControl('')
  });

  taxList: { id: number; name: string; sgst: number; cgst: number; igst: number; remarks: string; }[] = [];
  mouList: { id: number; name: string; description: string; }[] = [];
  productList: ProductDTO[] = [];
  clientList: ClientDTO[] = [];
  addedProducts = [];

  prodSubtotal = 0;
  prodFinaltotal = 0;
  roundOff = 0;
  grandTotal = 0;

  stateList: { id: number; state: string }[] = []
  districtList: { id: number; name: string; state_id: number }[] = [];
  filterDistrict: { id: number; name: string; state_id: number }[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddQcComponent>,
    @Inject(MAT_DIALOG_DATA) public matData: any,
    private lookUp: LookupService,
    private matSnackBar: MatSnackBar,
    private productService: ProductService,
    private qcService: QcService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.lookUp.getAllTax().subscribe(
      (s: any) => {
        this.taxList = s;
      },
      (e) => {

      }
    );

    this.lookUp.getAllMou().subscribe(
      (s: any) => {
        this.mouList = s;
      },
      (e) => {

      }
    );

    this.lookUp.getAllState().subscribe(
      (s: any) => {
        this.stateList = s;
      },
      (e) => {

      }
    );

    this.lookUp.getAllDistrict().subscribe(
      (s: any) => {
        this.districtList = this.filterDistrict = s;
      },
      (e) => {

      }
    );

    this.getClientList();

    this.getProductList();

    if (this.matData) {
      if (this.matData.update) {
        const cd = this.matData.data;
        console.log(cd);
        this.addInvoiceForm.patchValue({
          client_id: cd.client_id,
          qc_date: cd.qc_date,
          remarks: cd.remarks,
          sub_total: cd.sub_total,
          round_off: cd.round_off,
          grand_total: cd.grand_total
        });

        this.prodFinaltotal = cd.sub_total;
        this.roundOff = cd.round_off;
        this.grandTotal = cd.grand_total;

        this.qcService.getQcGroup(cd.id).subscribe(
          (r: any) => {
            r.forEach(s => {
              this.addedProducts.push({
                prod_id: s.product_id,
                prod_name: s.name,
                prod_mou: s.mou_id,
                prod_mou_name: s.mou_name,
                prod_qty: s.qty,
                prod_rate: s.rate,
                prod_finaltotal: s.final_total
              })
            });
          },
          (e) => {

          }
        );

      }
    }

    this.addProductForm.get('prod_qty').valueChanges.subscribe(val => {
      const rate = this.addProductForm.get('prod_rate').value;

      this.addProductForm.patchValue({
        prod_finaltotal: (rate * val).toFixed(2)
      });
    });

    this.addProductForm.get('prod_rate').valueChanges.subscribe(val => {
      const qty = this.addProductForm.get('prod_qty').value;
      this.addProductForm.patchValue({
        prod_finaltotal: (qty * val).toFixed(2)
      });
    });

  }

  getClientList() {
    this.clientService.getAllClient().subscribe(
      (s: any) => {
        this.clientList = s;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  getProductList() {
    this.productService.getAllProduct().subscribe(
      (s: any) => {
        this.productList = s;
      },
      (e) => {
        console.log(e);

      }
    )
  }

  hasError(field: string) {
    return this.addInvoiceForm.controls[field].hasError;
  }

  getErrorMessage(field: string) {
    console.log(this.addInvoiceForm.controls[field].validator['required']);
  }

  addProd() {
    this.addedProducts.push(this.addProductForm.value);

    let initialValue = 0
    initialValue = 0
    this.prodFinaltotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_finaltotal)
    }, initialValue);

    this.roundOff = Number((Math.round(this.prodFinaltotal) - this.prodFinaltotal).toFixed(2));

    this.grandTotal = this.prodFinaltotal + this.roundOff;

    this.addInvoiceForm.patchValue({
      sub_total: this.prodFinaltotal,
      round_off: this.roundOff,
      grand_total: this.grandTotal
    });

    this.addProductForm.reset();
  }

  addQc() {
    const data = { ...this.addInvoiceForm.value, products: this.addedProducts };
    this.qcService.addQc(data).subscribe(
      (s) => {
        this.matSnackBar.open('New Qc added');
        this.dialogRef.close();
      },
      (e) => {
        this.matSnackBar.open('Unable to add new Qc', 'Failed');
      }
    );
  }

  updateQc() {
    const data = { ...this.addInvoiceForm.value, products: this.addedProducts, ...{ id: this.matData.data.id } };
    this.qcService.updateQc(data).subscribe(
      (s) => {
        this.matSnackBar.open(' Qc updated');
        this.dialogRef.close();
      },
      (e) => {
        this.matSnackBar.open('Unable to update  Qc', 'Failed');
      }
    );
  }

  addClient() {
    this.dialog.open(AddClientComponent, {
      data: { update: false, data: null }
    }).afterClosed().subscribe(r => {
      this.getClientList();
    });
  }

  addProduct() {
    this.dialog.open(AddProductComponent, {
      data: { update: false, data: null }
    }).afterClosed().subscribe(r => {
      this.getProductList();
    });
  }

  sortDistrict() {
    const stateId = this.addInvoiceForm.controls['state'].value;
    this.filterDistrict = this.districtList.filter(d => d.state_id == stateId);
  }

  prodChange(e: MatSelectChange) {
    const prodId: any = e.value;
    this.addProductForm.patchValue({
      prod_name: e.source.triggerValue
    });

    if (prodId) {
      const selProd = this.productList.filter(s => prodId == s.id)[0];
      const mou_name = this.mouList.filter(s => Number(s.id) == Number(selProd.mou_id))[0].name;
      this.addProductForm.patchValue({
        prod_mou: selProd.mou_id,
        prod_mou_name: mou_name
      });
    } else {
      this.addProductForm.patchValue({
        prod_mou: '',
        prod_mou_name: ''
      });
    }

  }

  mouChange(e: MatSelectChange) {
    this.addProductForm.patchValue({
      prod_mou_name: e.source.triggerValue
    });
  }

  deleteRow(i) {
    this.addedProducts.splice(i, 1);
    let initialValue = 0
    initialValue = 0
    this.prodFinaltotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_finaltotal)
    }, initialValue);

    this.roundOff = Number((Math.round(this.prodFinaltotal) - this.prodFinaltotal).toFixed(2));

    this.grandTotal = this.prodFinaltotal + this.roundOff;

    this.addInvoiceForm.patchValue({
      sub_total: this.prodFinaltotal,
      round_off: this.roundOff,
      grand_total: this.grandTotal
    });
  }

}
