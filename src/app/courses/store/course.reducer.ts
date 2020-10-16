import { CoursesActions, CourseActionTypes } from './course.actions';
import { coursesInitialState, CoursesState } from './course.state';

export function courseReducer(
  state = coursesInitialState,
  action: CoursesActions
): CoursesState {
  switch (action.type) {
    case CourseActionTypes.COURSES_QUERY: {
      return { ...state, isLoading: true, error: null };
    }

    case CourseActionTypes.COURSE_LOADED: {
      return { ...state, courses: action.payload.courses, isLoading: false };
    }

    case CourseActionTypes.COURSE_ERROR: {
      return { ...state, isLoading: false, error: action.payload.error };
    }

    default:
      return state;

    /* case courseActions.CourseActionTypes.LOAD_ITEMS_SUCCESS: {
      return courseAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case courseActions.CourseActionTypes.LOAD_ITEMS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }
    case courseActions.CourseActionTypes.LOAD_ITEM_SUCCESS: {
      return courseAdapter.addOne(action.payload, {
        ...state,
        selectedCourseId: action.payload.id,
      });
    }
    case courseActions.CourseActionTypes.LOAD_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case courseActions.CourseActionTypes.CREATE_ITEM_SUCCESS: {
      return courseAdapter.addOne(action.payload, state);
    }
    case courseActions.CourseActionTypes.CREATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case courseActions.CourseActionTypes.UPDATE_ITEM_SUCCESS: {
      return courseAdapter.updateOne(action.payload, state);
    }
    case courseActions.CourseActionTypes.UPDATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case courseActions.CourseActionTypes.DELETE_ITEM_SUCCESS: {
      return courseAdapter.removeOne(action.payload, state);
    }
    case courseActions.CourseActionTypes.DELETE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case courseActions.CourseActionTypes.ACTIVATE_ITEM_SUCCESS: {
      return courseAdapter.updateOne(action.payload, state);
    }
    case courseActions.CourseActionTypes.ACTIVATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    } */
  }
}

/* Selectors */
/*
const getCourseFeatureState = createFeatureSelector<CourseState>('courses');
export const getCourse = createSelector(
  getCourseFeatureState,
  courseAdapter.getSelectors().selectAll
);
export const getCourseLoading = createSelector(
  getCourseFeatureState,
  (state: CourseState) => state.loading
);
export const getCourseLoaded = createSelector(
  getCourseFeatureState,
  (state: CourseState) => state.loaded
);
export const getError = createSelector(
  getCourseFeatureState,
  (state: CourseState) => state.error
);
export const getCurrentCourseId = createSelector(
  getCourseFeatureState,
  (state: CourseState) => state.selectedCourseId
);
export const getCurrentCourse = createSelector(
  getCourseFeatureState,
  getCurrentCourseId,
  (state) => state.entities[state.selectedCourseId]
);
*/
