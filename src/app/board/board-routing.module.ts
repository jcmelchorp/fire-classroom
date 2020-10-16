import { ToDoTasksComponent } from './components/to-do-tasks/to-do-tasks.component';
import { MenuLayoutComponent } from './containers/menu-layout/menu-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from './components/boards/boards.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children: [
      { path: '', component: BoardsComponent },
      { path: 'to-do-tasks', component: ToDoTasksComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule { }
