import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { RbiScrillWiseReport } from 'src/app/models/e-pao/epaoModel';


export const MY_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-rbi-scroll-wise-monitoring-report',
  templateUrl: './rbi-scroll-wise-monitoring-report.component.html',
  styleUrls: ['./rbi-scroll-wise-monitoring-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMAT},
  ]
})
export class RbiScrollWiseMonitoringReportComponent implements OnInit {

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

  ELEMENT_DATA: RbiScrillWiseReport[] = [
    {
      date: '01/07/2017',
      noOfTxnCin: '10',
      amountCin: '6,108.00',
      noOfTxnCinEod: '21,23,234.00',
      amountCinEod: '10',
      noOfTxnDiff: '6,108.00',
      amountDiff: '21,23,234.00',
      noOfTxnDiff1: '10',
      amountDiff1: '6,108.00',
      noOfTxnDiff2: '21,23,234.00',
      amountDiff2: '10',
      noOfTxnDiff3: '6,108.00',
      amountDiff3: '21,23,234.00',
      noOfTxnDiff4: '10',
      amountDiff4: '6,108.00', 
      noOfTxnDiff5: '21,23,234.00'
    },
    {
      date: '01/07/2017',
      noOfTxnCin: '10',
      amountCin: '6,108.00',
      noOfTxnCinEod: '21,23,234.00',
      amountCinEod: '10',
      noOfTxnDiff: '6,108.00',
      amountDiff: '21,23,234.00',
      noOfTxnDiff1: '10',
      amountDiff1: '6,108.00',
      noOfTxnDiff2: '21,23,234.00',
      amountDiff2: '10',
      noOfTxnDiff3: '6,108.00',
      amountDiff3: '21,23,234.00',
      noOfTxnDiff4: '10',
      amountDiff4: '6,108.00', 
      noOfTxnDiff5: '21,23,234.00'
    },
    {
      date: '01/07/2017',
      noOfTxnCin: '10',
      amountCin: '6,108.00',
      noOfTxnCinEod: '21,23,234.00',
      amountCinEod: '10',
      noOfTxnDiff: '6,108.00',
      amountDiff: '21,23,234.00',
      noOfTxnDiff1: '10',
      amountDiff1: '6,108.00',
      noOfTxnDiff2: '21,23,234.00',
      amountDiff2: '10',
      noOfTxnDiff3: '6,108.00',
      amountDiff3: '21,23,234.00',
      noOfTxnDiff4: '10',
      amountDiff4: '6,108.00', 
      noOfTxnDiff5: '21,23,234.00'
    },
    {
      date: '01/07/2017',
      noOfTxnCin: '10',
      amountCin: '6,108.00',
      noOfTxnCinEod: '21,23,234.00',
      amountCinEod: '10',
      noOfTxnDiff: '6,108.00',
      amountDiff: '21,23,234.00',
      noOfTxnDiff1: '10',
      amountDiff1: '6,108.00',
      noOfTxnDiff2: '21,23,234.00',
      amountDiff2: '10',
      noOfTxnDiff3: '6,108.00',
      amountDiff3: '21,23,234.00',
      noOfTxnDiff4: '10',
      amountDiff4: '6,108.00', 
      noOfTxnDiff5: '21,23,234.00'
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
  newdisplayedColumns: string[] = ['date','noOfTxnCin','amountCin','noOfTxnCinEod','amountCinEod','noOfTxnDiff','amountDiff',
                                   'noOfTxnDiff1','amountDiff1','noOfTxnDiff2','amountDiff2','noOfTxnDiff3','amountDiff3',
                                   'noOfTxnDiff4','amountDiff4','noOfTxnDiff5'];
  newdisplayedColumnsNum: string[] = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
 

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.dtwiseCinDataReportForm = this.dtwiseCinDataReportData();
  }

  dtwiseCinDataReportData() {
    return this.fb.group({
      date: ['']
    });
  }

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
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
