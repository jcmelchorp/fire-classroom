import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { User } from './auth/models/user.model';
import {
  getUser,
  getIsLoggedIn,
  getIsLoading,
  getIsAdmin,
} from './auth/store/auth.selectors';
import * as fromAuth from './auth/store/auth.actions';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fire-classroom';
  mediaSub: Subscription;
  deviceXs: boolean;
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    public mediaObserver: MediaObserver
  ) {}
  ngOnInit(): void {
    this.user$ = this.store.select(getUser);
    this.isLoggedIn$ = this.store.select(getIsLoggedIn);
    this.isLoading$ = this.store.select(getIsLoading);
    this.isAdmin$ = this.store.select(getIsAdmin);
    this.mediaSub = this.mediaObserver
      .asObservable()
      .subscribe((result: MediaChange[]) => {
        this.deviceXs = result[0].mqAlias === 'xs' ? true : false;
      });
  }
  ngOnDestroy(): void {
    if (this.mediaSub !== undefined) {
      this.mediaSub.unsubscribe();
    }
  }
  onLogout(user: User): void {
    this.store.dispatch(new fromAuth.LogoutRequested({ user }));
  }
}
