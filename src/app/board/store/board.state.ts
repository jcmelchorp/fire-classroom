import { Board } from '../models/board.model';

export interface BoardsState {
  boards: Board[] | null;
  isLoading: boolean;
  error: any;
}

export const boardsInitialState: BoardsState = {
  boards: null,
  isLoading: true,
  error: null,
};
