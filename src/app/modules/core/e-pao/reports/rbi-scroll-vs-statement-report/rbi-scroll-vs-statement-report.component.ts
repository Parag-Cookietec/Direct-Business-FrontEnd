import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RbiScrollVsAccStReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-rbi-scroll-vs-statement-report',
  templateUrl: './rbi-scroll-vs-statement-report.component.html',
  styleUrls: ['./rbi-scroll-vs-statement-report.component.css']
})
export class RbiScrollVsStatementReportComponent implements OnInit {


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

  ELEMENT_DATA: RbiScrollVsAccStReport[] = [
    {
      date: 'feb-2018',
      noOfScroll: '10',
      scrollAmt: '100',
      noOfTxn: '50',
      amount: '500',
      noOfTxnDiff: '40'
    },
    {
      date: 'march-2018',
      noOfScroll: '10',
      scrollAmt: '100',
      noOfTxn: '50',
      amount: '500',
      noOfTxnDiff: '40'
    },
    {
      date: 'apr-2018',
      noOfScroll: '10',
      scrollAmt: '100',
      noOfTxn: '50',
      amount: '500',
      noOfTxnDiff: '40',
    },
    {
      date: 'may-2018',
      noOfScroll: '10',
      scrollAmt: '100',
      noOfTxn: '50',
      amount: '500',
      noOfTxnDiff: '40',
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  dtwiseCinDataReportForm: FormGroup;

  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['date','noOfScroll','scrollAmt','noOfTxn','amount','noOfTxnDiff'];
  newdisplayedFooterColumns: string[] = ['date','noOfScroll','scrollAmt','noOfTxn','amount','noOfTxnDiff']; 

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.dtwiseCinDataReportForm = this.dtwiseCinDataReportData();
  }

  dtwiseCinDataReportData() {
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

}
