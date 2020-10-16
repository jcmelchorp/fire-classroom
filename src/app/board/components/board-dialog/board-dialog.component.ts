import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss'],
})
export class BoardDialogComponent {
  @ViewChild('customerForm', { static: true }) customerForm: NgForm;
  close = faWindowClose;
  board: Board;
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.customerForm.valid) {
      this.data.next(this.customerForm.value);
      this.dialogRef.close();
    } else {
      const controls = this.customerForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

}
