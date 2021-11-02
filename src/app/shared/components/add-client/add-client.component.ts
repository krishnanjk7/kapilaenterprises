import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/service/client.service';
import { LookupService } from 'src/app/service/lookup.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  addClientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    holder_name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl('', Validators.required),
    mobile_alt: new FormControl(''),
    land_line: new FormControl(''),
    land_line_alt: new FormControl(''),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    gstin: new FormControl('', Validators.required),
    remarks: new FormControl(''),
  });

  stateList: { id: number; state: string }[] = []
  districtList: { id: number; name: string; state_id: number }[] = [];
  filterDistrict: { id: number; name: string; state_id: number }[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public matData: any,
    private lookUp: LookupService,
    private clientService: ClientService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

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

    if (this.matData) {
      if (this.matData.update) {
        const cd = this.matData.data;
        this.addClientForm.patchValue({
          name: cd.name,
          holder_name: cd.holder_name,
          email: cd.email,
          mobile: cd.mobile,
          mobile_alt: cd.mobile_alt,
          landline: cd.landline,
          landline_alt: cd.landline_alt,
          state: cd.state,
          district: cd.district,
          city: cd.city,
          address: cd.address,
          pincode: cd.pincode,
          gstin: cd.gstin,
          remarks: cd.remarks
        });
      }
    }

  }

  hasError(field: string) {
    return this.addClientForm.controls[field].hasError;
  }

  getErrorMessage(field: string) {
    console.log(this.addClientForm.controls[field].validator['required']);
  }

  sortDistrict() {
    const stateId = this.addClientForm.controls['state'].value;
    this.filterDistrict = this.districtList.filter(d => d.state_id == stateId);
  }

  addClient() {
    const data = this.addClientForm.value;
    this.clientService.addClient(data).subscribe(
      (s) => {
        this.matSnackBar.open('New client added');
        this.dialogRef.close();
      },
      (e) => {
        this.matSnackBar.open('Unable to add new Client', 'Failed');
      }
    );
  }

  updateClient() {
    let data = this.addClientForm.value;
    data = { ...data, ...{ id: this.matData.data.id } };
  
    this.clientService.updateClient(data).subscribe(
    (s) => {
      this.matSnackBar.open('Client details updated');
      this.dialogRef.close();
    },
    (e) => {
      this.matSnackBar.open('Unable to update Client details', 'Failed');
    }
  );
  }
}
