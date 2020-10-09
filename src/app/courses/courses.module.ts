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
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseComponent } from './components/course/course.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { MaterialModule } from '../material/material.module';
import { CoursesComponent } from './containers/courses/courses.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseComponent,
    CourseTableComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    StoreModule.forFeature('course', fromCourse.courseReducer),
    EffectsModule.forFeature([CourseEffect]),
  ],
  exports: [CoursesComponent],
  providers: [CourseDbService, GoogleApiService],
})
export class CoursesModule {}
