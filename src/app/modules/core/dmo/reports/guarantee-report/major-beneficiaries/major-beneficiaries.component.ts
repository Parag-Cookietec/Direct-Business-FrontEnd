import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
interface RateOfInterest {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}
interface FinantialYear {
  value: string;
  viewValue: string;
}
interface TopN {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-major-beneficiaries',
  templateUrl: './major-beneficiaries.component.html',
  styleUrls: ['./major-beneficiaries.component.css']
})
export class MajorBeneficiariesComponent implements OnInit {

  MajorBeneficiariesForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  RateOfInterests: RateOfInterest[] = [
    {value: 'lessthan-0', viewValue: 'Less Than'},
    {value: 'greaterthan-1', viewValue: 'Greater Than'},
    {value: 'equalto-2', viewValue: 'Equal To'},
    {value: 'between-3', viewValue: 'Between'}
  ];

  LoanAmounts: LoanAmount[] = [
    {value: '100k-0', viewValue: '100K-500K'},
    {value: '500k-1', viewValue: '500k+'}
  ];

  FinantialYears: FinantialYear[] = [
    {value: '1', viewValue: '1998-1999'},
    {value: '2', viewValue: '1999-2000'},
    {value: '2', viewValue: '2000-2001'}
  ];

  TopNs: TopN[] = [
    {value: '1', viewValue: 'Top 5'},
    {value: '2', viewValue: 'Top 10'}
  ];

  Element_Data: any[] = [
    {
      srno: '1',
      majorBeneficiaries: 'Forest Department',
      guarenteeAmount: '4,82,25,000.00',
      guarenteeInPercentage: '100.00',
    },
    {
      srno: '1',
      majorBeneficiaries: 'Forest Department',
      guarenteeAmount: '4,82,25,000.00',
      guarenteeInPercentage: '100.00',
    },
    {
      srno: '1',
      majorBeneficiaries: 'Forest Department',
      guarenteeAmount: '4,82,25,000.00',
      guarenteeInPercentage: '100.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'majorBeneficiaries',
    'guarenteeAmount',
    'guarenteeInPercentage',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.MajorBeneficiariesForm = this.fb.group({     
      fromDate: [''],
      toDate: [''],
    });
  
  }

 
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const dpObj = {
      "pageIndex": event.pageIndex,
      "pageElement": event.pageSize,
      "jsonArr": []
    };
    let reqObj = {
      "pageIndex": 0,
      "pageElement": 10,
      "jsonArr": []
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
