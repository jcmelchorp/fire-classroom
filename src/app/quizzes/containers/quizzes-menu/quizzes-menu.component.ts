import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quizzes-menu',
  templateUrl: './quizzes-menu.component.html',
  styleUrls: ['./quizzes-menu.component.scss']
})
export class QuizzesMenuComponent {
  menu = faBars;
  mediaSub: Subscription;
  deviceSm: boolean;
  deviceSize: string;

  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver
      .asObservable()
      .subscribe((result: MediaChange[]) => {
        this.deviceSize = result[0].mqAlias;
        this.deviceSm =
          this.deviceSize === 'sm' || this.deviceSize === 'xs' ? true : false;
      });
  }
  ngOnDestroy(): void {
    if (this.mediaSub !== undefined) {
      this.mediaSub.unsubscribe();
    }
  }
}

