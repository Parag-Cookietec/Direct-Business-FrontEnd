import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FileSummary } from '../../../../models/e-pao/epaoModel';
import { GstFileAccountingService } from '../services/gst-file-accounting/gst-file-accounting.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { Router } from '@angular/router';
import { EPaoDirectives } from 'src/app/common/directive/epao';


@Component({
    selector: 'app-file-summary',
    templateUrl: './file-summary.component.html',
    styleUrls: ['./file-summary.component.css']
})
export class FileSummaryComponent implements OnInit {
    // date
    maxDate = new Date();
    todayDate = new Date();
    isSubmitted = false;
    // form group
    fileSummaryForm: FormGroup;
    displayedColumns = [
        'srNo',
        'fileName',
        'fileDate',
        'fileType',
        'totRecCnt',
        'totFileCnt',
        'sgstAmt',
        'igstAmt',
        'cgstAmt',
        'cessAmt',
        'totAmt'
    ];
    newDisplayedColumns = [
        'srNo',
        'fileName',
        'fileDate',
        'fileType',
        'totRecCnt',
        'totFileCnt',
        'sgstAmt',
        'igstAmt',
        'cgstAmt',
        'cessAmt',
        'totAmt'
    ];
    dataSource: any = new MatTableDataSource<Array<FileSummary>>();
    newDataSource: any = new MatTableDataSource<Array<FileSummary>>();
    diffDataSource: any = new MatTableDataSource<Array<FileSummary>>();
    jsonArr: { key: string; value: number }[];
    fileDate: string;
    currentUrl: any;
    
    getdifference: boolean;
    getfilesummary: boolean;
    // @Inject(MAT_DIALOG_DATA) public data: {
    //     myData : MyData
    // }

    constructor(
        public dialog: MatDialog,
        private fb: FormBuilder,
        private router: Router,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        // @Inject(MAT_DIALOG_DATA) public data: any,
        // public dialogRef: MatDialogRef<FileSummaryComponent>,
        private gstFileAccountingService: GstFileAccountingService
    ) { this.currentUrl = router['url'];
    console.log(this.currentUrl);}

     directiveObject = new EPaoDirectives(this.router, this.dialog);
     

    ngOnInit() {
        this.fileSummaryData();
    }
    fileSummaryData() {
        this.fileSummaryForm = this.fb.group({
            fromDate: ['']
        });
    }

    resetFileSummaryData() {
        this.fileSummaryForm.reset();
        this.dataSource = [];
        this.newDataSource = [];
        this.diffDataSource = [];
    }

    getFileSummary() {

       this.getfilesummary = true ;

        this.fileDate = this.fileSummaryForm.controls.fromDate.value;
        this.fileDate = this.datepipe.transform(this.fileDate, 'yyyy-MM-dd').toString();
        this.gstFileAccountingService.getFileSummaryByDate({ file_dt: this.fileDate }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.dataSource = res['result'];
                    this.fileSummaryForm.patchValue({
                        fromDate: this.fileDate
                    });
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    onClickDifference() {

        this.getdifference = true;

        this.gstFileAccountingService.getDifference({ file_dt: this.fileDate }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newDataSource = res['result']['readFile'];
                    this.diffDataSource = res['result']['diffrenceFile'];
                    this.fileSummaryForm.patchValue({
                        fromDate: this.fileDate
                    });
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    // On close to open ProceedDialogComponent
    onClose() {
        const dialogRef = this.dialog.open(ProceedDialogComponent, {
            width: '300px',
            height: 'auto',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
            }
        });
    }

    onPressPrint(content) {
        let printContents = document.getElementById(content).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    onClickPrint(cpinDt: any, check: boolean) {
        check = true;
        cpinDt = this.datepipe.transform(cpinDt, 'yyyy-MM-dd').toString();
        const dialogRef = this.dialog.open(FileSummaryComponent, {
            width: '1200px',
            data: {
                cpinDt,
                check
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    // vitoCancel(): void {
    //     this.dialogRef.close();
    // }

    // public dialogRef: MatDialogRef<FileSummaryComponent>
}
