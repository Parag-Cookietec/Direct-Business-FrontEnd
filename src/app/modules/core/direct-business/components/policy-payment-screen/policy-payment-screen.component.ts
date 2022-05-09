import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonListing } from 'src/app/model/common-listing';

@Component({
  selector: 'app-policy-payment-screen',
  templateUrl: './policy-payment-screen.component.html',
  styleUrls: ['./policy-payment-screen.component.css']
})
export class PolicyPaymentScreenComponent implements OnInit {

  // date
  todayDate = new Date();
  maxDate = new Date();
  // form group
  paymentForm: FormGroup;
  // form control
  paymentTypeCtrl: FormControl = new FormControl();

  // lists start
  paymentTypeList: CommonListing[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' }
  ];
  // lists end

  // constructor
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      referenceNo: [{ value: 'DOI/DB/19-20/E0091', disabled: true }],
      proposerName: [{ value: 'Civil Department', disabled: true }],
      paymentType: [''],
      chequeDate: [''],
      premiumAmount: [{ value: '17,70,000', disabled: true }],
      bankName: [''],
      chequeNo: [''],
      paymentDate: ['']
    });
  }

  // on click on reset button
  reset() {
    this.paymentForm.reset();
    this.paymentForm.patchValue({
      referenceNo: ['DOI/DB/19-20/E0091'],
      proposerName: [ 'Civil Department'],
      premiumAmount: ['17,70,000'],
    });
  }

  // if payment type is cheque
  onChequeDate() {
    if (this.paymentForm.controls.paymentType.value === '1') {
      return new Date();
    }
  }

}
