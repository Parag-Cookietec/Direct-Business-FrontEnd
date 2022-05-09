import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NssfLoanApproved } from 'src/app/models/dmo/dmo';
import { CommonService } from 'src/app/modules/services/common.service';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { StorageService } from 'src/app/shared/services/storage.service';
import { GoiService } from '../../services/goi.service';

@Component({
    selector: 'app-goi-loan-approved',
    templateUrl: './goi-loan-approved.component.html',
    styleUrls: ['./goi-loan-approved.component.css']
})
export class GoiLoanApprovedComponent implements OnInit {
    todayDate = new Date();

    goiLoanApproved: FormGroup;
    directiveObj = new CommonDirective();
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private goiService: GoiService,
        private storageService: StorageService,
        private router: Router
    ) {}

    displayedColumns: any[] = [        
        'position',
        'sanctionNo',
        'sanctionOrderDate',
        'loanReceiptDate',
        'loanAmount',
        'loanTenure',
        'moratariumPeriod',
        'loanROI',
        'action'
    ];

    totalRecords: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;
    element_data = [];
    // [{
    //     id: null,
    //     sanctionNo:  '',
    //     sanctionOrderDate:  '',
    //     loanReceiptDate: '',
    //     loanAmount: '',
    //     loanTenure:'',
    //     moratariumPeriod: '',
    //     loanROI: '',
    // }];

    dataSource = new MatTableDataSource(this.element_data);
    ngOnInit() {
               
        this.goiService.dpid = null;
        this.goiService.isView = false;        
        this.goiLoanApproved = this.fb.group({
            loanNo: [''],
            fromDate: [''],
            toDate: ['']
        });
    }

    /**
     * To convert the date format into (yyyy-mm-dd)
     * @param date default date
     */
    formatDate(date) {
        if (date !== 0 && date !== null && date !== undefined && date !== '') {
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(date, 'yyyy-MM-dd');
        } else {
            return '';
        }
    }

    submit() {
        const param = {
            adviceNo: this.goiLoanApproved.value.loanNo,
            fromDate: this.formatDate(this.goiLoanApproved.value.fromDate),
            toDate: this.formatDate(this.goiLoanApproved.value.toDate)
        };

        const url = 'dmo/goiloanreceived/201';
        this.goiService.getGOILoanApprovedDetails(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        console.log(res['result']);
                        this.dataSource = new MatTableDataSource(res['result']);
                    } else {
                        this.toastr.error(res['message']);
                    }
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    onCancelClick() {
        this.goiLoanApproved.reset();
    }

    onPaginateChange(event) {
        // this.pageSize = event.pageSize;
        // this.pageIndex = event.pageIndex;
        // const dpObj = {
        //     pageIndex: event.pageIndex,
        //     pageElement: event.pageSize,
        //     jsonArr: []
        // };
    }

    onEdit(element,viewonly) {
        this.goiService.dpid = element.id;
        this.goiService.dpData = element;
        this.router.navigate(['./dashboard/dmo/goi/goi-loan-received-add-details']);
        if(viewonly){
            this.goiService.isView = true; 
        }
    }
   
}
