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
import { CoursesComponent } from './components/courses/courses.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseTableComponent,
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
  ],
  exports: [CoursesComponent],
  providers: [CourseDbService, GoogleApiService],
  entryComponents: [ConfirmModalComponent],
})
export class CoursesModule { }