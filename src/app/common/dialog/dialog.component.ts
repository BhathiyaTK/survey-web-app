import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  countdownVal: number = 5;
  spinnerVal: number = 100;
  isConfirm: boolean = false;
  isRedirecting: boolean = false;
  color: ThemePalette = 'accent';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  confirmLeave(): void {
    this.isConfirm = true;
    const interval = setInterval(() => {
      this.countdownVal--;
      this.spinnerVal = this.spinnerVal - 20;

      if (this.countdownVal === 0 && this.spinnerVal === 0) {
        setTimeout(() => {
          this.isConfirm = false;
          this.isRedirecting = true;
          clearInterval(interval);
          setTimeout(() => {
            this.dialogRef.close({ name: this.data.name });
          }, 2000);
        }, 1000);
      }
    }, 1000);
  }
}
