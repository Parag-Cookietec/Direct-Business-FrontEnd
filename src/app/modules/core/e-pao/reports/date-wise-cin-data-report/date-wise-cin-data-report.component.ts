import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DtwiseCinDataReport } from 'src/app/models/e-pao/epaoModel';

@Component({
    selector: 'app-date-wise-cin-data-report',
    templateUrl: './date-wise-cin-data-report.component.html',
    styleUrls: ['./date-wise-cin-data-report.component.css']
})
export class DateWiseCinDataReportComponent implements OnInit {
    private paginator: MatPaginator;
    private sort: MatSort;

    @ViewChild(MatSort) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    ELEMENT_DATA: DtwiseCinDataReport[] = [
        {
            date: '01/07/2017',
            noOfTxnCin: '10',
            amountCin: '100',
            noOfTxnCinEod: '50',
            amountCinEod: '500',
            noOfTxnDiff: '40',
            amountDiff: '400'
        },
        {
            date: '01/07/2017',
            noOfTxnCin: '10',
            amountCin: '100',
            noOfTxnCinEod: '50',
            amountCinEod: '500',
            noOfTxnDiff: '40',
            amountDiff: '400'
        },
        {
            date: '01/07/2017',
            noOfTxnCin: '10',
            amountCin: '100',
            noOfTxnCinEod: '50',
            amountCinEod: '500',
            noOfTxnDiff: '40',
            amountDiff: '400'
        },
        {
            date: '01/07/2017',
            noOfTxnCin: '10',
            amountCin: '100',
            noOfTxnCinEod: '50',
            amountCinEod: '500',
            noOfTxnDiff: '40',
            amountDiff: '400'
        }
    ];

    // date
    maxDate = new Date();
    todayDate = new Date();

    // error message
    public errorMessages;

    // form group
    dtwiseCinDataReportForm: FormGroup;

    newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    newdisplayedColumns: string[] = [
        'date',
        'noOfTxnCin',
        'amountCin',
        'noOfTxnCinEod',
        'amountCinEod',
        'noOfTxnDiff',
        'amountDiff'
    ];
    newdisplayedColumnsNum: string[] = ['0', '1', '2', '3', '4', '5', '6'];

    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) {}

    directiveObject = new EPaoDirectives(this.router, this.dialog);

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.dtwiseCinDataReportForm = this.dtwiseCinDataReportData();
    }

    dtwiseCinDataReportData() {
        return this.fb.group({
            fromDate: [''],
            toDate: ['']
        });
    }

    onPressPrint(content) {
        let printContents = document.getElementById(content).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    setDataSourceAttributes() {
        this.newdataSource.paginator = this.paginator;
        this.newdataSource.sort = this.sort;

        if (this.paginator && this.sort) {
            this.applyFilter('');
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.newdataSource.filter = filterValue;
    }
}
