import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { workloadReport } from 'src/app/models/e-pao/epaoModel';

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
  selector: 'app-workload-report',
  templateUrl: './workload-report.component.html',
  styleUrls: ['./workload-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMAT},
  ]
})
export class WorkloadReportComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;

  workloadReportForm: FormGroup;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  ELEMENT_DATA: workloadReport[] = [
    {
      branch: 'Receipt-1',
      name: 'SACHIN DESHMUKH',
      challanAlloted: '32020',
      challanPosted: '31648',
      challanPending: '872',
      moeRaised: '0',
      moeResolved: '0',
      againstChallanAlloted: '97.32',
      againstNorms: '15.82'
    },
    { 
      branch: '',
      name: 'SACHIN DESHMUKH',
      challanAlloted: '32020',
      challanPosted: '31648',
      challanPending: '872',
      moeRaised: '0',
      moeResolved: '0',
      againstChallanAlloted: '97.32',
      againstNorms: '15.82'
    },
    {
      branch: '',
      name: 'SACHIN DESHMUKH',
      challanAlloted: '32020',
      challanPosted: '31648',
      challanPending: '872',
      moeRaised: '0',
      moeResolved: '0',
      againstChallanAlloted: '97.32',
      againstNorms: '15.82'
    },
    {
      branch: 'Receipt-2',
      name: 'SACHIN DESHMUKH',
      challanAlloted: '32020',
      challanPosted: '31648',
      challanPending: '872',
      moeRaised: '0',
      moeResolved: '0',
      againstChallanAlloted: '97.32',
      againstNorms: '15.82'
    },
    {
      branch: '',
      name: 'SACHIN DESHMUKH',
      challanAlloted: '32020',
      challanPosted: '31648',
      challanPending: '872',
      moeRaised: '0',
      moeResolved: '0',
      againstChallanAlloted: '97.32',
      againstNorms: '15.82'
    },
    {
      branch: '',
      name: 'SACHIN DESHMUKH',
      challanAlloted: '32020',
      challanPosted: '31648',
      challanPending: '872',
      moeRaised: '0',
      moeResolved: '0',
      againstChallanAlloted: '97.32',
      againstNorms: '15.82'
    }
  ]; 



  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['branch','name', 'challanAlloted', 'challanPosted', 'challanPending', 'moeRaised',
                                   'moeResolved', 'againstChallanAlloted', 'againstNorms'];

  newdisplayedFooterColumns: string[] = ['branch','name', 'challanAlloted', 'challanPosted', 'challanPending', 'moeRaised',
                                          'moeResolved', 'againstChallanAlloted', 'againstNorms'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) {}

  directiveObject = new EPaoDirectives(this.router, this.dialog);
  

  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.workloadReportForm = this.workloadReportData();
  }

  workloadReportData() { 
    return this.fb.group({
      fromDate: ['']
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
