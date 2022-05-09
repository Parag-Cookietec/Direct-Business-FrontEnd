import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PenalInterestReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-penal-interest-report',
  templateUrl: './penal-interest-report.component.html',
  styleUrls: ['./penal-interest-report.component.css']
})
export class PenalInterestReportComponent implements OnInit {

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

  ELEMENT_DATA: PenalInterestReport[] = [
    {
    cin: 'ANDB1234543',
    paymentDate: '29/09/2018',
    dueDate: '29/09/2018',
    creditDate: '01/10/2018',
    dayDiff: '2',
    challanTotal: '2550.0',
    penalInterest: '2.0',
    sgstAmount: '1280.00',
    penalInterestSgst: '1.00'
    },
    {
      cin: 'ANDB1234543',
      paymentDate: '29/09/2018',
      dueDate: '29/09/2018',
      creditDate: '01/10/2018',
      dayDiff: '2',
      challanTotal: '2550.0',
      penalInterest: '2.0',
      sgstAmount: '1280.00',
      penalInterestSgst: '1.00'
      },
      {
        cin: 'ANDB1234543',
        paymentDate: '29/09/2018',
        dueDate: '29/09/2018',
        creditDate: '01/10/2018',
        dayDiff: '2',
        challanTotal: '2550.0',
        penalInterest: '2.0',
        sgstAmount: '1280.00',
        penalInterestSgst: '1.00'
        },
        {
          cin: 'ANDB1234543',
          paymentDate: '29/09/2018',
          dueDate: '29/09/2018',
          creditDate: '01/10/2018',
          dayDiff: '2',
          challanTotal: '2550.0',
          penalInterest: '2.0',
          sgstAmount: '1280.00',
          penalInterestSgst: '1.00'
          },
          {
            cin: 'ANDB1234543',
            paymentDate: '29/09/2018',
            dueDate: '29/09/2018',
            creditDate: '01/10/2018',
            dayDiff: '2',
            challanTotal: '2550.0',
            penalInterest: '2.0',
            sgstAmount: '1280.00',
            penalInterestSgst: '1.00'
            },
            {
              cin: 'ANDB1234543',
              paymentDate: '29/09/2018',
              dueDate: '29/09/2018',
              creditDate: '01/10/2018',
              dayDiff: '2',
              challanTotal: '2550.0',
              penalInterest: '2.0',
              sgstAmount: '1280.00',
              penalInterestSgst: '1.00'
              }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  panelInterestReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'cin', 'paymentDate', 'dueDate', 'creditDate', 'dayDiff', 'challanTotal', 'penalInterest','sgstAmount','penalInterestSgst'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.panelInterestReportForm = this.panelInterestReportData();
  }

  panelInterestReportData() {
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
