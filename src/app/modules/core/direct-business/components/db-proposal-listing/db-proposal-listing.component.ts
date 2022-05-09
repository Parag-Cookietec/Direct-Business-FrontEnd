import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/common/data.service';
import { CommonListing } from 'src/app/model/common-listing';
import { TalukaList, PolicyProposalOffer } from '../../models/doiModel';

@Component({
  selector: 'app-db-proposal-listing',
  templateUrl: './db-proposal-listing.component.html',
  styleUrls: ['./db-proposal-listing.component.css']
})
export class DbProposalListingComponent implements OnInit {


  // date
  todayDate = new Date();
  // form group
  policyPaymentForm: FormGroup;
  // form control
  proposerTypeCtrl: FormControl = new FormControl();
  districtCtrl: FormControl = new FormControl();
  talukaCtrl: FormControl = new FormControl();
  policyTypeCtrl: FormControl = new FormControl();
  monthCtrl: FormControl = new FormControl();
  yearCtrl: FormControl = new FormControl();

  // lists start
  proposerTypeList: CommonListing[] = [
    { value: '1', viewValue: 'Govt. Department' },
    { value: '2', viewValue: 'Govt. Board' },
    { value: '3', viewValue: 'Govt. Company' },
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

  policyTypeList: CommonListing[] = [
    { value: '1', viewValue: 'Standard Fire & Special Perils Policy Schedule' },
    { value: '2', viewValue: 'Burglary & Housebreaking Policy' },
    { value: '3', viewValue: 'Electronics Equipment/Material Damage Schedule' },
    { value: '4', viewValue: 'Case-In-Transit Insurance' },
    { value: '5', viewValue: 'Terrorism Pool Insurance' }
  ];

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

  // table data start
  columns: string[] = [
    'position',
    'proposalNo',
    'proposalDate',
    'referenceNo',
    'proposerName',
    'mobNo',
    'typeofPolicy',
    'locationofProperty',
    'district',
    'sumInsured',
    'createdon',
    'createdby',
    'modifiedon',
    'modifiedby',
    'status',
    'action'
  ];
  elementData: any[] = [
    {
      proposalNo: '19-20/P/DB/SF/00019',
      proposalDate: '20-Jul-19',
      referenceNo: 'DOI/DB/19-20/E0091',
      proposerName: 'Mr. Manubhai G Dodiya',
      mobNo: '9876543210',
      typeofPolicy: 'Standard Fire & Special Perils',
      locationofProperty: 'Block 2, Gandhinagar',
      district: 'Gandhinagar',
      sumInsured: '1,00,000',
      createdon: '20-Jul-19',
      createdby: 'Mr. J S Shah',
      modifiedon: '20-Jul-19',
      modifiedby: 'Mr. J S Shah',
      status: 'Approve',
    },
    {
      proposalNo: '19-20/P/DB/BH/00025',
      proposalDate: '20-Mar-20',
      referenceNo: 'DOI/DB/19-20/E0098',
      proposerName: 'Mr. Champakbhai Patel',
      mobNo: '9988776698',
      typeofPolicy: 'Burglary & Housebreaking Policy',
      locationofProperty: 'P, Gandhinagar',
      district: 'Gandhinagar',
      sumInsured: '50,000',
      createdon: '20-Mar-20',
      createdby: 'Mr. J S Shah',
      modifiedon: '20-Mar-20',
      modifiedby: 'Mr. J S Shah',
      status: 'Approve',
    },
    {
      proposalNo: '20-21/P/DB/BH/00003',
      proposalDate: '22-Dec-20',
      referenceNo: 'DOI/DB/19-20/E0102',
      proposerName: 'Mrs. Dakshaben Modi',
      mobNo: '9871234567',
      typeofPolicy: 'Burglary & Housebreaking Policy',
      locationofProperty: 'Block 20, Sardar Bhavan, Gandhinagar',
      district: 'Gandhinagar',
      sumInsured: '1,00,000',
      createdon: '22-Dec-20',
      createdby: 'Mr. J S Shah',
      modifiedon: '22-Dec-20',
      modifiedby: 'Mr. J S Shah',
      status: 'Approve',
    },
    {
      proposalNo: '20-21/P/DB/EE/00014',
      proposalDate: '23-Jan-21',
      referenceNo: 'DOI/DB/19-20/E0110',
      proposerName: 'Ms. Sejal Patel',
      mobNo: '6578904567',
      typeofPolicy: 'Electronics Equipment/Material Damage Schedule ',
      locationofProperty: 'Sardar Bhavan, Gandhinagar',
      district: 'Gandhinagar',
      sumInsured: '1,00,000',
      createdon: '23-Jan-21',
      createdby: 'Mr. J S Shah',
      modifiedon: '23-Jan-21',
      modifiedby: 'Mr. J S Shah',
      status: 'Pending',
    },
  ];
  dataSource = new MatTableDataSource<PolicyProposalOffer>(this.elementData);
  // table data end

  // constructor
  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.policyPaymentForm = this.fb.group({
      proposerType: [''],
      proposerName: [''],
      policyType: [''],
      month: [''],
      year: [''],
      district: [''],
      taluka: [''],
      loan: ['']
    });
  }

  // reset form
  reset() {
    this.policyPaymentForm.reset();
  }

  // select taluka on basis of district
  // selectDistrict() {
  //   const district = this.policyPaymentForm.value.district;
  //   if (district !== '' && district != null) {
  //     this.talukaNameList = this.talukaList.filter(
  //       searchBy => searchBy.district.toLowerCase() === district.toLowerCase());
  //   }
  // }



}
