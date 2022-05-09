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
import { TopNTaxPayerReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-top-n-taxpayer-report',
  templateUrl: './top-n-taxpayer-report.component.html',
  styleUrls: ['./top-n-taxpayer-report.component.css']
})
export class TopNTaxpayerReportComponent implements OnInit {

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
 
 
   ELEMENT_DATA: TopNTaxPayerReport[] = [
     {
      gstin: 'WEWQE2324234',
      partyName: 'test',
      challanCount: '243',
      amount: '2,175.00'
     },
     {
      gstin: 'WEWQE2324234',
      partyName: 'test',
      challanCount: '243',
      amount: '2,175.00'
     },
     {
      gstin: 'WEWQE2324234',
      partyName: 'test',
      challanCount: '243',
      amount: '2,175.00'
     }
   ];
   // date
   maxDate = new Date();
   todayDate = new Date();
   // form group
   rbdRegReportForm: FormGroup;
 
   // table source
   newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
   newdisplayedColumns: string[] = ['srNo', 'gstin', 'partyName', 'challanCount', 'amount' ];
                                   
   newdisplayedFooterColumns: string[] =   ['srNo', 'gstin', 'partyName', 'challanCount', 'amount' ];
 
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
       toDate: [''],
       countOfTaxPayer:['']
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
