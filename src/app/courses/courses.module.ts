import { SharedModule } from './../shared/shared.module';
import { ConfirmModalComponent } from './../shared/components/confirm-modal/confirm-modal.component';
import { GoogleApiService } from 'src/app/auth/services/google-api.service';
import { CourseDbService } from './services/course-db.service';
import { CourseEffect } from './store/course.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromCourse from './store/course.reducer';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { MaterialModule } from '../material/material.module';
import { CoursesFirebaseComponent } from './components/courses-firebase/courses-firebase.component';
import { CoursesShellComponent } from './containers/courses-shell/courses-shell.component';
import { CoursesGoogleApiComponent } from './components/courses-google-api/courses-google-api.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    CoursesFirebaseComponent,
    CourseTableComponent,
    CoursesShellComponent,
    CoursesGoogleApiComponent,
    CoursesComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    SharedModule,
    StoreModule.forFeature('courses', fromCourse.courseReducer),
    EffectsModule.forFeature([CourseEffect]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [CoursesFirebaseComponent],
  providers: [CourseDbService],
  entryComponents: [ConfirmModalComponent],
})
export class CoursesModule { }
