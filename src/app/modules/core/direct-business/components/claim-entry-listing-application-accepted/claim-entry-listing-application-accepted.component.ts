import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonListing } from 'src/app/model/common-listing';
import { TalukaList, AttachmentTypeList, ClaimEntryListingApplicationAccepted } from '../../models/doiModel';

@Component({
  selector: 'app-claim-entry-listing-application-accepted',
  templateUrl: './claim-entry-listing-application-accepted.component.html',
  styleUrls: ['./claim-entry-listing-application-accepted.component.css']
})
export class ClaimEntryListingApplicationAcceptedComponent implements OnInit {

  // date
  todayDate = new Date();
  // form group
  claimEntryListingApplicationAcceptedForm: FormGroup;
  // form control
  districtCtrl: FormControl = new FormControl();
  talukaCtrl: FormControl = new FormControl();
  monthCtrl: FormControl = new FormControl();
  yearCtrl: FormControl = new FormControl();
  policyNoCtrl: FormControl = new FormControl();

  // lists start
  districtList: CommonListing[] = [
    { value: '00', viewValue: 'Ahmedabad' },
    { value: '01', viewValue: 'Amreli' },
    { value: '02', viewValue: 'Anand' },
    { value: '03', viewValue: 'Aravalli' },
    { value: '04', viewValue: 'Banaskantha' },
    { value: '05', viewValue: 'Bharuch' },
    { value: '06', viewValue: 'Bhavnagar' },
  ];
  talukaList: TalukaList[] = [
    { value: '01', district: '00', viewValue: 'City East' },
    { value: '02', district: '00', viewValue: 'City West' },
    { value: '03', district: '00', viewValue: 'Bavla' },
    { value: '04', district: '00', viewValue: 'Daskroi' },
    { value: '05', district: '00', viewValue: 'Detroj-Rampura' },
    { value: '06', district: '00', viewValue: 'Dhandhuka' },
    { value: '07', district: '00', viewValue: 'Dholera' },
    { value: '08', district: '00', viewValue: 'Dholka' },
    { value: '09', district: '00', viewValue: 'Mandal' },
    { value: '10', district: '00', viewValue: 'Sanand' },
    { value: '11', district: '00', viewValue: 'Viramgam' },
    { value: '01', district: '01', viewValue: 'Amreli' },
    { value: '02', district: '01', viewValue: 'Babra' },
    { value: '03', district: '01', viewValue: 'Bagasara' },
    { value: '04', district: '01', viewValue: 'Dhari' },
    { value: '05', district: '01', viewValue: 'Jafrabad' },
    { value: '06', district: '01', viewValue: 'Khambha' },
    { value: '07', district: '01', viewValue: 'Kunkavav vadia' },
    { value: '08', district: '01', viewValue: 'Lathi' },
    { value: '09', district: '01', viewValue: 'Lilia' },
    { value: '10', district: '01', viewValue: 'Rajula' },
    { value: '11', district: '01', viewValue: 'Savarkundla' },
    { value: '01', district: '02', viewValue: 'Anand' },
    { value: '02', district: '02', viewValue: 'Anklav' },
    { value: '03', district: '02', viewValue: 'Borsad' },
    { value: '04', district: '02', viewValue: 'Khambhat' },
    { value: '05', district: '02', viewValue: 'Petlad' },
    { value: '06', district: '02', viewValue: 'Sojitra' },
    { value: '07', district: '02', viewValue: 'Tarapur' },
    { value: '08', district: '02', viewValue: 'Umreth' },
    { value: '01', district: '03', viewValue: 'Bayad' },
    { value: '02', district: '03', viewValue: 'Bhiloda' },
    { value: '03', district: '03', viewValue: 'Dhansura' },
    { value: '04', district: '03', viewValue: 'Malpur' },
    { value: '05', district: '03', viewValue: 'Meghraj' },
    { value: '06', district: '03', viewValue: 'Modasa' },
    { value: '01', district: '04', viewValue: 'Amirgadh' },
    { value: '02', district: '04', viewValue: 'Bhabhar' },
    { value: '03', district: '04', viewValue: 'Danta' },
    { value: '04', district: '04', viewValue: 'Dantiwada' },
    { value: '05', district: '04', viewValue: 'Deesa' },
    { value: '06', district: '04', viewValue: 'Deodar' },
    { value: '07', district: '05', viewValue: 'Dhanera' },
    { value: '08', district: '04', viewValue: 'Kankrej' },
    { value: '09', district: '06', viewValue: 'Lakhani' },
    { value: '10', district: '04', viewValue: 'Palanpur' },
  ];
  talukaNameList: CommonListing[];

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
    'policyType',
    'district',
    'taluka',
    'claimAmount',
    'claimEnteredDate',
    'status',
    'action'
  ];

  elementData: ClaimEntryListingApplicationAccepted[] = [
    {
      policyNo: 'DOI/DB/19-20/0001',
      insuredName: 'Civil Department',
      policyType: 'Fire & Burglary',
      district: 'Bharuch',
      taluka: 'Dahej',
      claimEnteredDate: new Date('04/01/2019'),
      claimAmount: 370000,
      status: 'Application Accepted'
    }
  ];
  dataSource = new MatTableDataSource<ClaimEntryListingApplicationAccepted>(this.elementData);
  // table end

  // constructor
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.claimEntryListingApplicationAcceptedForm = this.fb.group({
      policyNo: [''],
      insuredName: [''],
      district: [''],
      taluka: [''],
      month: [''],
      year: [''],
    });
  }

  // reset form
  reset() {
    this.claimEntryListingApplicationAcceptedForm.reset();
  }

  // select taluka on basis of district
  selectDistrict() {
    const district = this.claimEntryListingApplicationAcceptedForm.value.district;
    if (district !== '' && district != null) {
      this.talukaNameList = this.talukaList.filter(
        searchBy => searchBy.district.toLowerCase() === district.toLowerCase());
    }
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

}
