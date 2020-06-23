import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]{3,25}')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
      subject: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]{3,20}')]),
      message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)])
    });
  }

  hasError(field: string) {
    const control = this.contactForm.controls[field];
    return (!control.valid) && control.dirty && control.touched;
  }

  showError(field: string, errorType: string) {
    return this.contactForm.controls[field].hasError(errorType);
  }

}
