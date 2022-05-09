import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManualAccReport } from 'src/app/models/e-pao/epaoModel';
import { ReportsService } from '../../services/reports/reports.service';
import { DatePipe } from '@angular/common';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-manual-acc-report',
  templateUrl: './manual-acc-report.component.html',
  styleUrls: ['./manual-acc-report.component.css']
})
export class ManualAccReportComponent implements OnInit {

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

  ELEMENT_DATA: ManualAccReport[] = [];

  // date
  maxDate = new Date();
  todayDate = new Date();

  // error message
  public errorMessages;

  // form group
  manualAccReportForm: FormGroup;

  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo','trRefNo', 'refNo', 'dcHead', 'cdHead','amount', 'type', 'status'];
  newdisplayedColumns1: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  newdisplayedFooterColumns: string[] =['srNo','trRefNo', 'refNo', 'dcHead', 'cdHead','amount', 'type', 'status'];
  
  grandTotal: any = 0;
  excelDataSource:any = []
	newdataSourcePrint = new MatTableDataSource<any>(this.ELEMENT_DATA);
	totalRecords: number = 0;
	pageSize:number = 10;
	pageIndex: number = 0;
	jsonArray: any = [];
	searchExpended: boolean = true;
	searchInitiated: boolean = false;
	printing: boolean = false;
	searchInfo: any = {}
	@ViewChild('content', {static: false}) content: ElementRef;
  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder, private reportsService: ReportsService, private datePipe: DatePipe) { }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.manualAccReportForm = this.manualAccReportData();
  }
  fetchAllManualAccountingEntries() {
		const passData = {
			"pageIndex": this.pageIndex,
			"pageElement": this.pageSize,
			"jsonArr": this.jsonArray
		};
		this.reportsService.getManualAccountingReport(passData).subscribe((data: any) => {
			this.searchExpended = false;
			this.searchInitiated = true
			const res = data && data.result ? data.result : null;
			const result = data && data.result && data.result.result ? data.result.result : [];
			this.totalRecords = res && res.totalElement?res.totalElement:0;
			this.pageSize = res && res.size?res.size:this.pageSize;
			this.newdataSource = new MatTableDataSource<any>(this.listingData(result));
		});
		const passDataPrint = {
			"pageIndex": 0,
			"pageElement": 9999,
			"jsonArr": this.jsonArray
		};
    this.grandTotal = 0;
		this.reportsService.getManualAccountingReport(passDataPrint).subscribe((data: any) => {
			const res = data && data.result && data.result.result ? data.result.result : [];
			this.newdataSourcePrint = new MatTableDataSource<any>(this.listingData(res));
			this.excelDataSource = this.listingDataExcel(res);
		});
	}
	
	listingData(result:any[]) {
		let Element_Data: any = [];
		let count :number = 1;
		result.forEach(element => {
		  const data = {
				srNo: count++,
				trRefNo: element.transactionReferenceNumber,
        refNo: element.cin,
        dcHead: element.debitHead,
        cdHead: element.creditHead,
        amount: element.amount,
        type: element.type,
        status: element.status
      }
      Element_Data.push(data);
		});
		return Element_Data;
	}
  listingDataExcel(result:any[]) {
		let Element_Data: any = [];
		let count :number = 1;
		result.forEach(element => {
			const data = {
				'Sr No.': count++,
        'Transactions Ref No': element.transactionReferenceNumber,
        'CIN/Reference No': element.cin,
        'Debit/-Credit Head': element.debitHead,
        'Credit/-Debit Head': element.creditHead,
        'Amount': element.amount,
        'Type': element.type,
        'Status': element.status
			}
      this.grandTotal = this.grandTotal + parseFloat(element.amount)
			Element_Data.push(data);
		});
		return Element_Data;
	}
	
	searchDisplay() {
		const opt: any = [];
		let cnt = 0;
		if(this.manualAccReportForm.value.fromDate !== '' && this.manualAccReportForm.value.fromDate !==undefined && this.manualAccReportForm.value.fromDate !==null) {
		 	let date = this.dateFormatter(this.manualAccReportForm.value.fromDate,"yyyy-MM-dd");
			opt[cnt]= {'key':'IN_FROM_DT', 'value':date};
          	cnt++;
		}
		if(this.manualAccReportForm.value.toDate !== '' && this.manualAccReportForm.value.toDate !==undefined && this.manualAccReportForm.value.toDate !==null) {
		 	let date = this.dateFormatter(this.manualAccReportForm.value.toDate,"yyyy-MM-dd");
			opt[cnt]= {'key':'IN_TO_DT', 'value':date};
          	cnt++;
		}
		if(cnt>1){
			this.jsonArray = opt;
      this.searchInfo['from'] = this.dateFormatter(this.manualAccReportForm.value.fromDate,"dd-MMM-yyyy");
			this.searchInfo['to'] = this.dateFormatter(this.manualAccReportForm.value.toDate,"dd-MMM-yyyy");
			this.fetchAllManualAccountingEntries();
		}
	}

	dateFormatter(date:string, pattern: string) {
		return this.datePipe.transform(date, pattern);
	}

	onPaginateChange(event) {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.fetchAllManualAccountingEntries();
	}
  changeExpension(){
		this.searchExpended = !this.searchExpended;
	}

	onReset(){
		this.newdataSource = new MatTableDataSource<any>(this.listingData(this.ELEMENT_DATA));
		this.newdataSourcePrint = new MatTableDataSource<any>(this.listingData(this.ELEMENT_DATA));
		this.totalRecords = 0;
		this.grandTotal = 0;
		this.searchInfo = {} 
	}

	downloadPDF() {
		this.printing = true;
		setTimeout(()=>{
			const doc = new jsPDF('p', 'mm', 'a4');
			
			const content = this.content.nativeElement;
			html2canvas(content).then(canvas => {
				// Few necessary setting options
				const imgWidth = 208; // your own stuff to calc the format you want
				const imgHeight = canvas.height * imgWidth / canvas.width; // your own stuff to calc the format you want
				const contentDataURL = canvas.toDataURL('image/png');
				doc.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
				doc.save('manual_accounting_report.pdf');
				this.printing = false;
			})
		},1000)
	}
	downloadExcel(){
		const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelDataSource);
		const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
		//this.saveAsExcelFile(excelBuffer, excelFileName);
		const data: Blob = new Blob([excelBuffer], {
		  type: EXCEL_TYPE
		});
		FileSaver.saveAs(data, 'manual_accounting_report_exported'+ EXCEL_EXTENSION);
	}

  manualAccReportData() {
    return this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  onPressPrint(content) {
		const printContent = document.getElementById(content);
		const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
		var htmlToPrint = '' +
		'<style type="text/css">' +
		'table {' +
		'border: 1pt solid #000000;'+
    		'border-collapse: separate;'+
    		'border-spacing: 0;'+	
		'width:100%' +
		'}' +
		'table th, table td {' +
		'border:1px solid #000;' +
		'text-align:center;'+
		'padding:0.5em;' +
		'}' +
		'@media print {'+
		'table th, table td {' +
		'border:1px solid #000;' +
		'text-align:center;'+
		'padding:0.5em;' +
		'}' +
		'}'+
		'</style>';
	  	htmlToPrint += printContent.innerHTML;
		WindowPrt.document.write(htmlToPrint);
		WindowPrt.document.close();
		WindowPrt.focus();
		WindowPrt.print();
		WindowPrt.close();
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
