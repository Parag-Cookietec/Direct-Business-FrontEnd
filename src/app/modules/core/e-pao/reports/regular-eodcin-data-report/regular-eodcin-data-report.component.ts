import { group } from '@angular/animations';
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
import { RegularEodCinDataReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-regular-eodcin-data-report',
  templateUrl: './regular-eodcin-data-report.component.html',
  styleUrls: ['./regular-eodcin-data-report.component.css']
})
export class RegularEodcinDataReportComponent implements OnInit {


 
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
 
 
   ELEMENT_DATA: RegularEodCinDataReport[] = [
     {
      date: '07/11/2018',
      noOfTransaction: '5',
      amount: '100'
     },
     {
      date: '07/11/2018',
      noOfTransaction: '5',
      amount: '100'
     }
   ];
   // date
   maxDate = new Date();
   todayDate = new Date();
   // form group
   regEodCinDataReportForm: FormGroup;
 
   // table source
   newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
   newdisplayedColumns: string[] = ['srNo','date','noOfTransaction','amount'];
   
 
   constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }
   directiveObject = new EPaoDirectives(this.router, this.dialog);
   // error message
   public errorMessages;
   ngOnInit() {
     this.errorMessages = EPOAMessage;
     this.regEodCinDataReportForm = this.regEodCinData();
   }
 
   regEodCinData() {
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
