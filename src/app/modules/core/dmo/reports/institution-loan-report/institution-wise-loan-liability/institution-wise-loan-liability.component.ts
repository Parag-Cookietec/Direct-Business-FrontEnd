import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
//import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
//import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
interface RateOfInterest {
  value: string;
  viewValue: string;
}
interface NameOfInstitute {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-institution-wise-loan-liability',
  templateUrl: './institution-wise-loan-liability.component.html',
  styleUrls: ['./institution-wise-loan-liability.component.css']
})
export class InstituteWiseLoanLiabilityComponent implements OnInit {

  InstituteWiseLoanLiabilityForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  RateOfInterests: RateOfInterest[] = [
    {value: 'lessthan-0', viewValue: 'Less Than'},
    {value: 'greaterthan-1', viewValue: 'Greater Than'},
    {value: 'equalto-2', viewValue: 'Equal To'},
    {value: 'between-3', viewValue: 'Between'}
  ];

  
  NameOfInstitutes: NameOfInstitute[] = [
    {value: 'agriculture-dept-0', viewValue: 'Agriculture Department'},
    {value: 'irrigation-dept-1', viewValue: 'Irrigation Department'},
    {value: 'health-family-2', viewValue: 'Health and Family Department'},
    {value: 'food-civil-3', viewValue: 'Food and Civil Department'}
  ];
  Element_Data: any[] = [
    {
      srno: '1',
      NameOfInstitute: '2002-03/02',
      loanamount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      total: '49,35,06,000.00',
    },
    {
      srno: '1',
      NameOfInstitute: '2002-03/02',
      loanamount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      total: '49,35,06,000.00',
    },
    {
      srno: '1',
      NameOfInstitute: '2002-03/02',
      loanamount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      total: '49,35,06,000.00',
    },
    {
      srno: '1',
      NameOfInstitute: '2002-03/02',
      loanamount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      total: '49,35,06,000.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'NameOfInstitute',
    'loanamount',
    'principal',
    'interest',
    'total',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ) { }

  ngOnInit() {
    this.InstituteWiseLoanLiabilityForm = this.fb.group({     
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
