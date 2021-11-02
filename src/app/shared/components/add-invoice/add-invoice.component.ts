import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/service/client.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { LookupService } from 'src/app/service/lookup.service';
import { ProductService } from 'src/app/service/product.service';
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
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  addInvoiceForm = new FormGroup({
    client_id: new FormControl('', Validators.required),
    invoice_date: new FormControl('', Validators.required),
    remarks: new FormControl(''),
    ship_to_same: new FormControl(''),
    sub_total1: new FormControl('', Validators.required),
    sgst_total: new FormControl(''),
    cgst_total: new FormControl(''),
    igst_total: new FormControl(''),
    tax_total: new FormControl('', Validators.required),
    sub_total2: new FormControl('', Validators.required),
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
    prod_subtotal1: new FormControl('', Validators.required),
    prod_tax: new FormControl(''),
    prod_cgst: new FormControl(''),
    prod_sgst: new FormControl(''),
    prod_igst: new FormControl(''),
    prod_taxtotal: new FormControl(''),
    prod_finaltotal: new FormControl('')
  });

  taxList: { id: number; name: string; sgst: number; cgst: number; igst: number; remarks: string; }[] = [];
  mouList: { id: number; name: string; description: string; }[] = [];
  productList: ProductDTO[] = [];
  clientList: ClientDTO[] = [];
  addedProducts = [];

  prodSubtotal = 0;
  cgstTotal = 0;
  sgstTotal = 0;
  igstTotal = 0;
  prodTaxtotal = 0;
  prodFinaltotal = 0;
  roundOff = 0;
  grandTotal = 0;

  stateList: { id: number; state: string }[] = []
  districtList: { id: number; name: string; state_id: number }[] = [];
  filterDistrict: { id: number; name: string; state_id: number }[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public matData: any,
    private lookUp: LookupService,
    private matSnackBar: MatSnackBar,
    private productService: ProductService,
    private invoiceService: InvoiceService,
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
      console.log(this.matData);
      if (this.matData.update) {
        const cd = this.matData.data;
        console.log(cd);
        this.addInvoiceForm.patchValue({
          client_id: cd.client_id,
          invoice_date: cd.qc_date,
          remarks: cd.remarks,
          ship_to_same: cd.ship_to_same,
          sub_total1: cd.sub_total1,
          sgst_total: cd.sgst_total,
          cgst_total: cd.cgst_total,
          igst_total: cd.igst_total,
          tax_total: cd.tax_total,
          sub_total2: cd.sub_total2,
          round_off: cd.round_off,
          grand_total: cd.grand_total
        });

        this.prodSubtotal = cd.sub_total1;
        this.prodTaxtotal =cd.tax_total;
        this.prodFinaltotal =cd.sub_total2;
        this.roundOff = cd.round_off;
        this.grandTotal = cd.grand_total;

        this.roundOff = cd.round_off;
        this.grandTotal = cd.grand_total;

        this.invoiceService.getInvoiceGroup(cd.id).subscribe(
          (r: any) => {
            r.forEach(s => {
              this.addedProducts.push({
                prod_id: s.product_id,
                prod_name: s.name,
                prod_mou: s.mou_id,
                prod_mou_name: s.mou_name,
                prod_qty: s.qty,
                prod_rate: s.rate,
                prod_subtotal1: s.qty_rate_total,
                prod_tax: s.tax_id,
                prod_cgst: 0,
                prod_sgst: 0,
                prod_igst: 0,
                prod_taxtotal: s.tax_total,
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
      let tax = this.addProductForm.get('prod_tax').value;
      console.log(this.addProductForm.value);

      this.addProductForm.patchValue({
        prod_subtotal1: (rate * val).toFixed(2)
      });
      if (tax) {
        this.calculateProdTax(tax);
      } else {
        this.addProductForm.patchValue({
          prod_finaltotal: (rate * val).toFixed(2)
        });
      }
    });

    this.addProductForm.get('prod_rate').valueChanges.subscribe(val => {
      const qty = this.addProductForm.get('prod_qty').value;
      let tax = this.addProductForm.get('prod_tax').value;
      this.addProductForm.patchValue({
        prod_subtotal1: (qty * val).toFixed(2)
      });
      if (tax) {
        this.calculateProdTax(tax);
      } else {
        this.addProductForm.patchValue({
          prod_finaltotal: (qty * val).toFixed(2)
        });
      }
    });

    this.addProductForm.get('prod_tax').valueChanges.subscribe(val => {
      if (val) {
        this.calculateProdTax(val);
      }
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
        prod_tax: selProd.tax_id,
        prod_mou_name: mou_name
      });
    } else {
      this.addProductForm.patchValue({
        prod_mou: '',
        prod_tax: '',
        prod_mou_name: ''
      });
    }

  }

  mouChange(e: MatSelectChange) {
    this.addProductForm.patchValue({
      prod_mou_name: e.source.triggerValue
    });
  }


  calculateProdTax(val) {

    if (val) {
      let selTax = this.taxList.filter(t => { return t.id == val })[0];

      const subTotal = this.addProductForm.get('prod_subtotal1').value;

      const cgst = (subTotal * (selTax.cgst / 100)).toFixed(2);
      const sgst = (subTotal * (selTax.sgst / 100)).toFixed(2);
      const igst = (subTotal * (selTax.igst / 100)).toFixed(2);
      const tax_total = (Number(cgst) + Number(sgst) + Number(igst)).toFixed(2);
      this.addProductForm.patchValue({
        prod_cgst: cgst,
        prod_igst: igst,
        prod_sgst: sgst,
        prod_taxtotal: tax_total,
        prod_finaltotal: (Number(subTotal) + Number(tax_total)).toFixed(2)
      });
    } else {
      this.addProductForm.patchValue({
        prod_taxtotal: 0,
        prod_finaltotal: this.addProductForm.get('prod_subtotal1').value
      });
    }
  }

  addProd() {
    this.addedProducts.push(this.addProductForm.value);
    console.log(this.addedProducts);

    let initialValue = 0
    this.prodSubtotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_subtotal1)
    }, initialValue);

    initialValue = 0
    this.prodTaxtotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_taxtotal)
    }, initialValue);

    initialValue = 0
    this.prodFinaltotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_finaltotal)
    }, initialValue);

    initialValue = 0
    this.cgstTotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_cgst)
    }, initialValue);

    initialValue = 0
    this.sgstTotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_sgst)
    }, initialValue);

    initialValue = 0
    this.igstTotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_igst)
    }, initialValue);

    this.roundOff = Number((Math.round(this.prodFinaltotal) - this.prodFinaltotal).toFixed(2));

    this.grandTotal = this.prodFinaltotal + this.roundOff;

    this.addInvoiceForm.patchValue({
      sub_total1: this.prodSubtotal,
      cgst_total: this.cgstTotal,
      sgst_total: this.sgstTotal,
      igst_total: this.igstTotal,
      tax_total: this.prodTaxtotal,
      sub_total2: this.prodSubtotal + this.prodTaxtotal,
      round_off: this.roundOff,
      grand_total: this.grandTotal
    });

    this.addProductForm.reset();
    console.log(this.addInvoiceForm);

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

  addInvoice() {
    const data = { ...this.addInvoiceForm.value, products: this.addedProducts };
    this.invoiceService.addInvoice(data).subscribe(
      (s) => {
        this.matSnackBar.open('New Invoice added');
        this.dialogRef.close();
      },
      (e) => {
        this.matSnackBar.open('Unable to add new Invoice', 'Failed');
      }
    );
  }

  updateInvoice() {
    const data = { ...this.addInvoiceForm.value, products: this.addedProducts, ...{ id: this.matData.data.id } };
    this.invoiceService.updateInvoice(data).subscribe(
      (s) => {
        this.matSnackBar.open('New Invoice updated');
        this.dialogRef.close();
      },
      (e) => {
        this.matSnackBar.open('Unable to update new Invoice', 'Failed');
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

  shipToChange(e: MatSelectChange) {
    if (e.value == 0) {
      this.addInvoiceForm.addControl('city', new FormControl('', Validators.required));
      this.addInvoiceForm.addControl('district', new FormControl('', Validators.required));
      this.addInvoiceForm.addControl('state', new FormControl('', Validators.required));
      this.addInvoiceForm.addControl('address', new FormControl('', Validators.required));
      this.addInvoiceForm.addControl('pincode', new FormControl('', Validators.required));
    } else {
      this.addInvoiceForm.removeControl('city');
      this.addInvoiceForm.removeControl('district');
      this.addInvoiceForm.removeControl('state');
      this.addInvoiceForm.removeControl('address');
      this.addInvoiceForm.removeControl('pincode');
    }
  }

  deleteRow(i) {
    this.addedProducts.splice(i, 1);
    let initialValue = 0
    this.prodSubtotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_subtotal1)
    }, initialValue);

    initialValue = 0
    this.prodTaxtotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_taxtotal)
    }, initialValue);

    initialValue = 0
    this.prodFinaltotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_finaltotal)
    }, initialValue);

    initialValue = 0
    this.cgstTotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_cgst)
    }, initialValue);

    initialValue = 0
    this.sgstTotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_sgst)
    }, initialValue);

    initialValue = 0
    this.igstTotal = this.addedProducts.reduce((total, s) => {
      return total + Number(s.prod_igst)
    }, initialValue);

    this.roundOff = Number((Math.round(this.prodFinaltotal) - this.prodFinaltotal).toFixed(2));

    this.grandTotal = this.prodFinaltotal + this.roundOff;
  }
}
