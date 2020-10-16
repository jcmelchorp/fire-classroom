import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBoards from './store/board.reducer';

import { BoardsEffects } from './store/board.effects';
import { BoardService } from './services/board.service';
import { BoardRoutingModule } from './board-routing.module';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuLayoutComponent } from './containers/menu-layout/menu-layout.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/board/board.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ToDoTasksComponent } from './components/to-do-tasks/to-do-tasks.component';


@NgModule({
  declarations: [
    BoardComponent,
    MenuLayoutComponent,
    DeleteButtonComponent,
    BoardsComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    ToDoTasksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BoardRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    StoreModule.forFeature('boards', fromBoards.boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
  ],
  exports: [
    BoardComponent,
    MenuLayoutComponent,
    DeleteButtonComponent,
    BoardsComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    ToDoTasksComponent
  ],
  providers: [BoardService],
  entryComponents: [BoardDialogComponent, TaskDialogComponent]
})
export class BoardModule { }
