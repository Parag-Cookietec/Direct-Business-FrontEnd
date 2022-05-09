import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonListing, ListValue } from 'src/app/model/common-listing';
import { AttachmentTypeList, ClaimEntryPropertyDetails, ClaimEntryPreviousLoss } from '../../models/doiModel';

@Component({
  selector: 'app-claim-entry-view',
  templateUrl: './claim-entry-view.component.html',
  styleUrls: ['./claim-entry-view.component.css']
})
export class ClaimEntryViewComponent implements OnInit {
  liceno: boolean = false;
  // variables
  claimAmountValue = 0;
  // date
  todayDate = new Date();
  // form group
  claimEntryForm: FormGroup;
  // form control
  surveyorNameCtrl: FormControl = new FormControl();

  proposerNameCtrl: FormControl = new FormControl();
  policyNoCtrl: FormControl = new FormControl();
  claimTypeCtrl: FormControl = new FormControl();

  recomndedCtrl: FormControl = new FormControl();
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
  surveyorNameList: ListValue[] = [
    { value: '1', viewValue: 'Mr. Abhishek Gupta' },
  ];
  attachmentTypeCode: AttachmentTypeList[] = [
    {
      type: 'stamp-view',
      attachmentType: 'FIR',
    },
    {
      type: 'stamp-view',
      attachmentType: 'Policy Doc',
    },
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
  ];
  elementData: ClaimEntryPropertyDetails[] = [
    {
      itemDescription: 'Computers',
      serialNo: 'CD/17-18/0001-0150',
      actualValue: 525000,
      valueAtLossTime: 185000,
      amountClaim: 185000,
    },
    {
      itemDescription: 'Cabinets',
      serialNo: 'CB/17-18/0015-0080',
      actualValue: 52500000,
      valueAtLossTime: 185000,
      amountClaim: 185000,
    }
  ];
  dataSource = new MatTableDataSource<ClaimEntryPropertyDetails>(this.elementData);
  // table data end

  // table data start Details of Previous Loss
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
  recomnded_list: ListValue[] = [
    { value: '1', viewValue: 'Recommonded to Query ' },
    { value: '4', viewValue: 'Recommonded for Rejection' },
    { value: '5', viewValue: 'Recommonded for Settlement' },
    { value: '6', viewValue: 'Recommonded For Investigation' },

  ];
  dataSourceLoss = new MatTableDataSource<ClaimEntryPreviousLoss>(this.elementData1);
  // table data end

  // constructor
  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder,) { }

  ngOnInit() {
    this.claimEntryForm = this.fb.group({
      proposerName: [{ value: '0', disabled: true }],
      policyNo: [{ value: '0', disabled: true }],
      startDate: [{ value: new Date('04/01/2019'), disabled: true }],
      endDate: [{ value: new Date('03/31/2020'), disabled: true }],
      address: [{ value: 'Dahej GIDC,Plot 20,Dahej', disabled: true }],
      district: [{ value: 'Bharuch', disabled: true }],
      taluka: [{ value: 'Dahej', disabled: true }],
      contactNo: [{ value: '9876543210', disabled: true }],
      email: [{ value: 'example@domain.com', disabled: true }],
      claimType: [{ value: '0', disabled: true }],
      sumInsured: [{ value: '20,00,000', disabled: true }],
      claimAmount: [{ value: this.claimAmountValue, disabled: true }],
      lossDamageDate: [{ value: new Date('10/05/2019'), disabled: true }],
      time: [{ value: '3:05 PM  ', disabled: true }],
      lossDamageCause: [{ value: 'Short Circuit', disabled: true }],
      lossExtend: [{ value: '', disabled: true }],
      recomnded: [''],
      surveyorName: ['']
    });
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

  // go to listing
  goToListing() {
    this.router.navigate(['doi/db/claim-entry-listing']);
  }

  // on click on close button
  onClose() { }
  onSubmit() {
    if (this.claimEntryForm.controls.recomnded.value !== '') {
      if (this.claimEntryForm.controls.recomnded.value === '1') {
        // const dialogRef = this.dialog.open(JpaQueryDialogComponent, {
        //   width: '1000px',
        //   height: '500px',
        //   disableClose: true

        // });
      } else {
        this.liceno = false;
      }

      if (this.claimEntryForm.controls.recomnded.value === '4') {
        // const dialogRef = this.dialog.open(JpaRejectionQueryDialogComponent, {
        //   width: '1000px',
        //   height: '500px',
        //   disableClose: true

        // });
      }
    }
  }
}
