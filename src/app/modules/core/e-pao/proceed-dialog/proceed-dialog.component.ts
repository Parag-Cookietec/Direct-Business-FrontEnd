import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-proceed-dialog',
    templateUrl: './proceed-dialog.component.html',
    styleUrls: ['./proceed-dialog.component.css']
})
export class ProceedDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ProceedDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}

    // On Click of Yes and no button to close dialog
    OnYes() {
        this.dialogRef.close('yes');
    }
    OnNo() {
        this.dialogRef.close('No');
    }
}
