import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { ConsolidatedRecptReport } from 'src/app/models/e-pao/epaoModel';

@Component({
    selector: 'app-consolidated-receipt-report-expanded',
    templateUrl: './consolidated-receipt-report-expanded.component.html',
    styleUrls: ['./consolidated-receipt-report-expanded.component.css']
})
export class ConsolidatedReceiptReportExpandedComponent implements OnInit {
    private paginator: MatPaginator;
    private sort: MatSort;

    workloadReportForm: FormGroup;

    @ViewChild(MatSort) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    ELEMENT_DATA: ConsolidatedRecptReport[] = [
        {
            branch: '0006',
            name: 'STATE GOODS AND SERVICES TAX(SGST)',
            challanAlloted: '',
            challanPosted: '',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '00-NIL',
            challanAlloted: '',
            challanPosted: '',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '101-TAX',
            challanAlloted: '',
            challanPosted: '',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '01-COLLECTIONS (A)',
            challanAlloted: '',
            challanPosted: '',
            challanPending: 'XXXX',
            moeRaised: ''
        },
        {
            branch: '',
            name: '02-DEDUCT REFUNDS (B)',
            challanAlloted: '',
            challanPosted: '',
            challanPending: 'XXXX',
            moeRaised: ''
        },
        {
            branch: '',
            name: '01- EXCESS DUE TO MISTAKE/INADVERTENCE',
            challanAlloted: '',
            challanPosted: 'XXXX',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '0006',
            name: 'STATE GOODS AND SERVICES TAX(SGST)',
            challanAlloted: '',
            challanPosted: '',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '00-NIL',
            challanAlloted: '',
            challanPosted: '',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '102-INTEREST',
            challanAlloted: '',
            challanPosted: '',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '01-COLLECTIONS (A)',
            challanAlloted: '',
            challanPosted: '',
            challanPending: 'XXXX',
            moeRaised: ''
        }
    ];

    // date
    maxDate = new Date();
    todayDate = new Date();

    // error message
    public errorMessages;

    // table source
    newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    newdisplayedColumns: string[] = [
        'branch',
        'name',
        'challanAlloted',
        'challanPosted',
        'challanPending',
        'moeRaised'
    ];

    newdisplayedFooterColumns: string[] = [
        'branch',
        'name',
        'challanAlloted',
        'challanPosted',
        'challanPending',
        'moeRaised'
    ];

    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) {}

    directiveObject = new EPaoDirectives(this.router, this.dialog);

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.workloadReportForm = this.workloadReportData();
    }

    workloadReportData() {
        return this.fb.group({
            fromDate: [''],
            toDate: ['']
        });
    }

    date = new FormControl(moment());

    chosenYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.month(normalizedMonth.month());
        this.date.setValue(ctrlValue);
        datepicker.close();
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

    totalCalculation(num): number {
        switch (num) {
            case 0:
                return this.newdataSource.data
                    .map(it => it.noOfTransactions)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            case 1:
                return this.newdataSource.data
                    .map(it => it.sgstTax)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            case 2:
                return this.newdataSource.data
                    .map(it => it.sgstInterest)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            case 3:
                return this.newdataSource.data
                    .map(it => it.sgstFees)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            case 4:
                return this.newdataSource.data
                    .map(it => it.sgstPenalty)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            case 5:
                return this.newdataSource.data
                    .map(it => it.sgstOthers)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            case 6:
                return this.newdataSource.data
                    .map(it => it.ratAmount)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            case 7:
                return this.newdataSource.data
                    .map(it => it.totalAmount)
                    .reduce(function(prev, curr) {
                        return (Number(prev) || 0) + (Number(curr) || 0);
                    });
                break;
            default:
                return 0;
                break;
        }
    }
}
