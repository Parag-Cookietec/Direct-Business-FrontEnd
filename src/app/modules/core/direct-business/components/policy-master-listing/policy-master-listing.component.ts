import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonListing } from 'src/app/model/common-listing';
import { DoiCommonService } from 'src/app/modules/services/doi/doi-common.service';
import { TalukaList, PolicyMasterListing } from '../../models/doiModel';

@Component({
  selector: 'app-policy-master-listing',
  templateUrl: './policy-master-listing.component.html',
  styleUrls: ['./policy-master-listing.component.css']
})
export class PolicyMasterListingComponent implements OnInit {
  isTokentable = false;
  isTokentableone = false;
  isTokentabletwo = false
  // date
  todayDate = new Date();
  // form group
  policyMasterListingForm: FormGroup;
  // form control
  policyTypeCtrl: FormControl = new FormControl();
  districtCtrl: FormControl = new FormControl();
  talukaCtrl: FormControl = new FormControl();
  monthCtrl: FormControl = new FormControl();
  yearCtrl: FormControl = new FormControl();
  riskTypeCtrl: FormControl = new FormControl();

  // lists start

  riskTypeList: CommonListing[] = [
    { value: '1', viewValue: 'Standard Fire & Special Perils Policy Schedule' },
    { value: '2', viewValue: 'Burglary & Housebreaking Policy' },
    { value: '3', viewValue: 'Electronics Equipment/Material Damage Schedule' },
    { value: '4', viewValue: 'Case-In-Transit Insurance' },
    { value: '5', viewValue: 'Terrorism Pool Insurance' }
  ];
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
  // lists end
  policyTypeList: CommonListing[] = [
    { value: '1', viewValue: 'New' },
    { value: '2', viewValue: 'Renewal' },
    { value: '3', viewValue: 'Endrosment' },
    { value: '4', viewValue: 'Renewal Notice' },
    { value: '5', viewValue: 'Renew option' },
  ];
  // table data start
  columns: string[] = [
    'position',
    'policyNo',
    'riskType',
    'insuredName',
    'district',
    'taluka',
    'createdOn',
    'modifyModeON',
    'status',
    'action'
  ];
  elementData: any[] = [
    {
      policyNo: 'DOI/DB/19-20/0001',
      riskType: 'Standard Fire & Special Perils',
      insuredName: 'Civil Department',
      district: 'Bharuch',
      taluka: 'Dahej',
      createdOn: new Date('04/01/2019'),
      modifyModeON: '22-Jun-2018 01:22PM',
      status: 'Approved'
    },
    {
      policyNo: 'DOI/DB/19-20/0002',
      riskType: 'Burglary & Housebreaking Policy',
      insuredName: 'Agriculture Department',
      district: 'Karjan',
      taluka: 'Karjan',
      createdOn: new Date('04/01/2019'),
      modifyModeON: '22-Jun-2018 01:22PM',
      status: 'Approved'
    },
    {
      policyNo: 'DOI/DB/19-20/0003',
      riskType: 'Burglary & Housebreaking Policy',
      insuredName: 'Defence Office',
      district: 'Ahmedabad',
      taluka: 'Morwadi',
      createdOn: new Date('04/01/2019'),
      modifyModeON: '22-Jun-2018 01:22PM',
      status: 'Approved'
    },
    {
      policyNo: 'DOI/DB/19-20/0004',
      riskType: 'Electronics Equipment/Material Damage Schedule ',
      insuredName: 'Finance Office',
      district: 'Valsad',
      taluka: 'Vapi',
      createdOn: new Date('04/01/2019'),
      modifyModeON: '22-Jun-2018 01:22PM',
      status: 'Approved'
    },
    {
      policyNo: 'DOI/DB/19-20/0005',
      riskType: 'Electronics Equipment/Material Damage Schedule ',
      insuredName: 'Treasury Department',
      district: 'Surat',
      taluka: 'Tapi',
      createdOn: new Date('04/01/2019'),
      modifyModeON: '22-Jun-2018 01:22PM',
      status: 'Approved'
    },
  ];
  dataSource = new MatTableDataSource<PolicyMasterListing>(this.elementData);
  // table data end

  // constructor
  constructor(private fb: FormBuilder, private router: Router, private doiCommonService: DoiCommonService) { }

  ngOnInit() {
    this.policyMasterListingForm = this.fb.group({
      policyNo: [''],
      insuredName: [''],
      district: [''],
      taluka: [''],
      month: [''],
      year: [''],
      policyType: [''],
      endorsementNo: [''],
      riskType: [''],
    });
  }

  // on click on reset button
  reset() {
    this.policyMasterListingForm.reset();
  }

  // select taluka on basis of district
  selectDistrict() {
    const district = this.policyMasterListingForm.value.district;
    if (district !== '' && district != null) {
      this.talukaNameList = this.talukaList.filter(
        searchBy => searchBy.district.toLowerCase() === district.toLowerCase());
    }
  }

  // on click on view button
  onView() {
    this.router.navigate(['doi/db/policy-master-view']);
  }
  ontoken(index) {
    if (index.value === '3') {
      this.isTokentable = true;
    } else {
      this.isTokentable = false;
    }
    if (index.value === '1') {
      this.isTokentableone = true;
    } else {
      this.isTokentableone = false;
    }
    if (index.value === '2') {
      this.isTokentabletwo = true;
    } else {
      this.isTokentabletwo = false;
    }

  }
}
