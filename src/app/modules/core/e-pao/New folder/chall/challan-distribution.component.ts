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

@Component({
    selector: 'app-challan-distribution',
    templateUrl: './challan-distribution.component.html',
    styleUrls: ['./challan-distribution.component.css']
})
export class ChallanDistributionComponent implements OnInit {
    ELEMENT_DATA: ChallanDistribution[] = [
        {
            auditor: '1',
            availableChallan: '200',
            bank: '1',
            toBeDistributed: '100',
            totalChallan: '200',
            totalToBeDistributed: '100'
        }
    ];
    // FormGroup
    scrollForm: FormGroup;
    // Date
    maxDate = new Date();
    todayDate = new Date();
    // MatTableDataSource
    newdataSource = new MatTableDataSource<any>();

    newdisplayedColumns: string[] = [
        'position',
        'auditor',
        'bank',
        'totalChallan',
        'availableChallan',
        'toBeDistributed',
        'totalToBeDistributed',
        'action'
    ];

    // FormControl
    auditorCtrl: FormControl = new FormControl();
    bankCtrl: FormControl = new FormControl();
    // List
    auditor_list: ListValue[] = [
        {
            value: '1',
            viewValue: 'A B Chaudhary'
        },
        {
            value: '2',
            viewValue: 'C D Fernandez'
        },
        {
            value: '3',
            viewValue: 'G H Iyer'
        }
    ];
    bank_list: ListValue[] = [
        {
            value: '1',
            viewValue: ' State Bank Of India'
        },
        {
            value: '2',
            viewValue: 'Bank Of Baroda'
        },
        {
            value: '3',
            viewValue: 'HDFC Bank'
        }
    ];

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private challanDistributionService: ChallanDistributionService
    ) {}
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    // error Messages
    public errorMessages;
    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.scrollData();
        this.getChallanDistributionList();
    }
    scrollData() {
        this.scrollForm = this.fb.group({
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
                        console.log(res);
                        this.newdataSource.data = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    // Navigation
    navigate() {
        this.router.navigate(['./e-pao/challan-distribution-listing']);
    }

    // Delete row
    delete(index) {
        this.newdataSource.data.splice(index, 1);
        this.newdataSource = new MatTableDataSource(this.newdataSource.data);
    }

    // Adds row
    add() {
        const data = this.newdataSource.data;
        this.newdataSource.data.push({
            auditor: '1',
            availableChallan: '200',
            bank: '1',
            toBeDistributed: '',
            totalChallan: '200',
            totalToBeDistributed: ''
        });
        this.newdataSource.data = data;
    }

    totalChallan(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.toBeDistributed);
        });
        return amountExp;
    }
}
