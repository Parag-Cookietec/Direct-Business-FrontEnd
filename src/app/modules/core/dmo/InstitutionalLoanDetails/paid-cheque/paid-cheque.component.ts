import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ListValue } from 'src/app/model/common-grant';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-paid-cheque',
  templateUrl: './paid-cheque.component.html',
  styleUrls: ['./paid-cheque.component.css']
})
export class PaidChequeComponent implements OnInit {

  paidChequeForm: FormGroup;
  errorMessages = dmoMessage;
  todayDate = new Date();
  // form controls
  chequeNoCtrl: FormControl = new FormControl();
  treasuryCtrl: FormControl = new FormControl();
  payableCtrl: FormControl = new FormControl();

  // lists
  chequeNoList: ListValue[] = [
    { value: '1', viewValue: '789456' },
    { value: '2', viewValue: '456789' },
  ];
  treasuryList: ListValue[] = [
    { value: '1', viewValue: 'Treasury Office, Amreli' },
    { value: '2', viewValue: 'Treasury Office, Anand' },
    { value: '3', viewValue: 'Treasury Office, Gandhinagar' },
  ];
  payableList: ListValue[] = [
    { value: '1', viewValue: 'Principle' },
    { value: '2', viewValue: 'Interest' },
  ];
  // Principle table data
  Element_Data_Principle: any[] = [
    {
      tranche: 'XII',
      accNo: 'RIDF-1149',
      principleRepay: '1500000.00',
      dueDate: '01-Dec-2020',
    },
    {
      tranche: 'XVII',
      accNo: 'RIDF-1150',
      principleRepay: '2000000.00',
      dueDate: '02-Dec-2020',
    },
    {
      tranche: 'XVIII',
      accNo: 'RIDF-1151',
      principleRepay: '15000000.00',
      dueDate: '10-Nov-2020',
    },
    {
      tranche: 'XXI',
      accNo: 'RIDF-1152',
      principleRepay: '10000000.00',
      dueDate: '21-Dec-2020',
    },

  ];
  // Interest table data
  Element_Data_Interest: any[] = [
    {
      tranche: 'XX',
      accNo: 'RIDF-1149',
      loanOutstand: '1500000.00',
      intRate: '6.5',
      fromDate: '01-Dec-2020',
      toDate: '21-Dec-2020',
      noDays: '98',
      interest: '169178.08',
      adjustment: '0.00',
      IntPayRound: '169178',
      prevPenalty: '0.00',
      rebate: '0.00',
    },
    {
      tranche: 'XX',
      accNo: 'RIDF-1149',
      loanOutstand: '1500000.00',
      intRate: '6.5',
      fromDate: '01-Dec-2020',
      toDate: '21-Dec-2020',
      noDays: '98',
      interest: '169178.08',
      adjustment: '0.00',
      IntPayRound: '169178',
      prevPenalty: '0.00',
      rebate: '0.00',
    },

  ];

  dataSource = new MatTableDataSource<any>(this.Element_Data_Principle);
  dataSourceInterest = new MatTableDataSource<any>(this.Element_Data_Interest);

  displayedColumns: any[] = [
    'position',
    'tranche',
    'accNo',
    'principleRepay',
    'dueDate',
  ];

  displayedColumnsInterest: any[] = [
    'position',
    'tranche',
    'accNo',
    'loanOutstand',
    'intRate',
    'fromDate',
    'toDate',
    'noDays',
    'interest',
    'adjustment',
    'IntPayRound',
    'prevPenalty',
    'rebate',
  ];
  directiveObj = new CommonDirective();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.paidChequeForm = this.fb.group({
      chequeNo: [''],
      chequeDate: [''],
      treasury: [''],
      chequePaidDate: [''],
      payableType: ['']
    });
  }

}
