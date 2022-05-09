import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ListValue, LoadBalancerAO } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { GstFileAccountingService } from '../services/gst-file-accounting/gst-file-accounting.service';
import { ToastrService } from 'ngx-toastr';
import { LoadBalancerService } from '../services/load-balancer/load-balancer.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ChallanDistributionService } from '../services/challan-distribution/challan-distribution.service';
import { element } from 'protractor';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';

type NewType = ListValue;

type NewType_1 = ListValue;

@Component({
    selector: 'app-load-balancer-ha',
    templateUrl: './load-balancer-ha.component.html',
    styleUrls: ['./load-balancer-ha.component.css']
})
export class LoadBalancerHaComponent implements OnInit {
    ELEMENT_DATA: LoadBalancerAO[] = [
        {
            bankName: 'Bank Of Baroda',
            saDa: 'M K Patel',
            noOfChallan: '5000.00',
            amount: '10000.00',
            totalChallan: '5000.00',
            totalAmount: '5000000.00',
            branch: 'Receipt Branch 1'
        },
        {
            bankName: 'State Bank Of India',
            saDa: 'P M Gosai',
            noOfChallan: '5000.00',
            amount: '20000.00',
            totalChallan: '5000.00',
            totalAmount: '5000000.00',
            branch: 'Receipt Branch 2'
        },
        {
            bankName: 'HDFC Bank',
            saDa: 'J K Lala',
            noOfChallan: '5000.00',
            amount: '30000.00',
            totalChallan: '5000.00',
            totalAmount: '5000000.00',
            branch: 'Receipt Branch 3'
        }
    ];
    // form gropu
    scrollForm: FormGroup;
    // date
    maxDate = new Date();
    todayDate = new Date();
    // table source
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = ['srNo', 'bankName', 'saDa', 'noOfChallan', 'amount', 'toSaDA', 'challanAmount'];
    newdisplayedFooterColumns: string[] = ['saDa', 'noOfChallan', 'amount', 'toSaDA', 'challanAmount'];
    selection = new SelectionModel<any>(true, []);
    // FormControl
    bankNameCtrl: FormControl = new FormControl();
    branchCtrl: FormControl = new FormControl();
    branch2Ctrl: FormControl = new FormControl();
    bankCtrl: FormControl = new FormControl();
    jsonArr: { key: string; value: number }[];
    bankList: any;
    sadaList: any;
    refNumber: any = '';

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private datepipe: DatePipe,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private storageService: StorageService,
        private challandistributionservice: ChallanDistributionService,
        private loadBalancerService: LoadBalancerService
    ) { }

    directiveObject = new EPaoDirectives(this.router, this.dialog);
    public errorMessages;

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.scrollData();
        this.getBankList();
        // this.getLoadBalancerHaList();
        this.getRefNumber();
    }

    getRefNumber() {
        this.loadBalancerService.getRefNumber({ moduleName: 'CDSA' }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.refNumber = res['result'] ? res['result'] : '19-20/E-PAO/SC/001';
                }
            },
            err => {
                this.toastr.error(err);
            }

        );
    }

    scrollData() {
        this.scrollForm = this.fb.group({
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            bankName: [''],
            branchId: []
        });
    }

    getBranchId() {
        const currentUser = this.storageService.get('currentUser');
        let data = currentUser['branchDetails'];
        data = data.map(itm => itm.branchId);
        return data;
    }

    getBankList() {
        this.challandistributionservice.getBankList({ branchId: this.getBranchId() }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.bankList = res['result']['bankNames'];
                    this.sadaList = res['result']['sadaName'];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    onSelect(event: { source: { selected: any } }) {
        if (event.source.selected) {
            this.scrollForm.patchValue({
                bankName: event.source['value']
            });
        }
    }

    onSelectSada(event: { source: { selected: any } }, i) {
        console.log(i);
        if (event.source.selected) {
            this.newdataSource.data[i]['toSaDaId'] = event.source['value'];
            this.newdataSource.data[i]['branchId'] = this.getBranchId();
            this.sadaList.filter(itm => {
                if (itm['sadaId'] === this.newdataSource.data[i]['toSaDaId']) {
                    this.newdataSource.data[i]['toSaDaName'] = itm['sadaName'];
                }
            });
        }
    }

    // navigation
    navigate() {
        this.router.navigate(['/dashboard/e-pao/load-balancer-ha-listing']);
    }

    getLoadBalancerHaList() {
        this.loadBalancerService
            .getLoadBalHAList({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource = res['result']['result'];
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

    listingData(data): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        const value = data;
        if (value['bankName'] === null) {
            value['bankName'] = ''
            this.getDataOnSearch(value);
        } else {
            this.getDataOnSearch(value);
        }

    }

    getDataOnSearch(value) {
        value.fromDate = this.datepipe.transform(value.fromDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        value.toDate = this.datepipe.transform(value.toDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        value.branchId = this.getBranchId();
        this.loadBalancerService.getLoadBalHADataOnSearch(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = res['result']['loadBalancerHa'];
                    this.sadaList = res['result']['sadaName'];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    reset() {
        this.scrollForm.reset();
        this.directiveObject.selection.clear();
        this.newdataSource.data = [];
        this.scrollData();
    }

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

    checkForSADA() {
        let check: boolean;
        this.directiveObject.selection.selected.forEach(element => {
            if (element.toSaDaName !== null) {
                check = true
            } else {
                check = false;
            }
        });
        return check;
    }

    /// Distribute Call

    onDistribute() {
        if (this.checkForSADA()) {
            this.directiveObject.selection.selected.forEach(element => {
                this.newdataSource.data.filter(item => {
                    if (item.bankName === element.bankName) {
                        element.fileProcessId = item.fileProcessId;
                        // element.fromSaDaId = item.fromSaDaId;
                        element.totalChallansTrnf = Number(element.totalChallansTrnf)
                    }
                });
            });
            this.loadBalancerService.getLoadBalHADistributeCall(this.directiveObject.selection['selected']).subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.toastr.success('Distributed Sucessfully');
                        this.reset();
                    } else {
                        this.toastr.error(res['message']);
                        this.directiveObject.selection.clear();
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
        } else {
            this.toastr.error('Please select SADA');
        }

    }

    checkChallanCount(element) {
        if (element.totalChallansTrnf > element.totalChallans) {
            this.toastr.error('Challan Count should be less then No. Of Challans.');
            element.totalChallansTrnf = 0;
        }
    }

    totalChallan(): number {
        let amountExp = 0;
        if (this.newdataSource.data.length) {
            this.newdataSource.data.forEach(element => {
                amountExp = amountExp + Number(element.totalChallans);
            });
            return amountExp;
        } else {
            return amountExp;
        }
    }

    totalAmmount(): number {
        let amountExp = 0;
        if (this.newdataSource.data.length) {
            this.newdataSource.data.forEach(element => {
                amountExp = amountExp + Number(element.totalAmount);
            });
            return amountExp;
        } else {
            return amountExp;
        }
    }
}
