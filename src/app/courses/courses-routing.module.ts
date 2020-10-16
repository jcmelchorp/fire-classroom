import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesFirebaseComponent } from './components/courses-firebase/courses-firebase.component';
import { CoursesShellComponent } from './containers/courses-shell/courses-shell.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesShellComponent,
    children: [{ path: '', component: CoursesFirebaseComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
