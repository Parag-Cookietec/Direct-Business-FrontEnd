import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import { CrfgrfReportsService } from '../../reports-services/crfgrf-reports.service';

interface FinancialYear {
    value: string;
    viewValue: string;
}
interface SecurityTransaction {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-crf-total-investment',
    templateUrl: './crf-total-investment.component.html',
    styleUrls: ['./crf-total-investment.component.css']
})
export class CrfTotalInvestmentComponent implements OnInit {
    CRFtotalForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    FinancialYears: FinancialYear[] = [
        { value: '1', viewValue: '2020-2021' },
        { value: '2', viewValue: '2021-2022' }
    ];

    SecurityTransactions: SecurityTransaction[] = [
        { value: '1', viewValue: 'Investment' },
        { value: '2', viewValue: 'Sale' }
    ];

    dataSource;

    displayedColumns: any[] = [
        'srno',
        'dateOfPurchase',
        'nameOfSecurity',
        'faceValue',
        'purchasePrice',
        'purchaseValue',
        'brokenDays',
        'brokenPeriodInterest',
        'totalPurchasedCost'
    ];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private crfgrfReportsService: CrfgrfReportsService,
        private dataService: DataService,
        private _nssfLoanService: NssfLoanService
    ) {}

    ngOnInit() {
        this.CRFtotalForm = this.fb.group({
            loanNo: [''],
            fromDate: [''],
            typeOfSecurity: [''],
            ammountIn: ['']
        });

        this.crftotalInvestmentreport();
    }

    crftotalInvestmentreport(offset = null) {
        const payload = {            
            accountTypeId: '1958',
            financialYear: this.CRFtotalForm.value.fromDate,            
            typeOfSecurity: this.CRFtotalForm.value.typeOfSecurity,
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize
        };        
        console.log(payload);
        this.crfgrfReportsService.grfcrftotalinvestreport(payload).subscribe(
            (response: any) => {
                console.log(response);
                this.dataSource = new MatTableDataSource<any>(response?.result?.result);
                this.totalRecords = response?.result?.totalElement;
            },
            error => {
                console.log(error);
            }
        );
    }

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.crftotalInvestmentreport(this.pageIndex);
    }

    reset() {
        this.CRFtotalForm.reset();
    }
}
