import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesMenuComponent } from './containers/quizzes-menu/quizzes-menu.component';
import { QuizzesDashboardComponent } from './components/quizzes-dashboard/quizzes-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';
import { FlipFlopComponent } from './components/flip-flop/flip-flop.component';
import { QuizcontainerDirective, QuizhomeComponent } from './components/flip-flop/quizhome/quizhome.component';
import { QuizexpandComponent } from './components/flip-flop/quizexpand/quizexpand.component';
import { QuizresultComponent } from './components/flip-flop/quizresult/quizresult.component';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    QuizzesMenuComponent,
    QuizzesDashboardComponent,
    FlipFlopComponent,
    QuizhomeComponent,
    QuizcontainerDirective,
    QuizexpandComponent,
    QuizresultComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  providers: [ApiService],
  entryComponents: [
    QuizexpandComponent
  ],
})
export class QuizzesModule { }
