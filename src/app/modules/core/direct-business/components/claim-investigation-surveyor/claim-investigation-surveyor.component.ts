import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/common/data.service';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { ClaimInvestigationSurveyor, ClaimEntryPreviousLoss } from '../../models/doiModel';

@Component({
  selector: 'app-claim-investigation-surveyor',
  templateUrl: './claim-investigation-surveyor.component.html',
  styleUrls: ['./claim-investigation-surveyor.component.css']
})
export class ClaimInvestigationSurveyorComponent implements OnInit {

  // variabes
  errorMessage = doiMessage;
  claimAmountValue = 0;
  selectedIndex: number;
  isSurveyor = false;
  // date
  todayDate = new Date();
  // form group
  claimInvestigationSurveyorForm: FormGroup;
  surveyorDetailsForm: FormGroup;
  // form control
  insuredNameCtrl: FormControl = new FormControl();
  policyNoCtrl: FormControl = new FormControl();
  claimTypeCtrl: FormControl = new FormControl();
  claimYearCtrl: FormControl = new FormControl();
  decisionCtrl: FormControl = new FormControl();

  // lists start
  insuredNameList: CommonListing[] = [
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

  decisionList: CommonListing[] = [
    { value: '1', viewValue: 'Approved' },
    { value: '2', viewValue: 'Rejected' },
    { value: '3', viewValue: 'Under Survey' },
  ];
  // lists end

  // table data start (Details of Property/ Asset)
  columns: string[] = [
    'position',
    'itemDescription',
    'serialNo',
    'actualValue',
    'valueAtLossTime',
    'amountClaim',
    'surveyorRemarks'
  ];
  elementData: ClaimInvestigationSurveyor[] = [
  ];
  dataSource = new MatTableDataSource<ClaimInvestigationSurveyor>(this.elementData);
  // table data end


  // table data start (Details of Previous Loss)
  displayedColumns: string[] = [
    'position',
    'claimYear',
    'claimDescription',
    'claimAmount',
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

  // table data end


  // constructor
  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    if (dataService.getOption()['send-for-approval'] === 'isSurveyor') {
      this.isSurveyor = true;
      dataService.setOption('send-for-approval', '');
    } else {
      this.isSurveyor = false;
    }
  }

  ngOnInit() {
    if (this.isSurveyor) {
      this.getTabIndex(1);
    } else {
      this.getTabIndex(0);
    }
    this.claimInvestigationSurveyorDetails();
    this.surveyorDetailsDetails();
  }

  claimInvestigationSurveyorDetails() {
    this.claimInvestigationSurveyorForm = this.fb.group({
      insuredName: [''],
      policyNo: [''],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      district: [{ value: '', disabled: true }],
      taluka: [{ value: '', disabled: true }],
      contactNo: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      claimType: [{ value: '', disabled: true }],
      sumInsured: [{ value: '', disabled: true }],
      claimAmount: [{ value: this.claimAmountValue, disabled: true }],
      lossDamageDate: [{ value: '', disabled: true }],
      time: [{ value: '', disabled: true }, Validators.pattern(/^(1[0-2]|0?[0-9]):([0-5][0-9]) ?([AaPp][Mm])?$/)],
      lossDamageCause: [{ value: '', disabled: true }],
      lossExtend: [{ value: '', disabled: true }],
      surveyorRemarks: ['']
    });
  }

  surveyorDetailsDetails() {
    this.surveyorDetailsForm = this.fb.group({
      surveyorName: [{ value: 'Mr. Abhishek Tiwari', disabled: true }],
      address: [{ value: 'Dahej GIDC,Plot 20,Dahej', disabled: true }],
      billNo: [''],
      billDate: [''],
      charges: [''],
      discount: [''],
      taxes: [''],
      totalAmount: [{ value: '', disabled: true }],
      decision: [''],
    });
  }


  // select policy no patch values in claim entry form
  selectPolicyNo(event) {
    if (event) {
      this.claimInvestigationSurveyorForm.patchValue({
        address: 'Dahej GIDC,Plot 20,Dahej',
        district: 'Bharuch',
        taluka: 'Dahej',
        contactNo: '9876543210',
        email: 'example@domain.com',
        startDate: new Date('04/01/2019'),
        endDate: new Date('03/31/2020'),
        claimType: 'Standard Fire & Special Perils Policy Schedule',
        sumInsured: '20,00,000',
        claimAmount: '370000.00',
        lossDamageDate: new Date('10/05/2019'),
        time: '3:05 PM',
        lossDamageCause: 'Short Circuit',
        lossExtend: '',
      });
      this.elementData.push(
        {
          itemDescription: 'Computers',
          serialNo: 'CD/17-18/0001-0150',
          actualValue: 525000,
          valueAtLossTime: 185000,
          amountClaim: 185000,
          surveyorRemarks: ''
        },
        {
          itemDescription: 'Cabinets',
          serialNo: 'CB/17-18/0015-0080',
          actualValue: 52500000,
          valueAtLossTime: 185000,
          amountClaim: 185000,
          surveyorRemarks: ''
        }
      );
      this.dataSource = new MatTableDataSource<ClaimInvestigationSurveyor>(this.elementData);
    }
  }

  // on click on claim type in policy details
  onClaimType(event) {
    if (event) {
      this.claimInvestigationSurveyorForm.patchValue({
        sumInsured: '20,00,000'
      });
    }
  }


  // calculate claim amount
  calculateClaimAmount() {
    let amount = 0;
    this.dataSource.data.forEach((element) => {
      amount = amount + Number(element.amountClaim);
    });
    this.claimInvestigationSurveyorForm.patchValue({
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
    this.claimInvestigationSurveyorForm.reset();
    this.claimInvestigationSurveyorForm.patchValue({
      claimAmount: this.claimAmountValue,
    });
  }

  // on click on listing button
  goToListing() {
    this.router.navigate(['doi/db/claim-entry-listing']);
  }

  // on click on close button in claim entry screen
  onCloseClaimEntry() {

  }

  // on click on close button in surveyor details tab
  onCloseSurveyorDetails() {

  }

  calculateTotalAmount() {
    let amount = 0;
    amount = Number(this.surveyorDetailsForm.value.charges) - Number(this.surveyorDetailsForm.value.discount) +
      Number(this.surveyorDetailsForm.value.taxes);
    return amount;
  }

  // get tab index
  getTabIndex(tabIndex) {
    this.selectedIndex = tabIndex;
    console.log(this.selectedIndex);
  }

}
