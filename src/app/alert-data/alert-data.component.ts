import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-alert-data',
  templateUrl: './alert-data.component.html',
  styleUrls: ['./alert-data.component.css']
})
export class AlertDataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertDataComponent>,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }

  private quit() {
    this.communicationService.setIsWarning(true);
    this.dialogRef.close();
  }

  private continue() {
    this.communicationService.setIsWarning(false);
    this.dialogRef.close();
  }
}
