import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log('isCreationOK dans popup: ' + this.data.isCreationOK);
    console.log('creationReponse dans popup: ' + this.data.creationResponse);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
