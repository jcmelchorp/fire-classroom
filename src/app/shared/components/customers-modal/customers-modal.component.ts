import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Customer } from '../../../customers/models/customer.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-customers-modal',
  templateUrl: './customers-modal.component.html',
  styleUrls: ['./customers-modal.component.scss']
})
export class CustomersModalComponent implements OnInit {
  @ViewChild('customerForm', { static: true }) customerForm: NgForm;
  close = faWindowClose;
  heading: string;
  customer: Customer = {};

  customerData: Subject<Customer> = new Subject();

  constructor(
    public dialogService: MatDialog,
  ) { }

  ngOnInit() { }

  onSave() {
    if (this.customerForm.valid) {
      this.customerData.next(this.customerForm.value);
      this.dialogService.closeAll();
    } else {
      const controls = this.customerForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

}
