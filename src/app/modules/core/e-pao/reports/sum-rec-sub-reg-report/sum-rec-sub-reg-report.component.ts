import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SRSReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-sum-rec-sub-reg-report',
  templateUrl: './sum-rec-sub-reg-report.component.html',
  styleUrls: ['./sum-rec-sub-reg-report.component.css']
})
export class SumRecSubRegReportComponent implements OnInit {

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  ELEMENT_DATA: SRSReport[] = [
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    },
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    },
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    },
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    },
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    },
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    },
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    },
    {
      bankName: 'SBI',
      noOfTransactions: '10',
      sgstTax: '800.00',
      sgstInterest: '0.00',
      sgstFees: '100.00',
      sgstPenalty: '0.00',
      sgstOthers: '0.00',
      ratAmount: '185.00',
      totalAmount: '985.00'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  summaryRSRReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['bankName', 'noOfTransactions', 'sgstTax', 'sgstInterest', 'sgstFees', 'sgstPenalty', 'sgstOthers', 'ratAmount', 'totalAmount'];
  newdisplayedColumns1: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  newdisplayedFooterColumns: string[] = ['bankName', 'noOfTransactions', 'sgstTax', 'sgstInterest', 'sgstFees', 'sgstPenalty', 'sgstOthers', 'ratAmount', 'totalAmount'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.summaryRSRReportForm = this.summaryRSRReportData();
  }

  summaryRSRReportData() {
    return this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  onPressPrint(content) {
    let printContents = document.getElementById(content).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  setDataSourceAttributes() {
    this.newdataSource.paginator = this.paginator;
    this.newdataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.newdataSource.filter = filterValue;
  }



  totalCalculation(num): number {
    switch (num) {
      case 0:
        return this.newdataSource.data.map(it => it.noOfTransactions).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      case 1:
        return this.newdataSource.data.map(it => it.sgstTax).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      case 2:
        return this.newdataSource.data.map(it => it.sgstInterest).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      case 3:
        return this.newdataSource.data.map(it => it.sgstFees).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      case 4:
        return this.newdataSource.data.map(it => it.sgstPenalty).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      case 5:
        return this.newdataSource.data.map(it => it.sgstOthers).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      case 6:
        return this.newdataSource.data.map(it => it.ratAmount).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      case 7:
        return this.newdataSource.data.map(it => it.totalAmount).reduce(function (prev, curr) {
          return (Number(prev) || 0) + (Number(curr) || 0);
        });
        break;
      default:
        return 0;
        break;
    }
  }


}
