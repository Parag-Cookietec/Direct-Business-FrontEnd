import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';


@Component({
  selector: 'app-chk-det-fr-pay-prncplor-inst',
  templateUrl: './chk-det-fr-pay-prncplor-inst.component.html',
  styleUrls: ['./chk-det-fr-pay-prncplor-inst.component.css']
})
export class ChkDetFrPayPrncplorInstComponent implements OnInit {

  // Entry Field Details
  memoNo_List: CommonListing[] = [
    { value: '1', viewValue: '51/00057/072019/23' },
    { value: '2', viewValue: '51/00057/072019/34' },
    { value: '3', viewValue: '51/00057/072019/56' },
    { value: '4', viewValue: '51/00057/072019/77' },
  ];

  chNo_List: CommonListing[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
  ];

  payType_List: CommonListing[] = [
    { value: '1', viewValue: 'Principal' },
    { value: '2', viewValue: 'Interest' },
  ];

  detailsForm: FormGroup;
  memoNoCtrl: FormControl = new FormControl;
  payTypeCtrl: FormControl = new FormControl;
  maxDate = new Date();
  todayDate = Date.now();
  chNoCtrl: FormControl = new FormControl;
  errorMessages = dmoMessage;
  loanMemo: any;
  Memos;
  PayableOptions: CommonListing[];

  constructor(private fb: FormBuilder, private router: Router,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) {
    this.getInstitutionalLoanMemo();
  }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      memoNo: [''],
      memoDate: [''],
      payType: [''],
      cheNo: [''],
      cheDate: [''],
    });

    this.getAllMemos();
    this.getAllPayableOptions();
  }

  getAllPayableOptions(){
    this.institutionalloandetailsService.getAllPayableOptions().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.PayableOptions = res['result'];
        console.log(this.PayableOptions);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  getAllMemos() {
    debugger;
    this.institutionalloandetailsService.getAllMemos().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.Memos = res['result'];
        console.log(this.Memos);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  getInstitutionalLoanMemo() {
    this.institutionalloandetailsService.getInstitutionalLoanMemo().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.loanMemo = res['result'];
        console.log(this.loanMemo);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }
}
