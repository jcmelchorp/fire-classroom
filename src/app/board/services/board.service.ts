import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private userTkn: string;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore
  ) { }

  /** Firebase Realtime Database operations */

  add(board: Board, userId: string) {
    const boards = this.db.list(`boards/${userId}`);
    return boards.push(board);
  }

  async addBoards(boards: Board[]) {
    const user = await this.afAuth.currentUser;
    if (user.uid) {
      boards.forEach((board: Board) => {
        this.db.list(`boards/${user.uid}`).push(board);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`boards/${userId}`).snapshotChanges();
  }

  update(board: Board, userId: string) {
    return of(
      this.db.object(`boards/${userId}/` + board.key).update({
        id: board.id,
        title: board.title,
        priority: board.priority,
      })
    );
  }

  delete(board: Board, userId: string) {
    return this.db.object(`boards/${userId}/` + board.key).remove();
  }


  async getAll() {
    const user = await this.afAuth.currentUser;
    return this.db.list(`items/${user.uid}`).snapshotChanges();
  }


  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    /* Realtime Database*/
    /* this.db.list(`boards/${user.uid}`).push({
      ...data,
      uid: user.uid,
      task: [{ description: 'Hello!', label: 'yellow' }]
    }); */
    /** Firestore  */
    return this.afs.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }]
    });
  }
  /**
   * Get all boards owned by current user
   */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          /* Realtime Database*/
          // this.db.list<Board[]>(`boards/${user.uid}/`, ref => ref.orderByChild('priority')).valueChanges();
          /** Firestore  */
          return this.afs
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority'))
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]): void {
    /** Firestore  */
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string): Promise<void> {
    // const user = await this.afAuth.currentUser;
    /* Realtime Database*/
    // this.db.object(`boards/${user.uid}/${boardId}`).remove();
    /** Firestore  */
    return this.afs.collection('boards').doc(boardId).delete();
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]): Promise<void> {
    // const user = await this.afAuth.currentUser;
    /* Realtime Database*/
    // this.db.object(`boards/${user.uid}/${boardId}`).update({ tasks });
    /** Firestore  */
    return this.afs.collection('boards').doc(boardId).update({ tasks });
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task): Promise<void> {
    // const user = await this.afAuth.currentUser;
    /* Realtime Database*/
    // this.db.object(`boards/${user.uid}/${boardId}/task/${task}`).remove();
    /** Firestore  */
    return this.afs
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }
}
