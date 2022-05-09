import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CInCpinStatus, CreditPrintReport, ModifiedTable } from 'src/app/models/e-pao/epaoModel';

@Component({
    selector: 'app-cin-status-report',
    templateUrl: './cin-status-report.component.html',
    styleUrls: ['./cin-status-report.component.css']
})
export class CinStatusReportComponent implements OnInit {
    cinStatusrForm: FormGroup;
    recordTypeCtrl: FormControl = new FormControl();
    maxDate = new Date();
    todayDate = new Date();
    MODIFIED_DATA: ModifiedTable[] = [
        {
            desc: 'SGST',
            tax: '15121.00',
            interest: '0.00',
            fees: '0.00',
            penalty: '0.00',
            others: '0.00',
            rat: '0.00',
            total: '15121.00'
        },
        {
            desc: 'CGST',
            tax: '15121.00',
            interest: '0.00',
            fees: '0.00',
            penalty: '0.00',
            others: '0.00',
            rat: '0.00',
            total: '15121.00'
        },
        {
            desc: 'IGST',
            tax: '0.00',
            interest: '0.00',
            fees: '0.00',
            penalty: '0.00',
            others: '0.00',
            rat: '0.00',
            total: '0.00'
        },
        {
            desc: 'Cess',
            tax: '0.00',
            interest: '0.00',
            fees: '0.00',
            penalty: '0.00',
            others: '0.00',
            rat: '0.00',
            total: '0.00'
        },
        {
            desc: 'Total',
            tax: '30242.00',
            interest: '0.00',
            fees: '0.00',
            penalty: '0.00',
            others: '0.00',
            rat: '0.00',
            total: '30242.00'
        }
    ];
    modifiedTableCols = ['desc', 'tax', 'interest', 'fees', 'penalty', 'others', 'rat', 'total'];
    modifieddataSource = new MatTableDataSource(this.MODIFIED_DATA);
    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.cinStatusData();
    }
    cinStatusData() {
        this.cinStatusrForm = this.fb.group({
            addRate: [''],
            effecativeDate: [''],
            bankRate: [''],
            recordTypeCtrl: [''],
            details: ['']
        });
    }
}
