import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [{ path: '', component: CoursesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
