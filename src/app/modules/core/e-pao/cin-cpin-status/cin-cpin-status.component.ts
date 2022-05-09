import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { BlockCpin, ListValue } from 'src/app/models/e-pao/epaoModel';
import { BlockCpinService } from '../services/block-cpin/block-cpin.service';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-cin-cpin-status',
    templateUrl: './cin-cpin-status.component.html',
    styleUrls: ['./cin-cpin-status.component.css']
})
export class CinCpinStatusComponent implements OnInit {
    todayDate = Date.now();
    initiatiomdate = new Date();
    maxDate = new Date();
    errorMessages = EPOAMessage;
    isSubmitted = false;
    cinCpinForm: FormGroup;
    typeCtrl: FormControl = new FormControl();
    displayedColumns = ['srNo', 'cpin', 'cin', 'status', 'fileNo', 'fileDate', 'cpinAmount', 'govtCreditDt'];
    onStatusTableData: any = [];
    dataSource: any = new MatTableDataSource(this.onStatusTableData);
    modifiedTableCols = ['desc', 'tax', 'interest', 'fees', 'penalty', 'others', 'rat', 'total'];

    datalist = {
        gstinTmpidNo: '',
        partyName:'',
        cpinNo: '',
        cinNo: '',
        cpinDt: '',
        cinDt: '',
        stateCd: '',
        bankRefNum: '',
        fileTypeCd: '',
        paymentModeCd: '',
        bankCd:'',
        scrollNo:'',
        scrollDate:'',
    };
    tableData: any = [];

    modifieddataSource: any = new MatTableDataSource(this.tableData);
    jsonArr: { key: string; value: number }[];
    type_list: ListValue[] = [
        { value: 'CPIN', viewValue: 'CPIN' },
        { value: 'CIN', viewValue: 'CIN' }
    ];
    refNumber: any = '';
    challanstatus: boolean;

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private router: Router,
        public dialog: MatDialog,
        private blockCpinService: BlockCpinService
    ) {}

    ngOnInit() {
        this.cinCpinForm = this.fb.group({
            cinNo: [''],
            recordType: ['']
        });
        // this.blockCpinList();
    }

    getRefNumber() {
        this.blockCpinService.getRefNumber({ moduleName: 'GCS' }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.refNumber = res['result'] ? res['result'] : '19-20/E-PAO/BCPIN/001';
                }
            },
            err => {
                this.toastr.error(err);
            }

        );
    }

    BlockCPINData(): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        const value = this.cinCpinForm.value;
        for (const key in value) {
            if (value[key]) {
                const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
                this.jsonArr.push({
                    key,
                    value: moment.isMoment(feild)
                        ? this.convertDateOnly(feild)
                        : key === 'fileName'
                        ? feild
                        : parseFloat(feild) !== NaN
                        ? parseFloat(feild)
                        : feild
                });
            }
        }
        this.getCpinDataOnSearch(value);
    }

    getCpinDataOnSearch(value) {

       this.challanstatus = true;

        this.blockCpinService.getBlockCpinOnSearch(value).subscribe(
            res => {
                if (res && res['result'] !== null && res['result'].response === true) {
                    this.tableData = [res['result']['dto']][0];
                    this.modifieddataSource = this.tableData;
                    this.datalist = res['result'];
                } else if (res['message'] === 'Unknown Error Occured. ') {
                    this.toastr.error('No Record Found');
                    this.resetListing();
                } else {
                    this.toastr.error('No Record Found');
                    this.resetListing();
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    onPressPrint() {
        // let printContents = document.getElementById('content').innerHTML;
        // let originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        window.print();
        // document.body.innerHTML = originalContents;
    }

    // On close to open ProceedDialogComponent
    onClose() {
        const dialogRef = this.dialog.open(ProceedDialogComponent, {
            width: '300px',
            height: 'auto',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
            }
        });
    }

    getStatusData() {

        this.challanstatus = true;

        let cpinNo = this.datalist.cpinNo;
        this.blockCpinService.getBlockCpinStatus({ cpinNo }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.onStatusTableData = [res['result']];
                    this.dataSource = this.onStatusTableData;
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    submitData() {
        this.blockCpinService.saveData(this.datalist).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.dataSource.data = [res['result']];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    resetListing() {
        this.cinCpinForm.reset();
        this.datalist = {
            gstinTmpidNo: '',
            partyName:'',
            cpinNo: '',
            cinNo: '',
            cpinDt: '',
            cinDt: '',
            stateCd: '',
            bankRefNum: '',
            fileTypeCd: '',
            paymentModeCd: '',
            bankCd:'',
            scrollNo:'',
            scrollDate:'',
        };
        this.modifieddataSource = [];
        this.onStatusTableData = [];
        this.dataSource = [];
        this.tableData = [];
    }

    resetStatusData() {
        this.cinCpinForm.reset();
        this.onStatusTableData = [];
        this.dataSource = [];
    }

    blockCpinList(): void {
        this.blockCpinService
            .getBlockCpinList({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.dataSource.data = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }
}
