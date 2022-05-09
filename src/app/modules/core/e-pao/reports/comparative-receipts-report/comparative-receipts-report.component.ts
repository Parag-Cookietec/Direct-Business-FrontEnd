import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComparativeReceiptReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-comparative-receipts-report',
  templateUrl: './comparative-receipts-report.component.html',
  styleUrls: ['./comparative-receipts-report.component.css']
})
export class ComparativeReceiptsReportComponent implements OnInit {
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

  ELEMENT_DATA: ComparativeReceiptReport[] = [
    {
      haedOfAcc: '24-224-24 SGST TAx Collection',
      budget: '1234,454.00',
      receipt: '1234,454.00',
      percentage: '9.00',
      budget1: '1234,454.00',
      receipt1: '1234,454.00',
      percentage1: '9.00',
      comp: '0.00'
    },
    {
      haedOfAcc: '24-224-24 SGST TAx Collection',
      budget: '1234,454.00',
      receipt: '1234,454.00',
      percentage: '9.00',
      budget1: '1234,454.00',
      receipt1: '1234,454.00',
      percentage1: '9.00',
      comp: '0.00'
    },
    {
      haedOfAcc: '24-224-24 SGST TAx Collection',
      budget: '1234,454.00',
      receipt: '1234,454.00',
      percentage: '9.00',
      budget1: '1234,454.00',
      receipt1: '1234,454.00',
      percentage1: '9.00',
      comp: '0.00'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  compRecReportForm: FormGroup;

  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo','haedOfAcc','budget','receipt','percentage','budget1','receipt1','percentage1','comp'];
  newdisplayedColumnsNum: string[] = ['0','1','2','3','4','5','6','7','8'];
 

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.compRecReportForm = this.compReceiptData();
  }

  compReceiptData() {
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
