import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChallanStatusReport, ModifiedTable } from 'src/app/models/e-pao/epaoModel';
import { ReportsService } from '../../services/reports/reports.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-cin-status-report-challan',
    templateUrl: './cin-status-report-challan.component.html',
    styleUrls: ['./cin-status-report-challan.component.css']
})
export class CinStatusReportChallanComponent implements OnInit {
    cinStatusrForm: FormGroup;
    recordTypeCtrl: FormControl = new FormControl();
    maxDate = new Date();
    todayDate = new Date();

    STATUSDATA: ChallanStatusReport[] = [
        {
            cin: '212121242434',
            cinDate: '25/09/2021',
            amt: '300'
        }
    ];

    newdataSource2 = new MatTableDataSource<any>(this.STATUSDATA);
    newdisplayedColumns2: string[] = ['sr', 'cin', 'cinDate', 'amt'];
    newdisplayedColumns3: string[] = ['1', '2', '3', '4'];
    newdisplayedFooterColumns1: string[] = ['sr', 'cin', 'cinDate', 'amt'];

    MODIFIED_DATA: ModifiedTable[] = [
        {
            desc: 'SGST',
            tax: '15121.00',
            interest: '0.00',
            fees: '0.00',
            penalty: '0.00',
            others: '0.00',
            rat: '0.00',
            total: '15121.00'
        }
    ];
    modifiedTableCols = ['desc', 'tax', 'interest', 'fees', 'penalty', 'others', 'rat', 'total'];
    modifieddataSource = new MatTableDataSource(this.MODIFIED_DATA);
    totalRecords: number = 0;
	pageSize:number = 10;
	pageIndex: number = 0;
	jsonArray: any = [];
    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder, private reportsService: ReportsService, private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.cinStatusData();
        this.jsonArray = [
            {
                "key": "SEARCH_TYPE",
                "value": "CIN"
            },
             {
                "key": "SEARCH_TEXT",
                "value": "SBIN17012500000015"
            }
        ]
        //this.fetchAllChallanStatusEntries()
    }

    fetchAllChallanStatusEntries() {
		
        const passData = {
			"pageIndex": this.pageIndex,
			"pageElement": this.pageSize,
			"jsonArr": this.jsonArray
		};
		this.reportsService.getChallanStatusReport(passData).subscribe((data: any) => {
			const res = data && data.result ? data.result : null;
			const {size, totalElement} = res;
			this.totalRecords = totalElement;
			this.pageSize = size;
			this.modifieddataSource = new MatTableDataSource<any>(this.listingData(data.result.result));
		});
	}
	
	listingData(result:any[]) {
		let Element_Data: any = [];
		let count :number = 1;
		result.forEach(element => {
            const data = {
                desc: 'SGST',
                tax: element.sgstTax,
                interest: element.sgstInterest,
                fees: element.sgstFee,
                penalty: element.sgstPenalty,
                others: element.sgstOther,
                rat: '0.00',
                total: element.sgstTotal
			}
            Element_Data.push(data);
		});
		return Element_Data;
	}
	
	/*searchDisplay() {
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
			this.fetchAllChallanStatusEntries();
		}
	}

	dateFormatter(date:string, pattern: string) {
		return this.datePipe.transform(date, pattern);
	}

	onPaginateChange(event) {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.fetchAllChallanStatusEntries();
	}*/
    cinStatusData() {
        this.cinStatusrForm = this.fb.group({
            addRate: [''],
            effecativeDate: [''],
            bankRate: [''],
            recordTypeCtrl: [''],
            details: ['']
        });
    }
}
