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
import { EodWIseEodCpinReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-eod-wise-cpin-eod-report',
  templateUrl: './eod-wise-cpin-eod-report.component.html',
  styleUrls: ['./eod-wise-cpin-eod-report.component.css']
})
export class EodWiseCpinEodReportComponent implements OnInit {

 
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
 
 
   ELEMENT_DATA: EodWIseEodCpinReport[] = [
     {
      gstin: '24AASD3E44',
      cpin: '1231444',
      bank: 'SBIN',
      cpinDate: '2017-07-31',
      sgstTax:'69915',
      sgstIntr: '0',
      sgstFee: '0',
      sgstPenalty: '0',
      sgstOther:'0',
      sgstTotal:'69915',
      paymentMode:'EPY'
     },
     {
      gstin: '24AASD3E44',
      cpin: '1231444',
      bank: 'SBIN',
      cpinDate: '2017-07-31',
      sgstTax:'69915',
      sgstIntr: '0',
      sgstFee: '0',
      sgstPenalty: '0',
      sgstOther:'0',
      sgstTotal:'69915',
      paymentMode:'EPY'
     },
     {
      gstin: '24AASD3E44',
      cpin: '1231444',
      bank: 'SBIN',
      cpinDate: '2017-07-31',
      sgstTax:'69915',
      sgstIntr: '0',
      sgstFee: '0',
      sgstPenalty: '0',
      sgstOther:'0',
      sgstTotal:'69915',
      paymentMode:'EPY'
     },
     {
      gstin: '24AASD3E44',
      cpin: '1231444',
      bank: 'SBIN',
      cpinDate: '2017-07-31',
      sgstTax:'69915',
      sgstIntr: '0',
      sgstFee: '0',
      sgstPenalty: '0',
      sgstOther:'0',
      sgstTotal:'69915',
      paymentMode:'EPY'
     }
   ];
   // date
   maxDate = new Date();
   todayDate = new Date();
   // form group
   regCinDataReportForm: FormGroup;
 
   // table source
   newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
   newdisplayedColumns: string[] = ['srNo', 'gstin', 'cpin', 'bank', 'cpinDate','sgstTax','sgstIntr','sgstFee',
   'sgstPenalty','sgstOther','sgstTotal', 'paymentMode'];
   
 
   constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }
   directiveObject = new EPaoDirectives(this.router, this.dialog);
   // error message
   public errorMessages;
   ngOnInit() {
     this.errorMessages = EPOAMessage;
     this.regCinDataReportForm = this.regCinData();
   }
 
   regCinData() {
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
