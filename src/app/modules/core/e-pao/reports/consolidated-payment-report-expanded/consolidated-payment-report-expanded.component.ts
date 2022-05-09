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
    selector: 'app-consolidated-payment-report-expanded',
    templateUrl: './consolidated-payment-report-expanded.component.html',
    styleUrls: ['./consolidated-payment-report-expanded.component.css']
})
export class ConsolidatedPaymentReportExpandedComponent implements OnInit {
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
            branch: '8658',
            name: 'SUSPENSE ACCOUNTS',
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
            name: '108-PUBLIC SECTOR SUSPENSE ACCOUNT',
            challanAlloted: '',
            challanPosted: '',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '01-PUBLIC SECTOR SUSPENSE ACCOUNT',
            challanAlloted: '',
            challanPosted: '',
            challanPending: 'XXXX',
            moeRaised: ''
        },
        {
            branch: '',
            name: '01- RESERVE BANK OF INDIA, PAD',
            challanAlloted: '',
            challanPosted: 'XXXX',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '02- ALLAHABAD BANK',
            challanAlloted: '',
            challanPosted: 'XXXX',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '',
            name: '03- ANDHRA BANK',
            challanAlloted: '',
            challanPosted: 'XXXX',
            challanPending: '',
            moeRaised: ''
        },
        {
            branch: '8658',
            name: '',
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
            name: '138 – OTHER NOMINATED BANKS (PRIVATE SECTOR BANKS) SUSPENSE',
            challanAlloted: '',
            challanPosted: '',
            challanPending: 'XXXX',
            moeRaised: ''
        },
        {
            branch: '',
            name: '01 – OTHER NOMINATED BANKS (PRIVATE SECTOR BANKS) SUSPENSE',
            challanAlloted: '',
            challanPosted: '',
            challanPending: 'XXXX',
            moeRaised: ''
        },
        {
            branch: '',
            name: '01- HDFC BANK',
            challanAlloted: '',
            challanPosted: 'XXXX',
            challanPending: '',
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
}
