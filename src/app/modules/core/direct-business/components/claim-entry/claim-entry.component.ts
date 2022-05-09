import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { DoiDirectives } from '../../directives/doi';
import { ClaimEntryPropertyDetails, ClaimEntryPreviousLoss } from '../../models/doiModel';

@Component({
  selector: 'app-claim-entry',
  templateUrl: './claim-entry.component.html',
  styleUrls: ['./claim-entry.component.css']
})
export class ClaimEntryComponent implements OnInit {
  riShare = '5'
  // variabes
  errorMessage = doiMessage;
  claimAmountValue = 0;
  // date
  todayDate = new Date();
  // form group
  claimEntryForm: FormGroup;
  // form control
  proposerNameCtrl: FormControl = new FormControl();
  policyNoCtrl: FormControl = new FormControl();
  claimTypeCtrl: FormControl = new FormControl();
  claimYearCtrl: FormControl = new FormControl();
  riRequiredCtrl: FormControl = new FormControl();
  paymentReceivedThroughCtrl: FormControl = new FormControl();
  paymentReceivedThroughList: any[] = [
    { value: '1', viewValue: 'Cash' },
    { value: '2', viewValue: 'Cheque' },
  ];
  // lists start
  proposerNameList: CommonListing[] = [
    { value: '0', viewValue: 'Civil Department' },
    { value: '1', viewValue: 'Agriculture Department' },
    { value: '2', viewValue: 'Defence Office' },
    { value: '3', viewValue: 'Finance Office' },
    { value: '4', viewValue: 'Treasury Department' },
  ];
  policyNoList: CommonListing[] = [
    { value: '0', viewValue: 'DOI/DB/19-20/0001' },
    { value: '1', viewValue: 'DOI/DB/19-20/0002' },
    { value: '2', viewValue: 'DOI/DB/19-20/0003' },
    { value: '3', viewValue: 'DOI/DB/19-20/0004' },
    { value: '4', viewValue: 'DOI/DB/19-20/0005' },
  ];
  claimTypeList: CommonListing[] = [
    { value: '0', viewValue: 'Standard Fire & Special Perils Policy Schedule' },
    { value: '1', viewValue: 'Burglary & Housebreaking Policy' },
    { value: '2', viewValue: 'Electronics Equipment/Material Damage Schedule' },
    { value: '3', viewValue: 'Case-In-Transit Insurance' },
    { value: '4', viewValue: 'Terrorism Pool Insurance' }
  ];

  attachmentTypeCode: CommonListing[] = [
    { value: '01', viewValue: 'Supporting Document' },
    { value: '02', viewValue: 'FIR' },
    { value: '03', viewValue: 'Policy Document' },
    { value: '04', viewValue: 'Others' },
  ];

  claimYearList: CommonListing[] = [
    { value: '1', viewValue: '2014-13' },
    { value: '2', viewValue: '2013-14' },
    { value: '3', viewValue: '2014-15' },
    { value: '4', viewValue: '2015-16' },
    { value: '5', viewValue: '2016-17' },
    { value: '6', viewValue: '2017-18' },
    { value: '7', viewValue: '2018-19' },
    { value: '8', viewValue: '2019-20' },
  ];
  // lists end
  displayedColumns1: string[] = [
    'riName',
    'riAddress',
    'riShare',
    'premiumAmount',
    'resPayment',
    'paymentReceivedOn',
    'paymentReceivedThrough',
    'challanNo',
    'challanDate',
    'action',
  ];
  // table data start (Details of Property/ Asset)
  columns: string[] = [
    'position',
    'itemDescription',
    'serialNo',
    'actualValue',
    'valueAtLossTime',
    'amountClaim',
    'action'
  ];
  elementData: ClaimEntryPropertyDetails[] = [
    {
      itemDescription: '',
      serialNo: '',
      actualValue: null,
      valueAtLossTime: null,
      amountClaim: null,
    }
  ];
  riRequiredList: any[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  dataSource = new MatTableDataSource<ClaimEntryPropertyDetails>(this.elementData);
  dataSource1 = new MatTableDataSource<any>(this.elementData);

  // table data end


  // table data start (Details of Previous Loss)
  displayedColumns: string[] = [
    'position',
    'oldPolicyNo',
    'claimYear',
    'claimDescription',
    'claimAmount',
    'action'
  ];
  displayedColumnss: string[] = [
    'position',
    'oldPolicyNo',
    'poposerName',
    'riskType',
    'claimYear',
    'claimDescription',
    'claimAmount',
    'action'
  ];

  elementData1: ClaimEntryPreviousLoss[] = [
    {
      claimYear: '',
      claimDescription: '',
      claimAmount: null,
    },
    {
      claimYear: '',
      claimDescription: '',
      claimAmount: null,
    },
    {
      claimYear: '',
      claimDescription: '',
      claimAmount: null,
    },
  ];

  dataSourceLoss = new MatTableDataSource<ClaimEntryPreviousLoss>(this.elementData1);
  claimdatails: boolean = false;

  // table data end


  // constructor
  constructor(private el: ElementRef, public dialog: MatDialog, private router: Router, private fb: FormBuilder,) { }
  directiveObject = new DoiDirectives(this.router, this.dialog);


  ngOnInit() {
    this.claimEntryForm = this.fb.group({
      proposerName: [''],
      policyNo: [''],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      district: [{ value: '', disabled: true }],
      taluka: [{ value: '', disabled: true }],
      contactNo: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      claimType: [''],
      sumInsured: [{ value: '', disabled: true }],
      claimAmount: [{ value: this.claimAmountValue, disabled: true }],
      lossDamageDate: [''],
      time: ['', Validators.pattern(/^(1[0-2]|0?[0-9]):([0-5][0-9]) ?([AaPp][Mm])?$/)],
      lossDamageCause: [''],
      lossExtend: [''],
      riRequired: ['']
    });
  }

  // select policy no patch values in claim entry form

  ontoken(index) {


    if (index.value === '0') {
      this.claimdatails = true;
      this.claimEntryForm.patchValue({
        address: 'Dahej GIDC,Plot 20,Dahej',
        district: 'Bharuch',
        taluka: 'Dahej',
        contactNo: '9876543210',
        email: 'example@domain.com',
        startDate: new Date('04/01/2019'),
        endDate: new Date('03/31/2020')
      });
    } else {
      this.claimdatails = false;
    }
  }
  // on click on claim type in policy details
  onClaimType(event) {
    if (event) {
      this.claimEntryForm.patchValue({
        sumInsured: '20,00,000'
      });
    }
  }

  // add row in Details of Property/ Asset
  addPropertyDetails() {
    const data = this.dataSource.data;
    data.push(
      {
        itemDescription: '',
        serialNo: '',
        actualValue: null,
        valueAtLossTime: null,
        amountClaim: null,
      }
    );
    this.dataSource.data = data;
  }

  // delete row in Details of Property/ Asset
  deletePropertyDetails(index) {
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(
      this.dataSource.data
    );
  }

  // calculate claim amount
  calculateClaimAmount() {
    let amount = 0;
    this.dataSource.data.forEach((element) => {
      amount = amount + Number(element.amountClaim);
    });
    this.claimEntryForm.patchValue({
      claimAmount: amount.toFixed(2)
    });
    return amount;
  }

  // on click on close button in attachment
  onClose() { }

  // on click on submit
  onSubmit() {
  }

  // on click on reset
  onReset() {
    this.claimEntryForm.reset();
    this.claimEntryForm.patchValue({
      claimAmount: this.claimAmountValue,
    });
  }

  // on click on listing button
  goToListing() {
    this.router.navigate(['doi/db/claim-entry-listing']);
  }

  // on click on close button in calim entry screen
  onCloseClaimEntry() {

  }

  // add row in Details of Previous Loss
  addPropertyLoss() {
    const data = this.dataSourceLoss.data;
    data.push(
      {
        claimYear: '',
        claimDescription: '',
        claimAmount: null,
      }
    );
    this.dataSourceLoss.data = data;
  }
  onRiNameEnter(element) {
    if (element.riName === 'GIC') {
      return element.riShare = '5%'
    }
  }
  // delete row in Details of Previous Loss
  deletePropertyLoss(index) {
    this.dataSourceLoss.data.splice(index, 1);
    this.dataSourceLoss = new MatTableDataSource(
      this.dataSourceLoss.data
    );
  }
  calculateOurSharePremium() {
    let value = 0;
    value = (Number(this.claimEntryForm.value.premium) / 100) * (Number(this.claimEntryForm.value.ourShare));
    return value;
  }
  calculateRiPremiumAmount(element) {
    if (element.riName === 'GIC') {
      let value = 0;
      value = (Number(this.riShare) / 100) * Number(this.calculateOurSharePremium());
      return value;
    } else {
      let value = 0;
      value = (Number(element.riShare) / 100) * Number(this.claimEntryForm.controls['premium'].value);
      return value;
    }
  }
  addColumn() {
    const data = this.dataSource1.data;
    data.push({
      riName: '',
      riAddress: '',
      riShare: '',
      paymentReceivedOn: '',
      paymentReceivedThrough: '',
      challanNo: '',
      challanDate: '',
    });
    this.dataSource1.data = this.dataSource1.data;
  }

  deleteColumn(index) {
    this.dataSource1.data.splice(index, 1);
    this.dataSource1.data = this.dataSource1.data;
  }
}
