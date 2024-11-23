import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';

@Component({
  selector: 'app-waiting-dialog',
  templateUrl: './waiting-dialog.component.html',
  styleUrls: ['./waiting-dialog.component.scss']
})
export class WaitingDialogComponent {

  seconds: number = 0;
  minutes: number = 0;

  constructor(
    public dialogRef: MatDialogRef<WaitingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  ngOnInit() {
    timer(0, 1000).subscribe(n => {
      const minutesValue = n/60;
      this.seconds += 1;
      if ((n%60) === 0) {
        this.minutes = minutesValue;
        this.seconds = 0;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
