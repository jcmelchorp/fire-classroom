import { FlipFlopComponent } from './components/flip-flop/flip-flop.component';
import { QuizzesDashboardComponent } from './components/quizzes-dashboard/quizzes-dashboard.component';
import { QuizzesMenuComponent } from './containers/quizzes-menu/quizzes-menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '', component: QuizzesMenuComponent, children: [
    { path: 'dashboard', component: QuizzesDashboardComponent },
    { path: 'flip-flop', component: FlipFlopComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
