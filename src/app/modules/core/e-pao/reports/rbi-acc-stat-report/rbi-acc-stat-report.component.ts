import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RbiAccStatReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-rbi-acc-stat-report',
  templateUrl: './rbi-acc-stat-report.component.html',
  styleUrls: ['./rbi-acc-stat-report.component.css']
})
export class RbiAccStatReportComponent implements OnInit {

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

  ELEMENT_DATA: RbiAccStatReport[] = [
    {
      totCreditEntry: '50',
      totDebitEntry: '1',
      openingBal: '21,22,12,232.00',
      credit: '21,22,12,232.00',
      debit: '21,22,12,232.00',
      closingBal: '21,22,12,232.00',
      scrollNumber: 'CFF343433CX2323',
      scrollDt: '01/12/2018',
      crdrIndi: 'CRDT',
      revIndicator:'FALSE',
      actAccCrDt:'01/12/2018',
      entryAmt: '1,23,23,232.00',
      entryRefNo: '2323343434'

    },
    {
      totCreditEntry: '50',
      totDebitEntry: '1',
      openingBal: '21,22,12,232.00',
      credit: '21,22,12,232.00',
      debit: '21,22,12,232.00',
      closingBal: '21,22,12,232.00',
      scrollNumber: 'CFF343433CX2323',
      scrollDt: '01/12/2018',
      crdrIndi: 'CRDT',
      revIndicator:'FALSE',
      actAccCrDt:'01/12/2018',
      entryAmt: '1,23,23,232.00',
      entryRefNo: '2323343434'

    },
    {
      totCreditEntry: '50',
      totDebitEntry: '1',
      openingBal: '21,22,12,232.00',
      credit: '21,22,12,232.00',
      debit: '21,22,12,232.00',
      closingBal: '21,22,12,232.00',
      scrollNumber: 'CFF343433CX2323',
      scrollDt: '01/12/2018',
      crdrIndi: 'CRDT',
      revIndicator:'FALSE',
      actAccCrDt:'01/12/2018',
      entryAmt: '1,23,23,232.00',
      entryRefNo: '2323343434'

    },
    {
      totCreditEntry: '50',
      totDebitEntry: '1',
      openingBal: '21,22,12,232.00',
      credit: '21,22,12,232.00',
      debit: '21,22,12,232.00',
      closingBal: '21,22,12,232.00',
      scrollNumber: 'CFF343433CX2323',
      scrollDt: '01/12/2018',
      crdrIndi: 'CRDT',
      revIndicator:'FALSE',
      actAccCrDt:'01/12/2018',
      entryAmt: '1,23,23,232.00',
      entryRefNo: '2323343434'

    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  rbiAccStatReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'totCreditEntry', 'totDebitEntry', 'openingBal', 'credit', 'debit', 'closingBal', 
  'scrollNumber','scrollDt','crdrIndi','revIndicator','actAccCrDt','entryAmt','entryRefNo'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.rbiAccStatReportForm = this.rbiAccStatReportData();
  }

  rbiAccStatReportData() {
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
