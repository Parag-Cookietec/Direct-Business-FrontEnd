import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jpaMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from '../../models/doiModel';

@Component({
  selector: 'app-db-policy-entry',
  templateUrl: './db-policy-entry.component.html',
  styleUrls: ['./db-policy-entry.component.css']
})
export class DbPolicyEntryComponent implements OnInit {
  // Variable
  errorMessage: any;
  // Date
  todayDate = new Date();
  // Form Group
  dbPolicyEntry: FormGroup;
  riskTypeCtrl: FormControl = new FormControl();

  // List
  districtList: ListValue[] = [
    { value: '00', viewValue: 'Ahmedabad' },
    { value: '01', viewValue: 'Amreli' },
    { value: '02', viewValue: 'Anand' },
    { value: '03', viewValue: 'Aravalli' },
    { value: '04', viewValue: 'Banaskantha' },
    { value: '05', viewValue: 'Bharuch' },
    { value: '06', viewValue: 'Bhavnagar' },
  ];
  taluka_list: any[] = [
    { value: '01', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'City East' },
    { value: '02', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'City West' },
    { value: '03', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Bavla' },
    { value: '04', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Daskroi' },
    { value: '05', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Detroj-Rampura' },
    { value: '06', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Dhandhuka' },
    { value: '07', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Dholera' },
    { value: '08', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Dholka' },
    { value: '09', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Mandal' },
    { value: '10', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Sanand' },
    { value: '11', district: '00', districtadd: '00', nodalDistrict: '00', viewValue: 'Viramgam' },
    { value: '01', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Amreli' },
    { value: '02', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Babra' },
    { value: '03', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Bagasara' },
    { value: '04', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Dhari' },
    { value: '05', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Jafrabad' },
    { value: '06', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Khambha' },
    { value: '07', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Kunkavav vadia' },
    { value: '08', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Lathi' },
    { value: '09', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Lilia' },
    { value: '10', district: '01', districtadd: '01', nodalDistrict: '01', viewValue: 'Rajula' },
    { value: '11', district: '01', districtadd: '01', nodalDistrict: '00', viewValue: 'Savarkundla' },
    { value: '01', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Anand' },
    { value: '02', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Anklav' },
    { value: '03', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Borsad' },
    { value: '04', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Khambhat' },
    { value: '05', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Petlad' },
    { value: '06', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Sojitra' },
    { value: '07', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Tarapur' },
    { value: '08', district: '02', districtadd: '02', nodalDistrict: '02', viewValue: 'Umreth' },
    { value: '01', district: '03', districtadd: '03', nodalDistrict: '03', viewValue: 'Bayad' },
    { value: '02', district: '03', districtadd: '03', nodalDistrict: '03', viewValue: 'Bhiloda' },
    { value: '03', district: '03', districtadd: '03', nodalDistrict: '03', viewValue: 'Dhansura' },
    { value: '04', district: '03', districtadd: '03', nodalDistrict: '03', viewValue: 'Malpur' },
    { value: '05', district: '03', districtadd: '03', nodalDistrict: '03', viewValue: 'Meghraj' },
    { value: '06', district: '03', districtadd: '03', nodalDistrict: '03', viewValue: 'Modasa' },
    { value: '01', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Amirgadh' },
    { value: '02', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Bhabhar' },
    { value: '03', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Danta' },
    { value: '04', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Dantiwada' },
    { value: '05', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Deesa' },
    { value: '06', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Deodar' },
    { value: '07', district: '05', districtadd: '05', nodalDistrict: '05', viewValue: 'Dhanera' },
    { value: '08', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Kankrej' },
    { value: '09', district: '06', districtadd: '06', nodalDistrict: '06', viewValue: 'Lakhani' },
    { value: '10', district: '04', districtadd: '04', nodalDistrict: '04', viewValue: 'Palanpur' },


  ];
  // Risk Type
  riskType_list: any[] = [
    {
      value: '1',
      viewValue: 'Fire'
    }
  ];
  talukaNameList: any[];
  villageList: ListValue[] = [{
    value: '1', viewValue: 'Sanand '
  },
  { value: '2', viewValue: 'Dholka ' },
  { value: '3', viewValue: 'Bavala ' },
  { value: '4', viewValue: 'Detroj' },
  ];
  occupationofBuildingList: ListValue[] = [{
    value: '1', viewValue: 'Construction'
  },


  ];
  selectPropertyList: ListValue[] = [{
    value: '1', viewValue: 'Construction'
  },
  ];
  // control

  districtCtrl: FormControl = new FormControl();
  talukaCtrl: FormControl = new FormControl();
  villageCtrl: FormControl = new FormControl();
  occupationofBuildingCtrl: FormControl = new FormControl();
  selectPropertyCtrl: FormControl = new FormControl();

  constructor(private router: Router, private el: ElementRef,
    public dialog: MatDialog, private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit() {
    this.errorMessage = jpaMessage;

    this.dbPolicyEntry = this.fb.group({
      policyNo: [''],
      date: [''],
      proposalNo: [''],
      startDateofInsurance: [''],
      endDateofInsurance: [''],
      nameofInsured: [''],
      insuredAddress: [''],
      district: [''],
      taluka: [''],
      pincode: [''],
      village: [''],
      locationofInsuredProperty: [''],
      heightofBuilding: [''],
      classofConstruction: [''],
      occupationofBuilding: [''],
      ratedAs: [''],
      challanNo: [''],
      challanDate: [''],
      challanAccountingDate: [''],
      totalPremium: [''],
      GST: [''],
      ratePer: [''],
      rate: [''],
      discount: [''],
      basicSumInsurance: [''],
      selectProperty: [''],
      riskType: [''],
      paymentMdae: ['']

    });
  }

  navigate() {
    this.router.navigate(['./doi/jpa-legal-entry-for-request-listing']);
  }
  // select taluka on basis of district
  selectDistrict() {
    const district = this.dbPolicyEntry.value.district;
    if (district !== '' && district != null) {
      this.talukaNameList = this.taluka_list.filter(
        searchBy => searchBy.district.toLowerCase() === district.toLowerCase());
    }
    const districtadd = this.dbPolicyEntry.value.districtadd;

  }
}
