import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
import { MarketLoanReportsService } from '../../reports-services/market-loan-reports.service';
interface RateOfInterest {
    value: string;
    viewValue: string;
}
// interface loanamount {
//   value: string;
//   viewValue: string;
// }

@Component({
    selector: 'app-repayment-liability',
    templateUrl: './repayment-liability.component.html',
    styleUrls: ['./repayment-liability.component.css']
})
export class RepaymentLiabilityComponent implements OnInit {
    nssfRepaymentLiabilityForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests: RateOfInterest[] = [
        { value: 'lessthan-0', viewValue: 'Less Than' },
        { value: 'greaterthan-1', viewValue: 'Greater Than' },
        { value: 'equalto-2', viewValue: 'Equal To' },
        { value: 'between-3', viewValue: 'Between' }
    ];

    // LoanAmounts: loanAmount[] = [
    //   {value: '100k-0', viewValue: '100K-500K'},
    //   {value: '500k-1', viewValue: '500k+'}
    // ];

    dataSource;
    tableData = [];
    displayedColumns: any[] = [
        'srno',
        'loanDescription',
        'paymentDt',
        'loanAmount',
        'principalAmount',
        'loanROI',
        'totalAmount'
    ];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private marketLoanReportsService: MarketLoanReportsService
    ) {}

    ngOnInit() {
        this.nssfRepaymentLiabilityForm = this.fb.group({
            fromDate: [''],
            toDate: [''],
            loanDescription: [''],
            ammountIn: ['']
        });
        this.getReports();
    }

    reset() {
        this.nssfRepaymentLiabilityForm.reset();
    }

    getReports(offset = null) {
        const payload = {
            fromDate: this.marketLoanReportsService.formatDate(this.nssfRepaymentLiabilityForm.value.fromDate),
            toDate: this.marketLoanReportsService.formatDate(this.nssfRepaymentLiabilityForm.value.toDate),

            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            loanDescription: this.nssfRepaymentLiabilityForm.value.loanDescription,
            ammountIn: ''
        };

        this.marketLoanReportsService.getMarketRepaymentLiability(payload).subscribe(
            (response: any) => {
                const tablerows = [];                                
                Object.keys(response?.result).map(function(key, index) {
                    // console.log(response?.result[key]);
                    //   console.log(index)                      
                    if(response?.result[key]){
                        tablerows.push(response?.result[key])
                    }
                  });
                  console.log(tablerows)
                  this.tableData = []
                  this.tableData = tablerows;
                // this.dataSource = new MatTableDataSource<any>(response?.result['2016-1(January)']);
                // this.totalRecords = response?.result?.totalElement;
            },
            error => {
                console.log(error);
            }
        );
    }
    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        const dpObj = {
            pageIndex: event.pageIndex,
            pageElement: event.pageSize,
            jsonArr: []
        };
        let reqObj = {
            pageIndex: 0,
            pageElement: 10,
            jsonArr: []
        };
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
