import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuppAccReport } from 'src/app/models/e-pao/epaoModel';

@Component({
  selector: 'app-supplementary-account-report',
  templateUrl: './supplementary-account-report.component.html',
  styleUrls: ['./supplementary-account-report.component.css']
})
export class SupplementaryAccountReportComponent implements OnInit {
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

  ELEMENT_DATA: SuppAccReport[] = [
    {
      hoAccount: '0006-00-101-01-00-0000',
      description: 'Tax receipts under SGST',
      amount:' 17,293,968,500.00'
    },
    {
      hoAccount: '0006-00-102-01-00-0000',
      description: 'Interest receipts under SGST',
      amount: '4,429,575.00'
    },
    {
      hoAccount: '0006-00-103-01-00-0000',
      description: 'Penalty receipts under SGST',
      amount: '450,870.00'
    },
    {
      hoAccount: '0006-00-104-01-00-0000',
      description: 'Fees receipts under SGST',
      amount: '5,369,677.00'
    },
    {
      hoAccount: '0006-00-109-01-00-0000',
      description: 'Sale proceeds of Confiscated Goods',
      amount: '0.00'
    },
    {
      hoAccount: '0006-00-109-01-00-0000',
      description: 'Fees, Fines & Penalties with ref. to Confiscated Goods',
      amount: '0.00'
    },
    {
      hoAccount: '0006-00-101-01-00-0000',
      description: 'Receipts Awaiting Transfer',
      amount: '17,304,491,897.00'
    },
    {
      hoAccount: '0006-00-101-01-00-0000',
      description: 'Others receipts under SGST',
      amount: '0.00'
    }
  ];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  supAccountReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['hoAccount', 'description', 'amount'];
  newdisplayedFooterColumns: string[] = ['hoAccount','description', 'amount'];

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder,) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.supAccountReportForm = this.supAccountReportData();
  }


  supAccountReportData() {
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

  totalAmmount(): number {
    let amountExp = 0;
    this.newdataSource.data.forEach((element) => {
      amountExp = amountExp + element.amount;
    });
    return amountExp;
  }

}
