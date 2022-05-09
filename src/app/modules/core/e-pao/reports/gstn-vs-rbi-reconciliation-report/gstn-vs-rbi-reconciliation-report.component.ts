import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GstnVsRbiReconcilReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-gstn-vs-rbi-reconciliation-report',
  templateUrl: './gstn-vs-rbi-reconciliation-report.component.html',
  styleUrls: ['./gstn-vs-rbi-reconciliation-report.component.css']
})
export class GstnVsRbiReconciliationReportComponent implements OnInit {

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

  ELEMENT_DATA: GstnVsRbiReconcilReport[] = [
    {
      perticulars: 'TOTAL AMOUNT AS PER GSTV DATA(A)',
      amount: '1,52,34,34,234.00'
    },
    {
      perticulars: 'DATA RECVED FROM GSTN BUT NOT FROM RBI(B)',
      amount: '11,59,509.00'
    },
    {
      perticulars: 'TOTAL AMOUNT AS PER GSTV DATA(A)',
      amount: '1,52,34,34,234.00'
    },
    {
      perticulars: 'DATA RECVED FROM GSTN BUT NOT FROM RBI(B)',
      amount: '11,59,509.00'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  gstnVrbiReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['perticulars','amount'];
  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.gstnVrbiReportForm = this.gstnVrbiReportData();
  }

  gstnVrbiReportData() {
    return this.fb.group({
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
