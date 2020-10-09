import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromAdmin from './../store/admin.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { of } from 'rxjs';
/* import { Item } from 'src/app/item/models/item.model';
 */
@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  @Effect()
  getUsersList$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USERS_LIST),
    switchMap(() =>
      this.adminService.getUsersList().pipe(
        map((users: any) => {
          const usersList: any[] = users.map((res: any) => {
            const key = res.payload.key;
            const user: any = res.payload.val();
            return {
              key,
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              providerId: user.providerId,
              photoUrl: user.photoUrl,
              isNewUser: user.isNewUser,
              isAdmin: user.isAdmin,
              isOnline: user.isOnline,
            };
          });
          return new fromAdmin.UsersListFetched({ usersList });
        }),
        catchError((error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  /*  @Effect()
  getUserItems$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_ITEMS),
    map((action: fromAdmin.GetUserItems) => action.payload),
    mergeMap((payload: any) =>
      this.adminService.getUserItems(payload.uid).pipe(
        map((data: any) => {
          const itemsData: Item[] = data.map((res: any) => {
            const key = res.payload.key;
            const item: Item = res.payload.val();
            return {
              key: key || null,
              title: item.itemName || null,
              description: item.isActive || null,
              photoUrl: item.dateCreated || null,
            };
          });
          return new fromAdmin.UserItemsLoaded({
            uid: payload.uid,
            userItems: itemsData,
          });
        }),
        catchError((error) => of(new fromAdmin.AdminError({ error })))
      )
    )
  ); */

  @Effect({ dispatch: false })
  deleteUserItem$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_ITEM),
    map((action: fromAdmin.DeleteUserItem) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .deleteUserItem(payload.userId, payload.itemId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );

  /* @Effect()
  getUserCustomers$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_CUSTOMERS),
    map((action: fromAdmin.GetUserCustomers) => action.payload),
    mergeMap( (payload: any) => this.adminService.getUserCustomers(payload.uid)
      .pipe(
        map((data: any) => {
          const customersData: Customer[] = data.map((res: any) => {
            const key = res.payload.key;
            const customer: Customer = res.payload.val();
            return {
              key: key,
              id: customer.id,
              name: customer.name,
              description: customer.description
            };
          });
          return (new fromAdmin.UserCustomersLoaded({ uid: payload.uid, userCustomers: customersData }));
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  ); */

  @Effect({ dispatch: false })
  deleteUserCustomer$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_CUSTOMER),
    map((action: fromAdmin.DeleteUserCustomer) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .deleteUserCustomer(payload.userId, payload.customerId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );

  @Effect({ dispatch: false })
  addAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.ADD_ADMIN_PRIVILEGES),
    map((action: fromAdmin.AddAdminPrivileges) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .addAdminPrivileges(payload.userId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );

  @Effect({ dispatch: false })
  removeAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.REMOVE_ADMIN_PRIVILEGES),
    map((action: fromAdmin.RemoveAdminPrivileges) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .removeAdminPrivileges(payload.userId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );
}
