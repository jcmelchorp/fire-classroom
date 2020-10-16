import { Action } from '@ngrx/store';
import { Board } from '../models/board.model';

export enum BoardsActionTypes {
  BOARDS_QUERY = '[Boards] Query',
  BOARDS_LOADED = '[Boards] Fetched',

  BOARDS_ADDED = '[Boards] Added',
  BOARDS_EDITED = '[Boards] Edited',
  BOARDS_DELETED = '[Boards] Deleted',

  BOARDS_ERROR = '[Boards] Error',
}

export class BoardsQuery implements Action {
  readonly type = BoardsActionTypes.BOARDS_QUERY;
}

export class BoardsLoaded implements Action {
  readonly type = BoardsActionTypes.BOARDS_LOADED;

  constructor(public payload: { boards: Board[] }) {}
}

export class BoardsAdded implements Action {
  readonly type = BoardsActionTypes.BOARDS_ADDED;

  constructor(public payload: { board: Board }) {}
}

export class BoardsEdited implements Action {
  readonly type = BoardsActionTypes.BOARDS_EDITED;

  constructor(public payload: { board: Board }) {}
}

export class BoardsDeleted implements Action {
  readonly type = BoardsActionTypes.BOARDS_DELETED;

  constructor(public payload: { board: Board }) {}
}

export class BoardsError implements Action {
  readonly type = BoardsActionTypes.BOARDS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type BoardsActions =
  | BoardsQuery
  | BoardsLoaded
  | BoardsAdded
  | BoardsEdited
  | BoardsDeleted
  | BoardsError;
