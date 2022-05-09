import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuspensePlusMinusReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-suspense-plus-minus-report',
  templateUrl: './suspense-plus-minus-report.component.html',
  styleUrls: ['./suspense-plus-minus-report.component.css']
})
export class SuspensePlusMinusReportComponent implements OnInit {
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

  ELEMENT_DATA: SuspensePlusMinusReport[] = [
    {
      headDescription: '001-233-4344-444',
      bank: 'DENA BANK',
      OpeningBalance: '0.00',
      debit: '46,37,543.00',
      credit: '46,37,543.00',
      closingBalance: '0.00'
    },
    {
      headDescription: '001-233-4344-444',
      bank: 'DENA BANK',
      OpeningBalance: '0.00',
      debit: '46,37,543.00',
      credit: '46,37,543.00',
      closingBalance: '0.00'
    },
    {
      headDescription: '001-233-4344-444',
      bank: 'DENA BANK',
      OpeningBalance: '0.00',
      debit: '46,37,543.00',
      credit: '46,37,543.00',
      closingBalance: '0.00'
    },
    {
      headDescription: '001-233-4344-444',
      bank: 'DENA BANK',
      OpeningBalance: '0.00',
      debit: '46,37,543.00',
      credit: '46,37,543.00',
      closingBalance: '0.00'
    },
    {
      headDescription: '001-233-4344-444',
      bank: 'DENA BANK',
      OpeningBalance: '0.00',
      debit: '46,37,543.00',
      credit: '46,37,543.00',
      closingBalance: '0.00'
    },
    {
      headDescription: '001-233-4344-444',
      bank: 'DENA BANK',
      OpeningBalance: '0.00',
      debit: '46,37,543.00',
      credit: '46,37,543.00',
      closingBalance: '0.00'
    },
    {
      headDescription: '001-233-4344-444',
    bank: 'DENA BANK',
    OpeningBalance: '0.00',
    debit: '46,37,543.00',
    credit: '46,37,543.00',
    closingBalance: '0.00'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  susPlusMinusReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'headDescription', 'bank', 'OpeningBalance', 'debit', 'credit', 'closingBalance'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.susPlusMinusReportForm = this.susPlusMinusReportData();
  }

  susPlusMinusReportData() {
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
