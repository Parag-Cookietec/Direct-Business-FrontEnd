import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MemoGenerationDetails } from 'src/app/model/dmo';
import { CommonListing } from 'src/app/model/common-listing';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { MatTableDataSource } from '@angular/material/table';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-memo-gen-det',
  templateUrl: './memo-gen-det.component.html',
  styleUrls: ['./memo-gen-det.component.css']
})
export class MemoGenDetComponent implements OnInit {

  memoGenerationDetailsForm: FormGroup;
  nameOfInstituteCtrl = new FormControl();
  refrenceNoCtrl = new FormControl();
  typeOfPayableCtrl = new FormControl();
  maxDate = new Date();
  todayDate = Date.now();
  errorMessages = dmoMessage;
  //netAmountPayable = 0.00;
  memoDetails: any;
  updateMemo: any;
  getMemoRepay: any;
  getRef: any;
  InstituteNames: CommonListing[];
  PayableOptions: CommonListing[];
  ReferenceNumbers: any;

  typeOfPayable_list: CommonListing[] = [
    { value: '1', viewValue: 'Interest' },
    { value: '2', viewValue: 'Principle' },
  ];

  nameOfInstitute_list: CommonListing[] = [ ];

  // table data
  Element_Data: MemoGenerationDetails[] = [];

  dataSource = new MatTableDataSource<MemoGenerationDetails>(this.Element_Data);

  displayedColumns: any[] = [
    'select',
    'position',
    'tranche',
    'accountNo',
    'loanAmount',
    'loanOutstandingAmount',
    'repaymentDue',
    'dueDate',

  ];

  directiveObj = new CommonDirective();
  constructor(private fb: FormBuilder, private router: Router, private datePipe: DatePipe,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.memoGenerationDetailsForm = this.fb.group({
      nameOfInstitute: [''],
      refrenceNo: [''],
      fromDate: [''],
      toDate: [''],
      typeOfPayable: [''],
      memoNo: [''],
      memoDate: [''],
    });
    this.getAllInstituteNames();
    this.getAllPayableOptions();
  }

  getAllInstituteNames() {
    this.institutionalloandetailsService.getAllInstituteNames().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.InstituteNames = res['result'];
        console.log(this.InstituteNames);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  getAllPayableOptions() {
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

  netAmountPayable() {
    let Amount = 0;
    this.dataSource.data.forEach((element) => {
      Amount = Amount + Number(element.repaymentDue);
    });
    return Amount;
  }

  getMemoGenerationDetails() {
    this.institutionalloandetailsService.getInstitutionalLoanMemo().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.memoDetails = res['result'];
        console.log(this.memoDetails);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  UpdateMemoNoAndMemoDate() {
    var refNo = this.memoGenerationDetailsForm.value.refrenceNo;
    var memoNo = this.memoGenerationDetailsForm.value.memoNo;
    var memoDate = this.datePipe.transform(this.memoGenerationDetailsForm.value.memoDate, 'yyyy-MM-dd');

    this.institutionalloandetailsService.UpdateMemoNoAndMemoDate(refNo, memoNo, memoDate).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.updateMemo = res['result'];
        console.log(this.updateMemo);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetMemoRepaymentByReferenceNo() {
    var refNo = this.memoGenerationDetailsForm.value.refrenceNo;
    var fromDate = this.memoGenerationDetailsForm.value.fromDate ?  this.datePipe.transform(this.memoGenerationDetailsForm.value.fromDate, 'yyyy-MM-dd') :"2018-03-31"
    var toDate = this.memoGenerationDetailsForm.value.toDate ? this.datePipe.transform(this.memoGenerationDetailsForm.value.toDate, 'yyyy-MM-dd') :"2021-12-31"

    this.institutionalloandetailsService.GetMemoRepaymentByReferenceNo(refNo, fromDate, toDate).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.Element_Data = res['result'];
        console.log(this.Element_Data);

        this.dataSource = new MatTableDataSource<MemoGenerationDetails>(this.Element_Data);

      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetReferenceByInstitute(insId) {
    this.institutionalloandetailsService.GetReferenceByInstitute(insId.value).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.ReferenceNumbers = res['result'];
        console.log(this.ReferenceNumbers);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }
}
