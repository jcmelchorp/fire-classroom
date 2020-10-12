import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoursesState } from './course.state';

export const getCourseState = createFeatureSelector<CoursesState>('courses');

export const getCourse = createSelector(
  getCourseState,
  (course) => course.course
);

export const getAllLoaded = createSelector(
  getCourseState,
  (course) => course.loading
);

export const getError = createSelector(
  getCourseState,
  (course) => course.error
);
