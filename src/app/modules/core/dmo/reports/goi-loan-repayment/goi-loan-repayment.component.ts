import { CommonDirective } from '../../../../../shared/directive/validation.directive.js';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-goi-loan-repayment',
  templateUrl: './goi-loan-repayment.component.html',
  styleUrls: ['./goi-loan-repayment.component.css']
})
export class GoiLoanRepaymentComponent implements OnInit {

  errorMessages = dmoMessage;
  todayDate = new Date();

  goiLoanRepaymentForm: FormGroup;

  directiveObj = new CommonDirective();
  ismatchWithPayable = false;

  // table data
  Element_Data: any[] = [
    {
      memoNo: '1',
      adviceNo: '1',
      dpDate: '01-Apr-2015',
      adviceDate: '01-Apr-2015',
      adviceBy: 'NAGALAND',
      transactionDescription: 'Other IGA Transaction',
      debitAmount: '50000.00',
    },
    {
      memoNo: '2',
      adviceNo: '2',
      dpDate: '04-Jan-2017',
      adviceDate: '04-Jan-2017',
      adviceBy: 'ASSAM',
      transactionDescription: 'GIA',
      debitAmount: '10000.00',
      addDetails: 'Add Details',
    },
    {
      memoNo: '2',
      adviceNo: '2',
      dpDate: '07-Jan-2017',
      adviceDate: '07-Jan-2017',
      adviceBy: 'NAGALAND',
      transactionDescription: 'GIA',
      debitAmount: '1000000.00',
      addDetails: 'Add Details',
    },
    {
      memoNo: '28',
      adviceNo: '108',
      dpDate: '11-Dec-2018',
      adviceDate: '11-Dec-2018',
      adviceBy: 'RAJASTHAN',
      transactionDescription: '9.50% NSSF Loan',
      debitAmount: '1000000.00',
    },

  ];
  payableAmountData: any[] = [
    {
      ministryDeptName: 'Ministry Of Industry - Dept. Of Indusrtry Development',
      schemeName: 'Transmission and Distribution',
      srPageNo: '',
      dueDate: new Date('06-30-2019'),
      loanAmount: '80,00,00,000.00',
      interestRate: '9.5',
      loanOutstanding: '80,00,00,000.00',
      payablePrincipal: '4,00,00,000.00',
      payableInterest: '3,80,00,000.00',
      paidPrincipal: '4,00,00,000.00',
      paidInterest: '3,80,00,000.00',
    },
    {
      ministryDeptName: '-',
      schemeName: 'Transmission and Distribution',
      srPageNo: '',
      dueDate: new Date('12-30-2019'),
      loanAmount: '80,00,00,000.00',
      interestRate: '9.5',
      loanOutstanding: '76,00,00,000.00',
      payablePrincipal: '0.00',
      payableInterest: '3,61,00,000.00',
      paidPrincipal: '0.00',
      paidInterest: '3,61,00,000.00',
    },
    {
      ministryDeptName: '-',
      schemeName: 'Transmission and Distribution',
      srPageNo: '',
      dueDate: new Date('06-30-2019'),
      loanAmount: '80,00,00,000.00',
      interestRate: '9.5',
      loanOutstanding: '76,00,00,000.00',
      payablePrincipal: '4,00,00,000.00',
      payableInterest: '3,61,00,000.00',
      paidPrincipal: '4,00,00,000.00',
      paidInterest: '3,61,00,000.00',
    },
    {
      ministryDeptName: '-',
      schemeName: 'Transmission and Distribution',
      srPageNo: '',
      dueDate: new Date('06-30-2019'),
      loanAmount: '80,00,00,000.00',
      interestRate: '9.5',
      loanOutstanding: '72,00,00,000.00',
      payablePrincipal: '0.00',
      payableInterest: '3,42,00,000.00',
      paidPrincipal: '0.00',
      paidInterest: '3,42,00,000.00',
    },
  ];
  matchWithPayableData: any[] = [
    {
      memoNo: '1',
      adviceNo: '1',
      dueDate: new Date('01-31-2027'),
      principal: '2500.00',
      interest: '0.00',
      amountUnpaid: '2500.00',
      amountPaid: '0.00',
      amountOutstanding: '32500.00',
    },
  ];

  dataSource = new MatTableDataSource<any>(this.Element_Data);
  payableAmountsDataSource = new MatTableDataSource<any>(this.payableAmountData);
  matchWithPayableDataSource = new MatTableDataSource<any>(this.matchWithPayableData);

  displayedColumns: any[] = [
    'select',
    'position',
    'memoNo',
    'adviceNo',
    'dpDate',
    'adviceDate',
    'adviceBy',
    'transactionDescription',
    'debitAmount',
  ];

  payableAmountsDisplayedColumns: any[] = [
    'select',
    'position',
    'ministryDeptName',
    'schemeName',
    'srPageNo',
    'dueDate',
    'loanAmount',
    'interestRate',
    'loanOutstanding',
    'payablePrincipal',
    'payableInterest',
    'paidPrincipal',
    'paidInterest',
  ];

  matchWithPayableDisplayedColumns: any[] = [
    'memoNo',
    'adviceNo',
    'dueDate',
    'principal',
    'interest',
    'amountUnpaid',
    'amountPaid',
    'amountOutstanding',
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.goiLoanRepaymentForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      adviceByCode: [''],
      adviceDate: [''],
      adviceNo: [''],
    });
  }

  actualPayable() { }

  onCancelClick() {
    this.goiLoanRepaymentForm.reset();
  }

  onMatchWithPayable() {
    this.ismatchWithPayable = true;
  }

}
