import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ListValue, LoadBalancerAO } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LoadBalancerService } from '../services/load-balancer/load-balancer.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ChallanDistributionService } from '../services/challan-distribution/challan-distribution.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
    selector: 'app-load-balancer-ao',
    templateUrl: './load-balancer-ao.component.html',
    styleUrls: ['./load-balancer-ao.component.css']
})
export class LoadBalancerAoComponent implements OnInit {
    ELEMENT_DATA: LoadBalancerAO[] = [
        {
            bankName: 'Bank Of Baroda',
            saDa: 'B G Patel',
            noOfChallan: '500',
            amount: '10000.00',
            totalChallan: '500',
            totalAmount: '5000000.00',
            branch: 'Receipt Branch 1'
        },
        {
            bankName: 'State Bank Of India',
            saDa: 'P M Gosai',
            noOfChallan: '50',
            amount: '20000.00',
            totalChallan: '50',
            totalAmount: '5000000.00',
            branch: 'Receipt Branch 2'
        },
        {
            bankName: 'HDFC Bank',
            saDa: 'H K Mehta',
            noOfChallan: '40',
            amount: '30000.00',
            totalChallan: '40',
            totalAmount: '5000000.00',
            branch: 'Receipt Branch 3'
        }
    ];
    // FormGroup
    scrollForm: FormGroup;
    // date
    maxDate = new Date();
    todayDate = new Date();
    // table source
    newdataSource = new MatTableDataSource<any>();
    // tslint:disable-next-line: max-line-length
    newdisplayedColumns: string[] = [
        'srNo',
        'bankName',
        'saDa',
        'noOfChallan',
        'amount',
        'toBranchId',
        'toSaDA',
        'totalChallansTrnf'
    ];

    newdisplayedFooterColumns: string[] = ['saDa', 'noOfChallan', 'amount', 'toBranchId', 'toSaDA', 'totalChallansTrnf'];
    selection = new SelectionModel<any>(true, []);

    // FormControl
    bankNameCtrl: FormControl = new FormControl();
    branchCtrl: FormControl = new FormControl();
    branch2Ctrl: FormControl = new FormControl();
    bankCtrl: FormControl = new FormControl();

    jsonArr: { key: string; value: number }[];
    branchList: any[];
    bankList: any;
    sadaList: any;
    branchWiseSADA: any;
    refNumber: any = '';
    // list

    // bankName_list: ListValue[] = [
    //     { value: '1', viewValue: 'CN87484165118421' },
    //     { value: '2', viewValue: 'CN87484165118421' },
    //     { value: '3', viewValue: 'CN87484165118421' }
    // ];
    // branch_list: ListValue[] = [
    //     {
    //         value: '1',
    //         viewValue: ' Receipt Branch 1'
    //     },
    //     {
    //         value: '2',
    //         viewValue: 'Receipt Branch 2'
    //     },
    //     {
    //         value: '3',
    //         viewValue: 'Receipt Branch 3'
    //     }
    // ];
    // sada_list: ListValue[] = [
    //     {
    //         value: '1',
    //         viewValue: 'K M Shah'
    //     },
    //     {
    //         value: '2',
    //         viewValue: 'P H Mehta'
    //     },
    //     {
    //         value: '2',
    //         viewValue: 'Z B Patel'
    //     }
    // ];
    // bank_list: ListValue[] = [
    //     {
    //         value: '1',
    //         viewValue: ' State Bank Of India'
    //     },
    //     {
    //         value: '2',
    //         viewValue: 'Bank Of Baroda'
    //     },
    //     {
    //         value: '2',
    //         viewValue: 'HDFC Bank'
    //     }
    // ];

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private storageService: StorageService,
        private challandistributionservice: ChallanDistributionService,
        private loadBalancerService: LoadBalancerService
    ) { }

    directiveObject = new EPaoDirectives(this.router, this.dialog);
    public errorMessages;

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.scrollData();
        // this.getLoadBalancerAoList();
        this.getBranchList();
        this.getBankList();
        this.getRefNumber();
    }

    getRefNumber() {
        this.loadBalancerService.getRefNumber({ moduleName: 'LBAO' }).subscribe(
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
            toBranchId: [''],
            branchId: ['']
        });
    }

    getBranchList() {
        this.loadBalancerService
            .getBranchNameList({
                pageIndex: 0,
                pageElement: 250,
                jsonArr: [
                    { key: 'trnNo', value: '' },
                    { key: 'fromDate', value: '' },
                    { key: 'toDate', value: '' },
                    { key: 'branchName', value: '' },
                    { key: 'branchTypeId', value: 0 }
                ]
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.branchList = res['result']['result'];
                        this.branchList = this.branchList.filter(itm => itm.branchName !== 'Account Current');
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

    listingData(): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        const value = this.scrollForm.value;
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
        this.getDataOnSearch(value);
    }

    getDataOnSearch(value) {
        value.fromDate = value.fromDate === null || value.fromDate ==='' ? '' : this.datepipe.transform(value.fromDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        value.toDate =  value.toDate === null || value.toDate === '' ? '' : this.datepipe.transform(value.toDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss') ;
        value.branchId = this.getBranchId();
        value.toBranchId = value.toBranchId === null || value.toBranchId ==='' ? '' : value.toBranchId;
        value.bankName = value.bankName === null|| value.bankName ==='' ? '' : value.bankName;
        // value.bankNames = this.getBankList();
        this.loadBalancerService.getLoadBalAOOnSearch(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = res['result']['loadBalancerAo'];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
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
                toBranchId: event.source['value']
            });
        }
    }

    onSelectBranch(event) {
        if (event.source.selected) {
            this.challandistributionservice.getBankList({ branchId: [event.source['value']] }).subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.branchWiseSADA = res['result']['sadaName'];
                        this.getToBranchName();
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
        }
    }

    // toBranchId

    getToBranchName() {
        this.newdataSource.data.forEach(element => {
            this.branchList.filter(itm => {
                if (itm['branchId'] === element['toBranchId']) {
                    element['toBranchId'] = itm['branchId'];
                    element['toBranchName'] = itm['branchName'];
                }
            });
        });
    }

    onSelectSada(event: { source: { selected: any } }, i) {
        console.log(i);
        if (event.source.selected) {
            this.newdataSource.data.forEach(element => {
                element['toSaDaId'] = event.source['value'];
                element['branchId'] = this.getBranchId();
                this.branchWiseSADA.filter(itm => {
                    if (itm['sadaId'] === this.newdataSource.data[i]['toSaDaId']) {
                        this.newdataSource.data[i]['toSaDaName'] = itm['sadaName'];
                    }
                });
            });
        }
       
    }


    onSubmit() {
       // const userInfo = this.storageService.get('currentUser');
        if (this.checkForSADA() && this.checkForChallan()) {
            this.directiveObject.selection.selected.forEach(element => {
                this.newdataSource.data.filter(item => {
                    if (item.bankName === element.bankName) {
                        element.fileProcessId = item.fileProcessId;
                        element.fromSaDaId = item.fromSaDaId;
                        element.totalChallansTrnf = Number(element.totalChallansTrnf)
                    }
                    
                });
            });
            this.loadBalancerService.getLoadBalAODistributeCall(this.directiveObject.selection['selected']).subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.toastr.success('Distributed Sucessfully');
                        this.reset();
                    } else {
                        this.toastr.error(res['message']);
                        this.directiveObject.selection.clear();
                        this.reset();
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
      
            } else {
                if(this.checkForChallan()){
                    this.toastr.error('Please Enter Challan Count');
                } else {
                    this.toastr.error('Please select SADA');  
                }
        }  

    }

    checkForSADA() {
        let check: boolean;
        this.directiveObject.selection.selected.forEach(element => {
            if (element.toBranchId !== null && element.toSaDA !== null) {
                check = true
            } else {
                check = false;
            }
        });
        return check;
    }

    checkForChallan(){
        let check: boolean;
        this.directiveObject.selection.selected.forEach(element => {
            if (element.totalChallansTrnf !== 0) {
                check = true
            } else {
                check = false;
            }
        });
        return check;
    }

    // navigation
    navigate() {
        this.router.navigate(['/dashboard/e-pao/load-balancer/ao-listing'], { skipLocationChange: true });
    }


    getLoadBalancerAoList() {
        this.loadBalancerService
            .getLoadBalAOList({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource.data = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }


    totalChallan(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.noOfChallan);
        });
        return amountExp;
    }

    totalAmmount(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.amount);
        });
        return amountExp;
    }

    reset() {
        this.scrollData();
        this.directiveObject.selection.clear();
        this.newdataSource.data = [];

    }
}
