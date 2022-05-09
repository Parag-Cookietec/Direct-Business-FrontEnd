import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SummaryPenalInterestReport } from 'src/app/models/e-pao/epaoModel';


@Component({
  selector: 'app-summary-penal-interest-report',
  templateUrl: './summary-penal-interest-report.component.html',
  styleUrls: ['./summary-penal-interest-report.component.css']
})
export class SummaryPenalInterestReportComponent implements OnInit {

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

  ELEMENT_DATA: SummaryPenalInterestReport[] = [
    {
      nameOfBank: 'ANDHARA BANK',
      noOfTransactions: '10',
      panelInterest: '2.50'
    },
    {
      nameOfBank: 'ANDHARA BANK',
      noOfTransactions: '10',
      panelInterest: '2.50'
    },
    {
      nameOfBank: 'ANDHARA BANK',
      noOfTransactions: '10',
      panelInterest: '2.50'
    },
    {
      nameOfBank: 'ANDHARA BANK',
      noOfTransactions: '10',
      panelInterest: '2.50'
    },
    {
      nameOfBank: 'ANDHARA BANK',
      noOfTransactions: '10',
      panelInterest: '2.50'
    },
    {
      nameOfBank: 'ANDHARA BANK',
      noOfTransactions: '10',
      panelInterest: '2.50'
    },
    {
      nameOfBank: 'ANDHARA BANK',
      noOfTransactions: '10',
      panelInterest: '2.50'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  summaryPIReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'nameOfBank', 'noOfTransactions', 'panelInterest'];
  newdisplayedFooterColumns: string[] = ['srNo', 'nameOfBank','noOfTransactions', 'panelInterest'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.summaryPIReportForm = this.summaryPIReportData();
  }

  summaryPIReportData() {
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
