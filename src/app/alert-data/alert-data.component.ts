import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-data',
  templateUrl: './alert-data.component.html',
  styleUrls: ['./alert-data.component.css']
})
export class AlertDataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }
}
