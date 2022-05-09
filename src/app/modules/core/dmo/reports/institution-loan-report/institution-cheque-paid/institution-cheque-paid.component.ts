import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
//import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
//import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';

interface NameOfInstitute {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-institution-cheque-paid',
  templateUrl: './institution-cheque-paid.component.html',
  styleUrls: ['./institution-cheque-paid.component.css']
})
export class InstituteChequePaidComponent implements OnInit {

  InstituteChequePaidForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


 

  
  NameOfInstitutes: NameOfInstitute[] = [
    {value: 'agriculture-dept-0', viewValue: 'Agriculture Department'},
    {value: 'irrigation-dept-1', viewValue: 'Irrigation Department'},
    {value: 'health-family-2', viewValue: 'Health and Family Department'},
    {value: 'food-civil-3', viewValue: 'Food and Civil Department'}
  ];
  Element_Data: any[] = [
    {
      srno: '1',
      chequeNo: '2002-03/02',
      ChequeDate: '11-Dec-2018',
      chequeAmount: '24,11,25,000.00',
      memoNo: '25,31,42,00.00',
      memoDate: '11-Dec-2018',
      chequePaidDate: '11-Dec-2018',
      typeOfPayable: '49,35,06,000.00',
    },
    {
      srno: '1',
      chequeNo: '2002-03/02',
      ChequeDate: '11-Dec-2018',
      chequeAmount: '24,11,25,000.00',
      memoNo: '25,31,42,00.00',
      memoDate: '11-Dec-2018',
      chequePaidDate: '11-Dec-2018',
      typeOfPayable: '49,35,06,000.00',
    },
    {
      srno: '1',
      chequeNo: '2002-03/02',
      ChequeDate: '11-Dec-2018',
      chequeAmount: '24,11,25,000.00',
      memoNo: '25,31,42,00.00',
      memoDate: '11-Dec-2018',
      chequePaidDate: '11-Dec-2018',
      typeOfPayable: '49,35,06,000.00',
    },
    {
      srno: '1',
      chequeNo: '2002-03/02',
      ChequeDate: '11-Dec-2018',
      chequeAmount: '24,11,25,000.00',
      memoNo: '25,31,42,00.00',
      memoDate: '11-Dec-2018',
      chequePaidDate: '11-Dec-2018',
      typeOfPayable: '49,35,06,000.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'chequeNo',
    'ChequeDate',
    'chequeAmount',
    'memoNo',
    'memoDate',
    'chequePaidDate',
    'typeOfPayable',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ) { }

  ngOnInit() {
    this.InstituteChequePaidForm = this.fb.group({     
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
