import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
import { NssfReportsService } from '../../reports-services/nssf-reports.service';
interface RateOfInterest {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-repayment-liability',
  templateUrl: './total-loans-outstanding-vs-paid.component.html',
  styleUrls: ['./total-loans-outstanding-vs-paid.component.css']
})
export class outstandingvspaid implements OnInit {

  nssfoutstandingvspaidForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  // RateOfInterests: RateOfInterest[] = [
  //   {value: 'lessthan-0', viewValue: 'Less Than'},
  //   {value: 'greaterthan-1', viewValue: 'Greater Than'},
  //   {value: 'equalto-2', viewValue: 'Equal To'},
  //   {value: 'between-3', viewValue: 'Between'}
  // ];

  // LoanAmounts: LoanAmount[] = [
  //   {value: '100k-0', viewValue: '100K-500K'},
  //   {value: '500k-1', viewValue: '500k+'}
  // ];


 
  dataSource;
  //  = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'sanctionNo',
    'loanReceiptDt',
    'loanAmount',
    'principalAmount',
    'interestAmount',
    'outstandingAmount',
    'repaymentOutstandingPercentage',
  ];

  totalRecords;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ,private nssfReportsService: NssfReportsService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.nssfoutstandingvspaidForm = this.fb.group({     
      fromDate: [''],
      toDate: [''],
      sanctionno: [''],
      ammountIn: [''],
    });
  
    this.getNssfloanoutstandingReports();
  }

  reset(){
    this.nssfoutstandingvspaidForm.reset();
  }

  getNssfloanoutstandingReports(offset = null) {
    const payload = {
        fromDate: this.nssfReportsService.formatDate(this.nssfoutstandingvspaidForm.value.fromDate),
        toDate: this.nssfReportsService.formatDate(this.nssfoutstandingvspaidForm.value.toDate),
        // fromDate: '2016-03-03',
        // toDate: '2021-03-03',
        pageIndex: offset ? offset : this.pageIndex,
        pageSize: this.pageSize,
        sanctionNo: this.nssfoutstandingvspaidForm.value.sanctionno
    };  

    this.nssfReportsService.getNssfloanoutstandingVsPaid(payload).subscribe(
        (response: any) => {
            console.log(response);
            this.dataSource = new MatTableDataSource<any>(response?.result);
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
    this.getNssfloanoutstandingReports(this.pageIndex);
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
