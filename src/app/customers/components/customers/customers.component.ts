import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CustomersService } from './../../services/customers.service';
import { Customer } from './../../models/customer.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromCustomers from './../../store/customers.actions';
import { Subscription, Observable } from 'rxjs';
import { getCustomers, getIsLoading } from '../../store/customers.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { CustomersModalComponent } from '../../../shared/components/customers-modal/customers-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppState } from 'src/app/state/app.state';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  customers: Customer[] | null;
  customersSub: Subscription;
  lastCustomerIndex: number;
  plus = faPlus;
  constructor(
    private dialogService: MatDialog,
    private customersService: CustomersService,
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    this.customersSub = this.store.select(getCustomers).pipe(
      map((customers: Customer[]) => {
        if (this.user && !customers) {
          this.store.dispatch(new fromCustomers.CustomersQuery());
        }
        return customers;
      })
    ).subscribe((customers: Customer[]) => {
      if (customers && customers.length !== 0) {
        const index: number = Number(customers[customers.length - 1].id);
        this.lastCustomerIndex = index;
      } else {
        this.lastCustomerIndex = 0;
      }
      this.customers = customers;
    });
  }

  get user(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  ngOnDestroy(): void {
    if (this.customersSub) {
      this.customersSub.unsubscribe();
    }
  }

  onAddCustomer(): void {
    const dialogRef = this.dialogService.open(CustomersModalComponent, {
      width: '400px',
      data: {
        priority: this.customers.length,
        id: this.lastCustomerIndex + 1
      },
    });
    dialogRef.componentInstance.heading = 'Create new customer';
    dialogRef.componentInstance.customerData.subscribe((customer: Customer) => {
      this.store.dispatch(new fromCustomers.CustomersAdded({ customer }));
    });
  }

  openEditCustomerModal(customer: Customer): void {
    const customerCopy = {
      key: customer.key,
      id: customer.id || null,
      name: customer.name || null,
      description: customer.description || null
    };
    const dialogRef = this.dialogService.open(CustomersModalComponent, {
      width: '400px',
      data: customer
    });
    dialogRef.componentInstance.heading = 'Update customer';
    dialogRef.componentInstance.customer = customerCopy;
    dialogRef.componentInstance.customerData.pipe(take(1)).subscribe((customerData: Customer) => {
      this.store.dispatch(new fromCustomers.CustomersEdited({ customer: customerCopy }));
    });
  }

  openConfirmModal(customer: Customer): void {
    const dialogRef = this.dialogService.open(ConfirmModalComponent, { width: '400px' });

    dialogRef.componentInstance.confirmation.pipe(take(1)).subscribe((confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromCustomers.CustomersDeleted({ customer }));
      }
    });
  }

  onCustomerEdit(customer: Customer): void {
    this.openEditCustomerModal(customer);
  }

  onCustomerDelete(customer: Customer): void {
    this.openConfirmModal(customer);
  }

}
