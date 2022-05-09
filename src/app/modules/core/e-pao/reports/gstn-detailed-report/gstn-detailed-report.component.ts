import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GSTNDataReport, GSTNDetailedReport } from 'src/app/models/e-pao/epaoModel';

@Component({
    selector: 'app-gstn-detailed-report',
    templateUrl: './gstn-detailed-report.component.html',
    styleUrls: ['./gstn-detailed-report.component.css']
})
export class GstnDetailedReportComponent implements OnInit {
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

    ELEMENT_DATA: GSTNDetailedReport[] = [
        {
            gstin: '42ERER78787',
            cpin: '6553676874',
            cin: 'SBIN54354',
            paymentDate: '30/11/2018',
            bankRefNo: 'SBIN4434',
            bankCode: 'SBIN',
            sgstTax: '3,034.00',
            sgstIntr: '0.00',
            sgstFee: '0.00',
            sgstPnlty: '0.00',
            sgstOthr: '0.00',
            sgstTotal: '3,034.00'
        },
        {
            gstin: '42ERER78787',
            cpin: '6553676874',
            cin: 'SBIN54354',
            paymentDate: '30/11/2018',
            bankRefNo: 'SBIN4434',
            bankCode: 'SBIN',
            sgstTax: '3,034.00',
            sgstIntr: '0.00',
            sgstFee: '0.00',
            sgstPnlty: '0.00',
            sgstOthr: '0.00',
            sgstTotal: '3,034.00'
        },
        {
            gstin: '42ERER78787',
            cpin: '6553676874',
            cin: 'SBIN54354',
            paymentDate: '30/11/2018',
            bankRefNo: 'SBIN4434',
            bankCode: 'SBIN',
            sgstTax: '3,034.00',
            sgstIntr: '0.00',
            sgstFee: '0.00',
            sgstPnlty: '0.00',
            sgstOthr: '0.00',
            sgstTotal: '3,034.00'
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
        'gstin',
        'cpin',
        'cin',
        'paymentDate',
        'bankRefNo',
        'bankCode',
        'sgstTax',
        'sgstIntr',
        'sgstFee',
        'sgstPnlty',
        'sgstOthr',
        'sgstTotal'
    ];

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
