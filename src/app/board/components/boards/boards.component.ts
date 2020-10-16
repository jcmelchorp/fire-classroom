import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import { BoardDialogComponent } from '../board-dialog/board-dialog.component';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { getBoards, getIsLoading } from '../../store/board.selectors';
import * as fromBoards from '../../store/board.actions';
import { map, take } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  plus = faPlus;
  boards: Board[] | null;
  boardsSub: Subscription;
  isLoading$: Observable<boolean>;
  lastBoardIndex: number;

  constructor(
    public boardService: BoardService,
    public dialogService: MatDialog,
    private store: Store<AppState>,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    /* this.boardsSub = this.boardService
      .getUserBoards()
      .subscribe(boards => (this.boards = boards)); */
    this.boardsSub = this.store
      .select(getBoards)
      .pipe(
        map((boards: Board[]) => {
          if (this.user && !boards) {
            this.store.dispatch(new fromBoards.BoardsQuery());
          }
          return boards;
        })
      )
      .subscribe((boards: Board[]) => {
        if (boards && boards.length !== 0) {
          const index: number = Number(boards[boards.length - 1].id);
          this.lastBoardIndex = index;
        } else {
          this.lastBoardIndex = 0;
        }
        this.boards = boards;
      });
  }
  get user(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }
  ngOnDestroy(): void {
    if (this.boardsSub) {
      this.boardsSub.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  onAddBoard(): void {
    const dialogRef = this.dialogService.open(BoardDialogComponent, {
      width: '400px',
      data: {
        priority: this.boards.length,
      },
    });
    dialogRef.componentInstance.data.subscribe((board: Board) => {
      this.store.dispatch(new fromBoards.BoardsAdded({ board }));
    });
    /* dialogRef.componentInstance.data.subscribe((result) => {
      if (result) {
        this.boardService.createBoard({
          title: result.title,
          priority: this.boards.length,
        });
      }
    }); */
  }

  openEditBoardModal(board: Board): void {
    const boardCopy = {
      key: board.key || null,
      id: board.id || null,
      name: board.title || null,
      description: board.priority || null
    };
    const dialogRef = this.dialogService.open(BoardDialogComponent, {
      width: '400px',
      data: boardCopy
    });
    dialogRef.componentInstance.data.pipe(take(1)).subscribe(data => {
      this.store.dispatch(new fromBoards.BoardsEdited({ board: data }));
    });
  }


  openConfirmModal(board: Board): void {
    const dialogRef = this.dialogService.open(ConfirmModalComponent, { width: '400px' });

    dialogRef.componentInstance.confirmation.pipe(take(1)).subscribe((confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromBoards.BoardsDeleted({ board }));
      }
    });
  }

  onBoardEdit(board: Board) {
    this.openEditBoardModal(board);
  }

  onBoardDelete(board: Board) {
    this.openConfirmModal(board);
  }
  openBoardDialog(): void {
    const dialogRef = this.dialogService.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length,
        });
      }
    });
  }

}
