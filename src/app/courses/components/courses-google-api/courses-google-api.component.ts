import { GoogleApiService } from './../../../auth/services/google-api.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { faGlobeAmericas, faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Course } from '../../models/course.model';
import { getIsLoading } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-courses-google-api',
  templateUrl: './courses-google-api.component.html',
  styleUrls: ['./courses-google-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesGoogleApiComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  courseSub: Subscription;
  plus = faPlus;
  question = faQuestionCircle;
  world = faGlobeAmericas;
  courses$: Observable<Course[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  constructor(
    public googleApiService: GoogleApiService,
    private afAuth: AngularFireAuth,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.googleApiService.listCourses();
    this.courses$ = this.googleApiService.courses$;
    this.isLoading$ = this.store.select(getIsLoading);

  }


  onCourseDelete(course: Course) {
    //this.openConfirmModal(course);
  }

  onCourseEdit(course: Course) {
    //this.openEditCourseModal(course);
  }
  trackByFunction(index: any) {
    return index;
  }
}
