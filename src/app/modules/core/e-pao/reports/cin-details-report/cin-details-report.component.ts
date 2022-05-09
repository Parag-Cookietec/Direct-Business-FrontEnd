import { group } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CinDetailReport } from 'src/app/models/e-pao/epaoModel';
import { ReportsService } from '../../services/reports/reports.service';
import { DatePipe } from '@angular/common';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-cin-details-report',
  templateUrl: './cin-details-report.component.html',
  styleUrls: ['./cin-details-report.component.css']
})
export class CinDetailsReportComponent implements OnInit {
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
 
 
	ELEMENT_DATA: CinDetailReport[] = [];
	// date
	maxDate = new Date();
	todayDate = new Date();
	// form group
	cpinDetailReportForm: FormGroup;
	
	// table source
	newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
	newdisplayedColumns: string[] = ['srNo', 'gstin', 'cin', 'bank', 'cinDate','sgstTax','sgstIntr','sgstFee',
								'sgstPenalty','sgstOther','sgstTotal', 'fileDate'];
	newdisplayedColumns1: string[] = ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12'];		
	newdisplayedFooterColumns: string[] = ['srNo', 'gstin', 'cin', 'bank', 'cinDate','sgstTax','sgstIntr','sgstFee',
								'sgstPenalty','sgstOther','sgstTotal', 'fileDate'];
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
	totalSgstTax: number= 0;
	totalSgst: number= 0;
	totalSgstFee: number= 0;
	totalSgstPenalty: number= 0;
	totalSgstOther: number= 0;
	totalSgstTotal: number= 0;
	@ViewChild('content', {static: false}) content: ElementRef;
	constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder, private reportsService: ReportsService, private datePipe: DatePipe) { }
	directiveObject = new EPaoDirectives(this.router, this.dialog);
	// error message
	public errorMessages;
	ngOnInit() {
		this.errorMessages = EPOAMessage;
		this.cpinDetailReportForm = this.cpinDetailReportData();
	}

	fetchAllCinEntries() {
		const passData = {
			"pageIndex": this.pageIndex,
			"pageElement": this.pageSize,
			"jsonArr": this.jsonArray
		};
		
		this.reportsService.getCinDetailReport(passData).subscribe((data: any) => {
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
		this.totalSgstTax = 0;
		this.totalSgst = 0;
		this.totalSgstFee = 0;
		this.totalSgstPenalty = 0;
		this.totalSgstOther = 0;
		this.totalSgstTotal = 0;
		this.reportsService.getCinDetailReport(passDataPrint).subscribe((data: any) => {
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
				gstin: element.gstIn,
				cin: element.cin,
				bank: element.bankCd,
				cinDate: element.paymentDate,
				sgstTax: element.sgstTax,
				sgstIntr: element.sgstInterest,
				sgstFee: element.sgstFee,
				sgstPenalty: element.sgstPenalty,
				sgstOther: element.sgstOther,
				sgstTotal: element.sgstTotal,
				fileDate: element.fileDate,
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
				'GSTIN': element.gstIn,
				'CIN': element.cin,
				'Bank Code': element.bankCd,
				'Payment Date': this.dateFormatter(element.paymentDate,"dd-MM-yyyy"),
				'SGST Tax': element.sgstTax,
				'SGST': element.sgstInterest,
				'SGST Fee': element.sgstFee,
				'SGST Penalty': element.sgstPenalty,
				'SGST Other': element.sgstOther,
				'SGST Total': element.sgstTotal,
				'File Date': this.dateFormatter(element.fileDate,"dd-MM-yyyy")
			}
			this.totalSgstTax = this.totalSgstTax+parseFloat(element.sgstTax);
			this.totalSgst = this.totalSgst+parseFloat(element.sgstInterest);
			this.totalSgstFee = this.totalSgstFee+parseFloat(element.sgstFee);
			this.totalSgstPenalty = this.totalSgstPenalty+parseFloat(element.sgstPenalty);
			this.totalSgstOther = this.totalSgstOther+parseFloat(element.sgstOther);
			this.totalSgstTotal = this.totalSgstTotal+parseFloat(element.sgstTotal);
			Element_Data.push(data);
		});
		return Element_Data;
	}
	
	searchDisplay() {
		const opt: any = [];
		let cnt = 0;
		if(this.cpinDetailReportForm.value.fromDate !== '' && this.cpinDetailReportForm.value.fromDate !==undefined && this.cpinDetailReportForm.value.fromDate !==null) {
		 	let date = this.dateFormatter(this.cpinDetailReportForm.value.fromDate,"yyyy-MM-dd");
			opt[cnt]= {'key':'IN_FROM_DT', 'value':date};
          	cnt++;
		}
		if(this.cpinDetailReportForm.value.toDate !== '' && this.cpinDetailReportForm.value.toDate !==undefined && this.cpinDetailReportForm.value.toDate !==null) {
		 	let date = this.dateFormatter(this.cpinDetailReportForm.value.toDate,"yyyy-MM-dd");
			opt[cnt]= {'key':'IN_TO_DT', 'value':date};
          	cnt++;
		}
		if(cnt>1){
			this.jsonArray = opt;
			this.searchInfo['from'] = this.dateFormatter(this.cpinDetailReportForm.value.fromDate,"dd-MMM-yyyy");
			this.searchInfo['to'] = this.dateFormatter(this.cpinDetailReportForm.value.toDate,"dd-MMM-yyyy");
			this.fetchAllCinEntries();
		}
	}

	dateFormatter(date:string, pattern: string) {
		return this.datePipe.transform(date, pattern);
	}

	onPaginateChange(event) {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.fetchAllCinEntries();
	}
   
 
	changeExpension(){
		this.searchExpended = !this.searchExpended;
	}

	onReset(){
		this.newdataSource = new MatTableDataSource<any>(this.listingData(this.ELEMENT_DATA));
		this.newdataSourcePrint = new MatTableDataSource<any>(this.listingData(this.ELEMENT_DATA));
		this.totalRecords = 0;
		this.searchInfo = {} 
		this.totalSgstTax = 0;
		this.totalSgst = 0;
		this.totalSgstFee = 0;
		this.totalSgstPenalty = 0;
		this.totalSgstOther = 0;
		this.totalSgstTotal = 0;
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
				doc.save('cin_detail_report.pdf');
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
		FileSaver.saveAs(data, 'cin_detail_report_exported'+ EXCEL_EXTENSION);
	}
	
	cpinDetailReportData() {
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
