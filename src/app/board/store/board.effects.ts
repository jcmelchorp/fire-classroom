import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BoardService } from '../services/board.service';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Board } from '../models/board.model';

import * as fromBoards from './../store/board.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../state/app.state';
import { getUser } from '../../auth/store/auth.selectors';
import { BoardsActionTypes } from './../store/board.actions';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private boardsService: BoardService,
    private store: Store<AppState>
  ) { }

  @Effect()
  query$ = this.actions$.pipe(
    ofType(BoardsActionTypes.BOARDS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) =>
      this.boardsService.get(user.uid).pipe(
        map((data: any) => {
          const boardsData: Board[] = data.map((res: any) => {
            const key = res.payload.id;
            const board: Board = res.payload.val();
            return {
              id: board.id,
              title: board.title,
              priority: board.priority,
              tasks: board.tasks,
            };
          });
          return new fromBoards.BoardsLoaded({ boards: boardsData });
        }),
        catchError((error) => {
          return of(new fromBoards.BoardsError({ error }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(BoardsActionTypes.BOARDS_ADDED),
    map((action: fromBoards.BoardsAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.boardsService.add(payload.board, user.uid)
    )
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(BoardsActionTypes.BOARDS_EDITED),
    map((action: fromBoards.BoardsEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.boardsService.update(payload.board, user.uid).pipe(
        catchError((error) => {
          return of(new fromBoards.BoardsError({ error }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(BoardsActionTypes.BOARDS_DELETED),
    map((action: fromBoards.BoardsDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.boardsService.delete(payload.board, user.uid)
    )
  );
}
