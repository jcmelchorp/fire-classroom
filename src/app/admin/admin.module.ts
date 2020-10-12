import { SharedModule } from './../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './containers/admin/admin.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';

import * as fromAdmin from './store/admin.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/admin.effects';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    UserComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('admin', fromAdmin.adminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
})
export class AdminModule { }
