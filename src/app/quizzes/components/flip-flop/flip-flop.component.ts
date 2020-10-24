import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flip-flop',
  templateUrl: './flip-flop.component.html',
  styleUrls: ['./flip-flop.component.scss']
})
export class FlipFlopComponent {
  public isResultSubmitted = false;

  checkIsSubmitted(evt): void {
    console.log('evt => ', evt);
    if (evt === 'true') {
      this.isResultSubmitted = true;
    }
  }

}
