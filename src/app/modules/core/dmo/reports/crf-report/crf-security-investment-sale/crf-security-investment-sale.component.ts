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
    selector: 'app-crf-security-investment-sale',
    templateUrl: './crf-security-investment-sale.component.html',
    styleUrls: ['./crf-security-investment-sale.component.css']
})
export class CRfSecurityInvestmentSaleComponent implements OnInit {
    CRfSecurityInvestmentSaleForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    FinancialYears;

    

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
        this.CRfSecurityInvestmentSaleForm = this.fb.group({
            loanNo: [''],
            financialYearId: [''],
            fromDate: [''],
            toDate: ['']
        });

        this.getFromAndToYear();
        this.crfinvestsalereport();
    }

    getFromAndToYear() {
        this.crfgrfReportsService.getFinancialYears().subscribe(
            (response: any) => {
                console.log(response);
                this.FinancialYears = response['result'];              
            },
            error => {
                console.log(error);
            }
        );
    }
    crfinvestsalereport(offset = null) {       
        const payload = {
            fromDate: this.crfgrfReportsService.formatDate(this.CRfSecurityInvestmentSaleForm.value.fromDate),
            toDate: this.crfgrfReportsService.formatDate(this.CRfSecurityInvestmentSaleForm.value.toDate),
            financialYear: this.CRfSecurityInvestmentSaleForm.value.financialYearId,
            investFromId: 'ALL',
            accountTypeId: '1958',
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize
        };
        console.log(payload);
        this.crfgrfReportsService.grfcrfinvestsalereport(payload).subscribe(
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
        this.crfinvestsalereport(this.pageIndex);
        // this.pageSize = event.pageSize;
        // this.pageIndex = event.pageIndex;
        // const dpObj = {
        //     pageIndex: event.pageIndex,
        //     pageElement: event.pageSize,
        //     jsonArr: []
        // };
        // let reqObj = {
        //     pageIndex: 0,
        //     pageElement: 10,
        //     jsonArr: []
        // };
    }

    reset() {
        this.CRfSecurityInvestmentSaleForm.reset();
    }

    /*   onSubmit() { }

  onApprove(obj) {
    this._nssfLoanService.setLoanId(obj.id);
    this.router.navigate(['/dashboard/dmo/nssf-loan-approved/approve']);
  }

  onEdit(id) {
    this.dataService.setOption('fromApproved', 'editMode');
    this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details/${id}`]);
  }

  onView(id) {
    this.dataService.setOption('fromApproved', 'viewMode');
    this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details/${id}`]);

  } */
}
