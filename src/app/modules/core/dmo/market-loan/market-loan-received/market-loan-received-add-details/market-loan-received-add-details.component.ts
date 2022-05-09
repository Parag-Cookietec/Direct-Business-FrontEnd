import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonList } from 'src/app/modules/core/common/model/common-listing';
import { RemoveLoanService } from 'src/app/modules/services/dmo/remove-loan.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/dmo/dmo-msg.constants';
import { WorkflowDmoComponent } from '../../../daily-position/workflow-dmo/workflow-dmo.component';
import { getMarketLoanRecievedRequestObject, setMarketLoanRequestObject } from '../../../model/market-loan.data-model';
import { MarketLoanService } from '../../../services/market-loan.service';
import { ToastMsgService } from '../../../services/toast.service';

@Component({
  selector: 'app-market-loan-received-add-details',
  templateUrl: './market-loan-received-add-details.component.html',
  styleUrls: ['./market-loan-received-add-details.component.css']
})
export class MarketLoanReceivedAddDetailsComponent implements OnInit, OnDestroy {

  finanacialYearList: any[] = [];

  wayOfFloatationList: any[] = [];

  loanList: any[] = [];
  todayDate = new Date();
  marketLoanReceivedAddDetailsForm: FormGroup;
  financialYearCtrl: FormControl = new FormControl;
  wayOfFloatationCtrl: FormControl = new FormControl;
  typeOfLoanCtrl: FormControl = new FormControl;
  errorMessages = dmoMessage;
  marketLoanDPObj: any;

  constructor(private fb: FormBuilder
    , private router: Router
    , private _marketLoanService: MarketLoanService
    , private removeLoanService: RemoveLoanService
    , private _toast: ToastMsgService
    , private toaster: ToastrService
    , private dialog: MatDialog) { }

  ngOnInit() {
    this.marketLoanDPObj = this._marketLoanService.getDPObj();
    if (!this.marketLoanDPObj) {
      this.router.navigate(['dashboard/dmo/market-loan-received']);
    }
    this.initForm();
    this.marketLoanReceivedAddDetailsForm.get('totalAmountReceived').patchValue(this.marketLoanDPObj.creditAmount);
    this.marketLoanReceivedAddDetailsForm.get('premiumAmount').patchValue(this.marketLoanDPObj.creditAmount);
    // On Value change premium amount would changed
    this.marketLoanReceivedAddDetailsForm.get('totalAmountReceived').valueChanges.subscribe(value => {
      const loanAmt = this.marketLoanReceivedAddDetailsForm.value.loanAmount;
      if (loanAmt) {
        this.marketLoanReceivedAddDetailsForm.get('premiumAmount').patchValue(value - loanAmt);
      }
    });
    this.marketLoanReceivedAddDetailsForm.get('loanAmount').valueChanges.subscribe(value => {
      const totAmt = this.marketLoanReceivedAddDetailsForm.value.totalAmountReceived;
      if (totAmt) {
        this.marketLoanReceivedAddDetailsForm.get('premiumAmount').patchValue(totAmt - value);
      }
    });
    this.GetTypeOfLoan();
    this.GetWayOfFloatation();
    this.GetfinancialYear();
  }

  ngOnDestroy() {
    this._marketLoanService.setDPData(null);
  }

  initForm() {
    this.marketLoanReceivedAddDetailsForm = this.fb.group({
      finanacialYear: ['', Validators.required],
      totalAmountReceived: ['', Validators.required],
      loanAmount: ['', Validators.required],
      premiumAmount: ['', Validators.required],
      notificationNumber: ['', Validators.required],
      notificationDate: [''],
      loanStartDate: [''],
      wayOfFloatation: ['', Validators.required],
      typeOfLoan: ['', Validators.required],
      loanDescription: ['', Validators.required],
      tranche: [''],
      loanTenure: ['', Validators.required],
      interestRate: [null, Validators.required],
      numberOfIssue: ['', Validators.required],
      moratotiumPeriod: ['', Validators.required],// Validators.min(this.marketLoanReceivedAddDetailsForm.value.loanTenure)]],
      principalUnderMoratoritum: ['', Validators.required],
      totalNumberOfRepaymentInstallments: ['', Validators.required],
      numberOfRepaymentInstallmentsPerYear: ['', Validators.required],
      firstInstallmentDate: ['', Validators.required],
      numberOfInstallmentsinaYear: ['', Validators.required],
      firstInstallmentDateInterest: ['', Validators.required],
    });
  }

  getMarketLoanDetails() {
    const reqObj = {};
    this._marketLoanService.fetchMarketLoanReceivedDetails(reqObj).subscribe(res => {
      if (res && res['result'] && res['status'] === 200) { }
    })
  }

  onSubmit() {
    if (this.marketLoanReceivedAddDetailsForm.valid) {
      if (this.marketLoanReceivedAddDetailsForm.value.loanTenure > this.marketLoanReceivedAddDetailsForm.value.moratotiumPeriod) {
        console.log(this.marketLoanReceivedAddDetailsForm.getRawValue());
        const reqObj = getMarketLoanRecievedRequestObject(this.marketLoanDPObj, this.marketLoanReceivedAddDetailsForm.getRawValue());
        console.log('reqObj ==>', reqObj);
        this._marketLoanService.saveMarketLoanReceivedDetails(reqObj).subscribe(res => {
          if (res && res['result'] && res['status'] === 200) {
            this._toast.success('Data submitted successfully.');
            this.router.navigate(['./dashboard/dmo/market-loan-approved/approve/loan-repayment-schedule'], this.marketLoanDPObj.adviceNo);
          }
        }, error => {
          this._toast.error('Something went wrong.');
        });
      } else {
        this._toast.error('Loan Tenure should be greater than Moratorium Period..');
      }
    } else {
      this.marketLoanReceivedAddDetailsForm.markAllAsTouched();
    }
  }

  GetTypeOfLoan() {
    this.removeLoanService.GetTypeOfLoan().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.loanList = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetfinancialYear() {
    this._marketLoanService.GetfinancialYear().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.finanacialYearList = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetWayOfFloatation() {
    this._marketLoanService.GetWayOfFloatation().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.wayOfFloatationList = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  onClose() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '360px',
      data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.router.navigate(['dashboard/dmo/market-loan-received']);
      }
    })
  }
}
