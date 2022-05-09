import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PenalInterestReportTC } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-penal-interest-report-tc',
  templateUrl: './penal-interest-report-tc.component.html',
  styleUrls: ['./penal-interest-report-tc.component.css']
})
export class PenalInterestReportTcComponent implements OnInit {
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

  ELEMENT_DATA: PenalInterestReportTC[] = [
    {
      bankName: 'AXIS BANK',
      OpeningBalance: '2500.00',
      currentPenalInt: '2.0',
      totaAmtRec: '1280.00',
      recovAmount: '12.00',
      remAmount: '10.00',
      remark: 'test'
    },
    {
      bankName: 'AXIS BANK',
      OpeningBalance: '2500.00',
      currentPenalInt: '2.0',
      totaAmtRec: '1280.00',
      recovAmount: '12.00',
      remAmount: '10.00',
      remark: 'test'
    },
    {
      bankName: 'AXIS BANK',
      OpeningBalance: '2500.00',
      currentPenalInt: '2.0',
      totaAmtRec: '1280.00',
      recovAmount: '12.00',
      remAmount: '10.00',
      remark: 'test'
    },
    {
      bankName: 'AXIS BANK',
      OpeningBalance: '2500.00',
      currentPenalInt: '2.0',
      totaAmtRec: '1280.00',
      recovAmount: '12.00',
      remAmount: '10.00',
      remark: 'test'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  panelInterestTcReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'bankName', 'OpeningBalance', 'currentPenalInt', 'totaAmtRec', 'recovAmount', 'remAmount', 'remark'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.panelInterestTcReportForm = this.panelInterestTcReportData();
  }

  panelInterestTcReportData() {
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
