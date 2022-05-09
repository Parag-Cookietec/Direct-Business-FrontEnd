import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../../services/nssf-loan.service';
import * as moment from 'moment';
interface InstitueName {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-Challan-No-Wises',
  templateUrl: './Challan-No-Wise.component.html',
  styleUrls: ['./Challan-No-Wise.component.css']
})
export class ChallanNoWiseComponent implements OnInit {

  ChallanNoWiseForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();

  InstitueNames: InstitueName[] = [
    {value: 'NABARD-0', viewValue: 'NABARD'},
    {value: 'NCDC-1', viewValue: 'NCDC'},
    {value: 'OBC-2', viewValue: 'OBC'},
    {value: 'SBI-3', viewValue: 'SBI'}
  ];

  Element_Data: any[] = [
    {
      srno: '28',
      departmentName: 'Food and Civil Supply',
      refrenceNo: 'NIL',
      refrenceDate: '30/03/2000',
      tranche: 'XXV',
      scheme: 'RIDF',
      purpose: 'SAUNI Yojana Link 3 Package 7',
      amount: '100000.00',
    },
    {
      srno: '28',
      departmentName: 'Food and Civil Supply',
      refrenceNo: 'NIL',
      refrenceDate: '30/03/2000',
      tranche: 'XXV',
      scheme: 'RIDF',
      purpose: 'SAUNI Yojana Link 3 Package 7',
      amount: '100000.00',
    },
    {
      srno: '28',
      departmentName: 'Food and Civil Supply',
      refrenceNo: 'NIL',
      refrenceDate: '30/03/2000',
      tranche: 'XXV',
      scheme: 'RIDF',
      purpose: 'SAUNI Yojana Link 3 Package 7',
      amount: '100000.00',
    },
    {
      srno: '28',
      departmentName: 'Food and Civil Supply',
      refrenceNo: 'NIL',
      refrenceDate: '30/03/2000',
      tranche: 'XXV',
      scheme: 'RIDF',
      purpose: 'SAUNI Yojana Link 3 Package 7',
      amount: '100000.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'departmentName',
    'refrenceNo',
    'refrenceDate',
    'tranche',
    'scheme',
    'purpose',
    'amount',
    ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.ChallanNoWiseForm = this.fb.group({
      loanNo: [''],
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
