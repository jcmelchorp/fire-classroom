import { AppState } from '../../../state/app.state';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '../../store/admin.actions';
import { Observable } from 'rxjs';
import {
  getUsersList,
  getUserItems,
  getSelectedUser,
  getUsersListLoading,
  getUserItemsLoading,
  getUserCustomers,
  getUserCustomersLoading,
} from '../../store/admin.selectors';
import { User } from '../../../auth/models/user.model';
import { map, delay, take } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  modalRef: any;
  modalService: any;
  constructor(private store: Store<AppState>) {}

  users$: Observable<any>;
  //userItems$: Observable<Item[]>;
  /* userCustomers$: Observable<Customer[]>; */
  usersListLoading$: Observable<boolean>;
  userItemsLoading$: Observable<boolean>;
  userCustomersLoading$: Observable<boolean>;
  selectedUser$: Observable<any>;
  selectedUser: any;
  uid: any;

  modalConfig = {
    class: 'modal-dialog-centered',
  };

  ngOnInit(): void {
    this.users$ = this.store.pipe(
      select(getUsersList),
      delay(0),
      map((users: User[]) => {
        if (!users || (users && users.length === 0)) {
          this.store.dispatch(new fromAdmin.GetUsersList());
        }
        return users;
      })
    );
    this.usersListLoading$ = this.store.select(getUsersListLoading);
    this.userItemsLoading$ = this.store.select(getUserItemsLoading);
    this.userCustomersLoading$ = this.store.select(getUserCustomersLoading);
  }

  onUserSelect(user: any): void {
    this.uid = user.uid;
    this.selectedUser = user;
    this.selectedUser$ = this.store.select(getSelectedUser, user.uid);
    /* this.userItems$ = this.store.select(getUserItems, user.uid).pipe(
      map((items) => {
        if (items && items.length !== 0) {
          return items;
        } else {
          return null;
        }
      })
    );

     this.userCustomers$ = this.store.select(getUserCustomers, user.uid).pipe(
       map(customers => {
         if (customers && customers.length !== 0) {
           return customers;
         } else {
           return null;
         }
       })
     ); */
  }

  onItemsLoad(): void {
    this.store.dispatch(new fromAdmin.GetUserItems({ uid: this.uid }));
  }

  onCustomersLoad(): void {
    this.store.dispatch(new fromAdmin.GetUserCustomers({ uid: this.uid }));
  }

  onDetailsClose(): void {
    this.selectedUser = null;
  }

  /*  openItemConfirmModal(item: Item): void {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserItem({
              userId: this.selectedUser.key,
              itemId: item.key,
            })
          );
        }
      });
  } */

  /* openCustomerConfirmModal(customer: Customer) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserCustomer({
              userId: this.selectedUser.key,
              customerId: customer.key
            })
          );
        }
      });
  } */

  /* onCustomerDelete(customer: Customer) {
    this.openCustomerConfirmModal(customer);
  }
*/
  /* onItemDelete(item: Item): void {
    this.openItemConfirmModal(item);
  } */

  addAdminPrivileges(user: any): void {
    this.store.dispatch(new fromAdmin.AddAdminPrivileges({ userId: user.key }));
  }

  removeAdminPrivileges(user: any): void {
    this.store.dispatch(
      new fromAdmin.RemoveAdminPrivileges({ userId: user.key })
    );
  }
}
