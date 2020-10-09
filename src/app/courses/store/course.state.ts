import { Course } from '../models/course.model';

export interface CoursesState {
  course: Course[] | null;
  loading: boolean;
  error: string;
}

export const courseInitialState: CoursesState = {
  course: null,
  loading: false,
  error: null,
};
