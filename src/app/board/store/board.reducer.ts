import { boardsInitialState, BoardsState } from './board.state';
import { BoardsActions, BoardsActionTypes } from './board.actions';

export function boardsReducer(
  state = boardsInitialState,
  action: BoardsActions
): BoardsState {
  switch (action.type) {
    case BoardsActionTypes.BOARDS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case BoardsActionTypes.BOARDS_LOADED: {
      return Object.assign({}, state, {
        boards: action.payload.boards,
        isLoading: false,
      });
    }

    case BoardsActionTypes.BOARDS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error,
      });
    }

    default:
      return state;
  }
}
