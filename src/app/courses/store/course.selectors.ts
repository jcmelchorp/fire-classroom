import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoursesState } from './course.state';
// import { AppState } from '../../reducers/index';

export const getCourseState = createFeatureSelector<CoursesState>('course');

export const getCourse = createSelector(
  getCourseState,
  (course) => course.course
);

export const getAllCoursesLoaded = createSelector(
  getCourseState,
  (course) => course.loading
);

export const getError = createSelector(
  getCourseState,
  (course) => course.error
);
