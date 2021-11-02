import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LookupService } from 'src/app/service/lookup.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    hsn: new FormControl('', Validators.required),
    tax_id: new FormControl('', Validators.required),
    mou_id: new FormControl('', Validators.required)
  });

  taxList: { name: string; sgst: number; cgst: number; igst: number; remarks: string; }[] = [];
  mouList: { name: string; description: string; }[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public matData: any,
    private lookUp: LookupService,
    private matSnackBar: MatSnackBar,
    private productService: ProductService
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

    if (this.matData) {
      if (this.matData.update) {
        const cd = this.matData.data;
        this.addProductForm.patchValue({
          name: cd.name,
          description: cd.description,
          hsn: cd.hsn,
          tax_id: cd.tax_id,
          mou_id: cd.mou_id
        });
      }
    }

  }

  hasError(field: string) {
    return this.addProductForm.controls[field].hasError;
  }

  getErrorMessage(field: string) {
    console.log(this.addProductForm.controls[field].validator['required']);
  }

  addProduct() {
    const data = this.addProductForm.value;
    this.productService.addProduct(data).subscribe(
      (s) => {
        this.matSnackBar.open('New Product added');
        this.dialogRef.close();
      },
      (e) => {
        this.matSnackBar.open('Unable to add new Product', 'Failed');
      }
    );
  }

  updateProduct() {
    let data = this.addProductForm.value;
    data = { ...data, ...{ id: this.matData.data.id } };
  
    this.productService.updateProduct(data).subscribe(
    (s) => {
      this.matSnackBar.open('Product details updated');
      this.dialogRef.close();
    },
    (e) => {
      this.matSnackBar.open('Unable to update Product details', 'Failed');
    }
  );
  }

}
