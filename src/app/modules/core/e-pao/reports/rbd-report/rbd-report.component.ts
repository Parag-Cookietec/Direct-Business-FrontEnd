import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { RBDregister } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-rbd-report',
  templateUrl: './rbd-report.component.html',
  styleUrls: ['./rbd-report.component.css']
})
export class RbdReportComponent implements OnInit {
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


  ELEMENT_DATA: RBDregister[] = [
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },
    {
      date: '2-Jul-2020',
      openingBalance: '20000.00',
      receipt: '1212121',
      payment: '20000.00',
      closingBalance:'20000.00',
      amount: '20000.00',
      remark: '',
      daSign: 'test',
      haSign:'test',
      aoSign:'test'
    },

  ];
  // date
  maxDate = new Date();
  todayDate = new Date();
  // form group
  rbdRegReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'date', 'openingBalance', 'receipt', 'closingBalance','amount','remark','daSign','haSign','aoSign'];
  newdisplayedFooterColumns: string[] = ['date', 'openingBalance', 'receipt', 'closingBalance','amount','remark','daSign','haSign','aoSign'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }
  directiveObject = new EPaoDirectives(this.router, this.dialog);
  // error message
  public errorMessages;
  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.rbdRegReportForm = this.rbdRegReportData();
  }

  rbdRegReportData() {
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
