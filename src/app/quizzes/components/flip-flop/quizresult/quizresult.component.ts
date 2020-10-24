import { ServeService } from './../../../services/serve.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quizresult',
  templateUrl: './quizresult.component.html',
  styleUrls: ['./quizresult.component.scss']
})
export class QuizresultComponent implements OnInit {
  result = [];
  originalResult = [];
  userResult = [];
  count: number;
  score: number;
  @Input() isResultSubmitted;

  constructor(
    public apiService: ApiService,
    private serveService: ServeService
  ) {
    this.getQuizResult();
    this.getOriginalResult();
  }

  ngOnInit() {
  }

  createUserResultArr() {
    const len = this.originalResult.length;
    for (let i = 0; i < len; i++) {
      this.userResult.push(false);
    }
  }

  getQuizResult() {
    this.serveService.datasource.asObservable().subscribe(
      (res) => {
        this.result = res;
        this.calculateResult();
        console.log('result => ', this.result);
      }
    );
  }

  getOriginalResult() {
    this.serveService.originalanslists.asObservable().subscribe(
      res => {
        this.originalResult = res;
        console.log('originalResult => ', this.originalResult);
        this.createUserResultArr();
      }
    );
  }

  calculateResult() {
    this.result.forEach((ele, i) => {
      if (ele.index === this.originalResult[i]) {
        this.userResult[i] = true;
      }
    });
    console.log('userResult => ', this.userResult);
    this.calculateScore(this.userResult);
  }

  calculateScore(arr) {
    this.count = this.originalResult.length;
    const correctAns = this.userResult.filter(ele => ele === true);
    const correctAnsCount = correctAns.length;
    console.log('Correct Ans Count => ', correctAnsCount);
    this.score = correctAnsCount;
  }

}
