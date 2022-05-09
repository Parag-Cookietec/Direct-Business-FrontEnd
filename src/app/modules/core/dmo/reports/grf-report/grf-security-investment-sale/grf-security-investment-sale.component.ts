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
  selector: 'app-grf-security-investment-sale',
  templateUrl: './grf-security-investment-sale.component.html',
  styleUrls: ['./grf-security-investment-sale.component.css']
})
export class GrfSecurityInvestmentSaleComponent implements OnInit {
  GRFSecurityInvestmentSaleForm: FormGroup;
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
        this.GRFSecurityInvestmentSaleForm = this.fb.group({
            loanNo: [''],
            financialYearId: [''],
            fromDate: [''],
            toDate: [''],
            ammountIn: [''],
        });

        this.grfinvestsalereport();
        this.getFromAndToYear();
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

    grfinvestsalereport(offset = null) {       
        const payload = {
            fromDate: this.crfgrfReportsService.formatDate(this.GRFSecurityInvestmentSaleForm.value.fromDate),
            toDate: this.crfgrfReportsService.formatDate(this.GRFSecurityInvestmentSaleForm.value.toDate),
            financialYear: this.GRFSecurityInvestmentSaleForm.value.financialYearId,
            investFromId: 'ALL',
            accountTypeId: '1957',
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
        this.grfinvestsalereport(this.pageIndex);
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
        this.GRFSecurityInvestmentSaleForm.reset();
    }

}
