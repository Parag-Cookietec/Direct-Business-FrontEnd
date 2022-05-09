import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/common/data.service';
import { CommonListing } from 'src/app/model/common-listing';
import { AttachmentTypeList, ClaimEntryListingSendForApproval } from '../../models/doiModel';

@Component({
  selector: 'app-claim-entry-listing-send-for-approval',
  templateUrl: './claim-entry-listing-send-for-approval.component.html',
  styleUrls: ['./claim-entry-listing-send-for-approval.component.css']
})
export class ClaimEntryListingSendForApprovalComponent implements OnInit {

  // date
  todayDate = new Date();
  // form group
  claimEntryListingSendForApprovalForm: FormGroup;
  // form control
  claimPendingWithCtrl: FormControl = new FormControl();
  statusCtrl: FormControl = new FormControl();
  monthCtrl: FormControl = new FormControl();
  yearCtrl: FormControl = new FormControl();
  policyNoCtrl: FormControl = new FormControl();

  // lists start
  claimPendingWithList: CommonListing[] = [
    { value: '00', viewValue: 'Ahmedabad' },
    { value: '01', viewValue: 'Amreli' },
    { value: '02', viewValue: 'Anand' },
    { value: '03', viewValue: 'Aravalli' },
    { value: '04', viewValue: 'Banaskantha' },
    { value: '05', viewValue: 'Bharuch' },
    { value: '06', viewValue: 'Bhavnagar' },
  ];
  statusList: CommonListing[];

  monthList: CommonListing[] = [
    { value: '1', viewValue: 'Jan' },
    { value: '2', viewValue: 'Feb' },
    { value: '3', viewValue: 'Mar' },
    { value: '4', viewValue: 'Apr' },
    { value: '5', viewValue: 'May' },
    { value: '6', viewValue: 'Jun' },
    { value: '7', viewValue: 'Jul' },
    { value: '8', viewValue: 'Aug' },
    { value: '9', viewValue: 'Sep' },
    { value: '10', viewValue: 'Oct' },
    { value: '11', viewValue: 'Nov' },
    { value: '12', viewValue: 'Dec' },
  ];

  yearList: CommonListing[] = [
    { value: '1', viewValue: '2009' },
    { value: '2', viewValue: '2010' },
    { value: '3', viewValue: '2011' },
    { value: '4', viewValue: '2012' },
    { value: '5', viewValue: '2013' },
    { value: '6', viewValue: '2014' },
    { value: '7', viewValue: '2015' },
    { value: '8', viewValue: '2016' },
    { value: '9', viewValue: '2017' },
    { value: '10', viewValue: '2018' },
    { value: '11', viewValue: '2019' },
    { value: '12', viewValue: '2020' },
  ];

  policyNoList: CommonListing[] = [
    { value: '0', viewValue: 'DOI/DB/19-20/0001' },
    { value: '1', viewValue: 'DOI/DB/19-20/0002' },
    { value: '2', viewValue: 'DOI/DB/19-20/0003' },
    { value: '3', viewValue: 'DOI/DB/19-20/0004' },
    { value: '4', viewValue: 'DOI/DB/19-20/0005' },
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

  // table start
  columns: string[] = [
    'position',
    'policyNo',
    'insuredName',
    'claimCreatedOn',
    'claimAmount',
    'claimPendingWith',
    'designation',
    'status',
    'action'
  ];

  elementData: ClaimEntryListingSendForApproval[] = [
    {
      policyNo: 'DOI/DB/19-20/0001',
      insuredName: 'Civil Department',
      claimCreatedOn: new Date('04/01/2019'),
      claimAmount: 370000,
      claimPendingWith: 'Mr. Abhishek Tiwari',
      designation: '',
      status: 'Send for Approval'
    }
  ];
  dataSource = new MatTableDataSource<ClaimEntryListingSendForApproval>(this.elementData);
  // table end

  // constructor
  constructor(private fb: FormBuilder, private router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.claimEntryListingSendForApprovalForm = this.fb.group({
      policyNo: [''],
      insuredName: [''],
      claimPendingWith: [''],
      status: [''],
      month: [''],
      year: [''],
    });
  }

  // reset form
  reset() {
    this.claimEntryListingSendForApprovalForm.reset();
  }

  // on click on view icon
  onView() {
    this.router.navigate(['doi/db/claim-entry-view']);
  }

  // on click on listing button
  goToListing() {
    this.router.navigate(['doi/db/claim-entry-view']);
  }

  // on click on close button
  onClose() { }

  // on click on surveyor icon
  onSurveyor() {
    this.dataService.setOption('send-for-approval', 'isSurveyor');
    this.router.navigate(['doi/db/claim-investigation-surveyor']);
  }


}
