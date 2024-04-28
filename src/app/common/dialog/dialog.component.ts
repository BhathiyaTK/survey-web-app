import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  countdownVal: number = 5;
  isConfirm: boolean = false;
  isRedirecting: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  confirmLeave(): void {
    this.isConfirm = true;
    const interval =  setInterval(() => {
      this.countdownVal--;

      if (this.countdownVal === 0) {
        this.isConfirm = false;
        this.isRedirecting = true;
        clearInterval(interval);
        setTimeout(() => {
          this.dialogRef.close({name: this.data.name});
        }, 2000);
      }
    }, 1000);
  }
}
