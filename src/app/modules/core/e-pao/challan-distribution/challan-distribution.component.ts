import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ChallanDistribution, ListValue } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChallanDistributionService } from '../services/challan-distribution/challan-distribution.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { DatePipe } from '@angular/common';
import { ScrollDistributionService } from '../services/scroll-distribution/scroll-distribution.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ChallanDistService } from '../services/challan-dist/challan-dist.service';
import { element } from 'protractor';

@Component({
    selector: 'app-challan-distribution',
    templateUrl: './challan-distribution.component.html',
    styleUrls: ['./challan-distribution.component.css']
})
export class ChallanDistributionComponent implements OnInit {
    ELEMENT_DATA = [
        {
            position: '',
            saDaId: '',
            availableChallans: 0,
            bankName: '',
            toBeDitributed: 0,
            totalChallans: 0,
            totalDitributed: 0
        }
    ];
    // FormGroup
    challanForm: FormGroup;
    // Date
    maxDate = new Date();
    todayDate = new Date();
    // MatTableDataSource
    rowDistributed = new MatTableDataSource<any>();
    rowToBeDistributed = new MatTableDataSource<any>();

    newdisplayedColumns: string[] = ['position', 'bankName', 'challanCount', 'distChallan', 'remChallan'];

    newdisplayedColumns1: string[] = [
        'position',
        'saDaId',
        'bankName',
        'totalChallan',
        'availableChallan',
        'toBeDistributed',
        'totalToBeDistributed',
        'action'
    ];

    // FormControl
    auditorCtrl: FormControl = new FormControl();
    bankCtrl: FormControl = new FormControl();

    jsonArr: { key: string; value: number }[];
    dataOnSearch: any[] = [];
    bankList: any[] = [];
    sadaList: any[] = [];
    currentUser: any;
    branchDetails: any;
    prvBnkRec: any;
    refNumber: any = '';

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private storageService: StorageService,
        private challanDistributionService: ChallanDistributionService,
        private scrollDistributionService: ScrollDistributionService,
        private datepipe: DatePipe,
        private challanDistService: ChallanDistService,
        private stoageService: StorageService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    // error Messages
    public errorMessages;

    ngOnInit() {
        this.getRefNumber();
        this.errorMessages = EPOAMessage;
        this.challanData();
        this.currentUser = this.storageService.get('currentUser');
        this.branchDetails = this.currentUser['branchDetails'];
        //this.getChallanDistributionList();
    }

    getRefNumber() {
        this.challanDistributionService.getRefNumber({ moduleName: 'CDSA' }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.refNumber = res['result'] ? res['result'] : '19-20/E-PAO/FS/001';
                }
            },
            err => {
                this.toastr.error(err);
            }

        );
    }

    // get all list
    ChallanDistributionList(): void {
        this.challanDistributionService
            .getAllChallanDistribution({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.rowDistributed = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    getScrollDistributionList() {
        this.scrollDistributionService
            .getAllScrollDistribution({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.rowDistributed = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    resetListing(): void {
        this.rowDistributed.data = [];
        this.rowToBeDistributed.data = [];
        this.ELEMENT_DATA = [];
        this.rowDistributed = new MatTableDataSource(this.rowDistributed.data);
        this.rowToBeDistributed = new MatTableDataSource(this.rowToBeDistributed.data);
        // this.gftFileAccountingListOnSearch(this.currentDayData);
        this.ELEMENT_DATA = [
            {
                position: '',
                saDaId: '',
                availableChallans: 0,
                bankName: '',
                toBeDitributed: 0,
                totalChallans: 0,
                totalDitributed: 0
            }
        ];
    }

    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    //search call

    listingData(): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        const value = this.challanForm.value;
        for (const key in value) {
            if (value[key]) {
                const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
                this.jsonArr.push({
                    key,
                    value: moment.isMoment(feild)
                        ? this.convertDateOnly(feild)
                        : key === 'referenceNo'
                            ? feild
                            : parseFloat(feild) !== NaN
                                ? parseFloat(feild)
                                : feild
                });
            }
        }
        this.challanDistributionOnSearch(value);
    }

    challanDistributionOnSearch(value): void {
        value.fromDate = this.datepipe.transform(value.fromDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        value.toDate = this.datepipe.transform(value.toDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        value.branchId = this.branchDetails.map(itm => itm.branchId);
        this.challanDistributionService.searchChallanDistribution(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.rowToBeDistributed.data = this.ELEMENT_DATA;
                    this.rowDistributed.data = res['result']['challan'];
                    this.bankList = res['result']['bankNames'];
                    this.sadaList = res['result']['sadaName'];
                    this.challanDistService.rowDistributed = this.rowDistributed.data;
                    this.challanDistService.rowToBeDistributed = this.rowToBeDistributed.data;
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    onSelect(event, i: string | number) {
        if (i === 0) {
            this.rowDistributed.data.forEach(element => {
                if (event === element['bankName']) {
                    if (element['availableChallans'] === 0) {
                        this.toastr.warning('No Challan Available To Distribute.');
                        this.remove(i);
                    } else {
                        this.rowToBeDistributed.data[i]['availableChallans'] = element['availableChallans'];
                        this.rowToBeDistributed.data[i]['totalChallans'] = element['totalChallans'];
                    }
                }
            });
        } else {
            if (this.isElementAvailable(event, i)) {
                this.rowToBeDistributed.data.forEach(element => {
                    this.prvBnkRec = element;
                    if (element['bankName'] === event && this.prvBnkRec['availableChallans'] !== 0) {
                        if (this.prvBnkRec['availableChallans'] - Number(this.prvBnkRec['toBeDitributed']) === 0) {
                            this.toastr.warning('No Challan Available To Distribute.');
                            this.remove(i);
                        } else {
                            this.rowToBeDistributed.data[i]['totalChallans'] = this.prvBnkRec['totalChallans'];
                            this.rowToBeDistributed.data[i]['availableChallans'] =
                                this.prvBnkRec['availableChallans'] - this.prvBnkRec['toBeDitributed'];
                        }
                    }
                });
            } else {
                this.prvBnkRec = [];
                this.rowDistributed.data.forEach(element => {
                    if (event === element['bankName']) {
                        if (element['availableChallans'] === 0) {
                            this.toastr.warning('No Challan Available To Distribute.');
                            this.remove(i);
                        } else {
                            this.rowToBeDistributed.data[i]['availableChallans'] = element['availableChallans'];
                            this.rowToBeDistributed.data[i]['totalChallans'] = element['totalChallans'];
                        }
                    }
                });
            }
        }
    }

    isElementAvailable(event, i) {
        //return this.newdataSource1.data.includes(itm['bankName']);
        return this.rowToBeDistributed.data.some(function (el, ind) {
            if (ind < i) {
                return el['bankName'] === event;
            }
        });
    }

    distributionChange(element, i) {
        if (i === 0) {
            if (Number(element['toBeDitributed']) <= element['availableChallans']) {
                element['toBeDitributed'] = Number(element['toBeDitributed']);
                element.totalDitributed = this.totalChallan(element);
            } else {
                this.toastr.error('value should be less than available challan');
            }
        } else {
            if (Number(element['toBeDitributed']) <= element['availableChallans']) {
                this.rowToBeDistributed.data.forEach((rec, index) => {
                    if (rec.sadaId === element.sadaId && index < i) {
                        // if (index < i) {
                        element['toBeDitributed'] = Number(element['toBeDitributed']);
                        element.totalDitributed = rec.totalDitributed + Number(element.toBeDitributed);
                        // }
                    }
                    else {
                        element['toBeDitributed'] = Number(element['toBeDitributed']);
                        element.totalDitributed = this.totalChallan(element);
                    }
                });
            } else {
                this.toastr.error('value should be less than available challan');
            }
        }
    }

    totalChallan(item): number {
        let amountExp = 0;
        this.rowToBeDistributed.data.forEach(element => {
            if (item.sadaId === element.sadaId) {
                amountExp = amountExp + Number(element.toBeDitributed);
            }
        });
        return amountExp;
    }

    getBankId(itm) {
        let bankId: number;
        this.bankList.filter(element => {
            if (itm === element.bankName) {
                bankId = element.bankId;
            }
        });
        return bankId;
    }

    getSaDaName(itm) {
        let sadaName: string = '';
        this.sadaList.filter(element => {
            if (itm === element.sadaId) {
                sadaName = element.sadaName;
            }
        });
        return sadaName;
    }

    getBankCode(itm) {
        let bankCd: string = '';
        this.bankList.filter(element => {
            if (itm === element.bankName) {
                bankCd = element.bankCd;
            }
        });
        return bankCd;
    }

    isRecordEmpty() {
        this.rowToBeDistributed.data.forEach((record, index) => {
            if (record['totalDitributed'] === 0) {
                this.remove(index);
            }
        });
    }

    onDistribute() {
        const userInfo = this.stoageService.get('currentUser');
        this.isRecordEmpty();
        this.rowToBeDistributed.data.forEach(element => {
            this.rowDistributed.data.filter(item => {
                if (item.bankName === element.bankName) {
                    element.fileProcessId = item.fileProcessId;
                    element.bankId = this.getBankId(element.bankName);
                    element.saDaName = this.getSaDaName(element.sadaId);
                    element.bankCd = this.getBankCode(element.bankName);
                    element.saDaId = element.sadaId;
                    element.haId = userInfo.usercode;
                }
            });
        });
        if (this.rowToBeDistributed.data.length) {
            this.challanDistributionService.createChallanDistribution(this.rowToBeDistributed.data).subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.toastr.success(res['result']);
                        this.resetListing();
                        // this.rowToBeDistributed.data = [];
                        // this.rowToBeDistributed = new MatTableDataSource(this.rowToBeDistributed.data);
                        // this.ELEMENT_DATA = [];
                        this.ELEMENT_DATA = [
                            {
                                position: '',
                                saDaId: '',
                                availableChallans: 0,
                                bankName: '',
                                toBeDitributed: 0,
                                totalChallans: 0,
                                totalDitributed: 0
                            }
                        ];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
        } else {
            this.toastr.error('No record found');
        }
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

    challanData() {
        this.challanForm = this.fb.group({
            fromDate: [''],
            toDate: ['']
        });
    }

    getChallanDistributionList() {
        this.challanDistributionService
            .getAllChallanDistribution({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.rowDistributed.data = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    // Navigation
    navigate() {
        this.router.navigate(['/dashboard/e-pao/challan-distribution-listing'], { skipLocationChange: true });
    }

    remove(i) {
        this.rowToBeDistributed.data.splice(i, 1);
        // this.rowToBeDistributed.data[i] = this.ELEMENT_DATA;
        this.rowToBeDistributed = new MatTableDataSource(this.rowToBeDistributed.data);
    }

    // Delete row
    delete(index, element) {
        this.rowToBeDistributed.data.splice(index, 1);
        // if (element) {
        //     this.rowToBeDistributed.data.forEach(item => {
        //         if (element.sadaId === item.sadaId) {
        //             item.totalDitributed = item.totalDitributed - 1;
        //         }
        //     });
        // }
        this.rowToBeDistributed = new MatTableDataSource(this.rowToBeDistributed.data);
    }

    // Adds row
    add(i) {
        const data = this.rowToBeDistributed.data;
        this.rowToBeDistributed.data.push({
            auditor: '',
            availableChallans: 0,
            // Number(data[i]['availableChallans'] - Number(data[i]['toBeDitributed']))
            bankName: '',
            toBeDitributed: 0,
            totalChallans: 0,
            // Number(data[i]['availableChallans'] - Number(data[i]['toBeDitributed']))
            totalDitributed: 0
        });
        this.rowToBeDistributed.data = data;
    }

}
