import { getCourse } from './../../store/course.selectors';
import { Observable } from 'rxjs';
import { Course } from './../../models/course.model';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[];
  @Input() editable = true;
  @Output() courseDeleted = new EventEmitter<Course>();
  @Output() courseEdited = new EventEmitter<Course>();
  constructor() {}

  ngOnInit(): void {}

  onCourseDelete(course: Course) {
    this.courseDeleted.emit(course);
  }

  onCourseEdit(course: Course) {
    this.courseEdited.emit(course);
  }
  trackByFunction(index: any) {
    return index;
  }
}
