import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PerformanceMonitoringReport } from 'src/app/models/e-pao/epaoModel';

@Component({
    selector: 'app-performance-monitoring-report',
    templateUrl: './performance-monitoring-report.component.html',
    styleUrls: ['./performance-monitoring-report.component.css']
})
export class PerformanceMonitoringReportComponent implements OnInit {
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

    ELEMENT_DATA: PerformanceMonitoringReport[] = [
        {
            description: 'Challan attached through scroll distribution',
            match: '0',
            rat: '0',
            clearedRat: '0',
            moe: '0',
            total: '0'
        },
        {
            description: 'Challan Trabsfer In',
            match: '0',
            rat: '0',
            clearedRat: '0',
            moe: '0',
            total: '0'
        },
        {
            description: 'Old Rat Clear',
            match: '0',
            rat: '0',
            clearedRat: '0',
            moe: '0',
            total: '0'
        },
        {
            description: 'Challan Transfer Out',
            match: '0',
            rat: '0',
            clearedRat: '0',
            moe: '0',
            total: '0'
        }
    ];

    // date
    maxDate = new Date();
    todayDate = new Date();

    // error message
    public errorMessages;

    // form group
    performanceMonReportForm: FormGroup;

    // table source
    newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    newdisplayedColumns: string[] = ['srNo', 'description', 'match', 'rat', 'clearedRat', 'moe', 'total'];
    newdisplayedFooterColumns: string[] = ['srNo', 'description', 'match', 'rat', 'clearedRat', 'moe', 'total'];

    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) {}

    directiveObject = new EPaoDirectives(this.router, this.dialog);

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.performanceMonReportForm = this.performanceMonReportData();
    }

    performanceMonReportData() {
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
