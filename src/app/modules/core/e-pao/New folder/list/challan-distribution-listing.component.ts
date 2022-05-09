import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { ChallanDistributionListing, ListValue } from 'src/app/models/e-pao/epaoModel';

const ELEMENT_DATA: ChallanDistributionListing[] = [
    {
        bankName: 'State Bank Of India',
        noOfChallan: '500',
        amount: '10000.00',
        branch: 'Receipt Branch 1',
        saDA: 'A B Gosai',
        challanAmount: '2000.00',
        scrollName: 'CN87484165118421'
    },
    {
        bankName: 'Bank Of Baroda',
        noOfChallan: '500',
        amount: '20000.00',
        branch: 'Receipt Branch 2',
        saDA: 'B G Patel',
        challanAmount: '2000.00',
        scrollName: 'CN87484165118422'
    },
    {
        bankName: 'HDFC Bank',
        noOfChallan: '500',
        amount: '30000.00',
        branch: 'Receipt Branch 3',
        saDA: 'H A Mehta',
        challanAmount: '2000.00',
        scrollName: 'CN87484165118423'
    }
];
@Component({
    selector: 'app-challan-distribution-listing',
    templateUrl: './challan-distribution-listing.component.html',
    styleUrls: ['./challan-distribution-listing.component.css']
})
export class ChallanDistributionListingComponent implements OnInit {
    // FormGroup
    scrollForm: FormGroup;
    // Date
    maxDate = new Date();
    todayDate = new Date();
    // MatTableDataSource
    newdataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    newdisplayedColumns: string[] = [
        'srNo',
        'scrollName',
        'bankName',
        'noOfChallan',
        'amount',
        'saDA',
        'challanAmount'
    ];
    // FormControl
    branchCtrl: FormControl = new FormControl();
    bankCtrl: FormControl = new FormControl();
    saDaCtrl: FormControl = new FormControl();
    // List.
    sada_list: ListValue[] = [
        {
            value: '1',
            viewValue: ' H A Mehta'
        },
        {
            value: '2',
            viewValue: 'A B Patel'
        },
        {
            value: '2',
            viewValue: 'B G Patel'
        }
    ];
    branch_list: ListValue[] = [
        {
            value: '1',
            viewValue: ' Receipt Branch 1'
        },
        {
            value: '2',
            viewValue: 'Receipt Branch 2'
        },
        {
            value: '3',
            viewValue: 'Receipt Branch 3'
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
            value: '2',
            viewValue: 'HDFC Bank'
        }
    ];
    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) {}
    // error Messages
    public errorMessages;
    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.scrollData();
    }
    scrollData() {
        this.scrollForm = this.fb.group({
            bankName: [''],
            saDa: [''],
            noOfChallan: [''],
            amount: [''],
            totChallan: [''],
            totAmount: [''],
            bank: [''],
            chaAmount: [''],
            status: [''],
            toDate: [''],
            date: ['']
        });
    }
}
