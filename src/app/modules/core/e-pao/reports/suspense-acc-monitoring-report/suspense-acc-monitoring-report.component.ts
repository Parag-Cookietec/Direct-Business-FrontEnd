import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuspenseAccMonitReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-suspense-acc-monitoring-report',
  templateUrl: './suspense-acc-monitoring-report.component.html',
  styleUrls: ['./suspense-acc-monitoring-report.component.css']
})
export class SuspenseAccMonitoringReportComponent implements OnInit {

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

  ELEMENT_DATA: SuspenseAccMonitReport[] = [
    {
      bankName: 'AXIX BANK',
      noOfTransactions: '10',
      amount: '5000.00'
    },
    {
      bankName: 'HDFC BANK',
      noOfTransactions: '10',
      amount: '5000.00'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  susAccMonReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo','bankName', 'noOfTransactions', 'amount'];
  newdisplayedNumColumns: string[] = ['1','2','3','4']
  newdisplayedFooterColumns: string[] =['srNo','bankName', 'noOfTransactions', 'amount'];
  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.susAccMonReportForm = this.susAccMOnReportData();
  }

  susAccMOnReportData() {
    return this.fb.group({
      fromDate: [''],
      toDate: [''],
      asOnDate:['']
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
