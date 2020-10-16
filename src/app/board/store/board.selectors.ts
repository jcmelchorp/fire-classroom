import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './board.state';

export const getBoardsState = createFeatureSelector<BoardsState>('boards');

export const getBoards = createSelector(
  getBoardsState,
  (boards) => boards.boards
);

export const getIsLoading = createSelector(
  getBoardsState,
  (boards) => boards.isLoading
);

export const getError = createSelector(
  getBoardsState,
  (boards) => boards.error
);
