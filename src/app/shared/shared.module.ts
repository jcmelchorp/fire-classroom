import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { CourseComponent } from './components/course/course.component';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    CourseComponent,
    CoursesListComponent,
    CourseModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  exports: [CoursesListComponent, CourseComponent, CustomersListComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    CustomersModalComponent,
    CourseModalComponent,
  ],
})
export class SharedModule { }
