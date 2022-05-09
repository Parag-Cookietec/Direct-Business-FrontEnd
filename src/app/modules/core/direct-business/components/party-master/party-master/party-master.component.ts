import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-listing';
import { DoiCommonService } from 'src/app/modules/services/doi/doi-common.service';
import { PartyMasterService } from 'src/app/modules/services/doi/party-master.service';
import { TalukaList1, PartyMasterOfficeDetails, PartyMasterLocationDetails, PartyMasterBankDetails } from '../../../models/doiModel';
const enum ACTION {
  EDIT,
  VIEW,
  ADD
}
@Component({
  selector: 'app-party-master',
  templateUrl: './party-master.component.html',
  styleUrls: ['./party-master.component.css']
})
export class PartyMasterComponent implements OnInit, OnDestroy {

  todayDate = new Date();
  errorMessage = doiMessage;
  partyMasterForm: FormGroup;
  branchTypeCtrl: FormControl = new FormControl();
  partyTypeCtrl: FormControl = new FormControl();
  districtCtrl: FormControl = new FormControl();
  talukaCtrl: FormControl = new FormControl();
  officeTypeCtrl: FormControl = new FormControl();
  districtOfficeCtrl: FormControl = new FormControl();
  talukaOfficeCtrl: FormControl = new FormControl();
  locationTypeCtrl: FormControl = new FormControl();
  districtLocationCtrl: FormControl = new FormControl();
  talukaLocationCtrl: FormControl = new FormControl();
  cityLocationCtrl: FormControl = new FormControl();
  bankNameCtrl: FormControl = new FormControl();
  branchNameCtrl: FormControl = new FormControl();
  paymentPreferedCtrl: FormControl = new FormControl();
  cityOfficeCtrl: FormControl = new FormControl();

  partyTypeList: ListValue[] = [];
  officeTypeList: ListValue[] = [];
  cityList: ListValue[] = [
    { value: '1', viewValue: 'Gandhinagar' },
    { value: '2', viewValue: 'Dwarika' },
  ];
  locationTypeList: ListValue[] = [
    { value: '1', viewValue: 'ABC' },
    { value: '2', viewValue: 'XYZ' },
  ];
  branchNameList: ListValue[] = [];
  branchTypeList: ListValue[] = [];
  bankNameList: ListValue[] = [];
  paymentPreferedList: ListValue[] = [];


  districtList: ListValue[] = [];
  taluka_list: ListValue[] = [];
  attachmentTypeCode: ListValue[] = [
    { value: '01', viewValue: 'Supporting Document' },
    { value: '02', viewValue: 'Sanction Order' },
    { value: '03', viewValue: 'Others' },
  ];

  officeColumns: string[] = [
    'officeType',
    'officeName',
    'officeAddress',
    'district',
    'taluka',
    'city',
    'pinCode',
    'action',
  ];
  officeDetails: PartyMasterOfficeDetails[] = [
    {
      officeType: '',
      officeName: '',
      officeAddress: '',
      district: '',
      taluka: '',
      city: '',
      pinCode: '',
      talukaList: []
    }
  ];
  dataSourceOfficeDetails = new MatTableDataSource<PartyMasterOfficeDetails>(this.officeDetails);

  displayedColumns1: string[] = [
    'locationType',
    'locationName',
    'locationAddress',
    'district',
    'taluka',
    'city',
    'pinCode',
    'action',
  ];
  locationDetails: PartyMasterLocationDetails[] = [
    {
      locationType: '',
      locationName: '',
      locationAddress: '',
      district: '',
      taluka: '',
      city: '',
      pinCode: '',
      talukaList: []
    }
  ];
  dataSourceRiskLocationDetails = new MatTableDataSource<PartyMasterLocationDetails>(this.locationDetails);

  bakDetailsColumns: string[] = [
    'bankName',
    'branchName',
    'branchType',
    'BranchCode',
    'ifscCode',
    'accountNo',
    'paymentPrefered',
    'action',
  ];
  bankDataCollection: PartyMasterBankDetails[] = [
    {
      bankId: '',
      bankName: '',
      branchId: '',
      branchName: '',
      ifscCode: '',
      accountNo: '',
      paymentPrefered: '',
      BranchCode: '',
      branchType: '',
      branchList: []
    }
  ];
  dataSourceBankDetails = new MatTableDataSource<PartyMasterBankDetails>(this.bankDataCollection);
  routerSubscription: Subscription;
  listingSubscription: Subscription;
  currentAction: ACTION;
  constructor(private fb: FormBuilder, private router: Router,
    private doiCommonService: DoiCommonService, private partyMasterService: PartyMasterService) { 
      this.routerSubscription = this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
          console.log(event);
          if(event.url.includes('edit')) {
            this.currentAction = ACTION.EDIT;
          } else if(event.url.includes('view')) {
            this.currentAction = ACTION.VIEW;
          } else {
            this.currentAction = ACTION.ADD;
          }
        }
      })
    }

  ngOnInit() {
    this.partyMasterForm = this.fb.group({
      partyType: ['2'],
      leaderName: [''],
      insuredName: [''],
      partyAddress: [''],
      district: [''],
      taluka: [''],
      city: [''],
      pinCode: [''],
      contactNo: [''],
      email: [''],
      adharNo: [''],
      panCard: [''],
      coInsShare: [''],
      gstin: [''],
    });
    switch(this.currentAction) {
      case ACTION.EDIT:
      case ACTION.VIEW:
        if(!this.partyMasterService.currentIndex && this.partyMasterService.currentIndex !== 0) {
          this.router.navigate(['dashboard/doi/party-master-listing']);
          break;
        }
        const currentData = this.partyMasterService.getCurrentPartyMasterDataByIndex();
          this.partyMasterForm = this.fb.group({
            partyType: [currentData.partyTypeId.toString()],
            leaderName: [''],
            insuredName: [''],
            partyAddress: [currentData.partyAddress || ''],
            district: [currentData.districtId],
            taluka: [currentData.talukaId],
            city: [currentData.cityName],
            pinCode: [''],
            contactNo: [currentData.contactNum],
            email: [currentData.emailId],
            adharNo: [''],
            panCard: [currentData.panNumb],
            coInsShare: [''],
            gstin: [currentData.gstinNumb],
          });
        if(this.currentAction === ACTION.VIEW) {
          this.disableFormControls();
          this.bakDetailsColumns.splice(this.bakDetailsColumns.findIndex(data => data === 'action',1));
          this.officeColumns.splice(this.officeColumns.findIndex(data => data === 'action',1));
        }
        this.selectDistrict();

        if(currentData.mdoiDbPartyBankDtls && currentData.mdoiDbPartyBankDtls.length > 0) {
          this.bankDataCollection.length = 0;
          currentData.mdoiDbPartyBankDtls.forEach(bank => {
            this.addBankDetails(bank.bankId, bank.bankName, bank.branchName, 
              bank.branchId, bank.bankIfscCode, bank.accountNo, bank.prefPaymentType, bank.branchCode, bank.branchTypeId.toString());
          });
          this.bankDataCollection.forEach((bank,index) => {
            this.selectBank({source: {selected: {viewValue: bank.bankName}}},index);
          });
        }

        if(currentData.mdoiDbPartyOfficeDtls && currentData.mdoiDbPartyOfficeDtls.length > 0) {
          this.officeDetails.length = 0;
          currentData.mdoiDbPartyOfficeDtls.forEach(office => {
            this.addOffice(office.offcTypeId.toString(), office.officeName, office.officeAddress, office.districtId, office.talukaId, office.cityId.toString(), office.pincode);
          });
          this.officeDetails.forEach((office, index) => {
            this.selectDistrict(index, 'office');
          })
        }
        break;
    }

    this.doiCommonService.doiPrefetchData$.subscribe(data => {
      this.districtList = this.doiCommonService.getDoiPrefetchData('districtList');
      this.partyTypeList = this.doiCommonService.getDoiPrefetchData('dbPartyTypes');
      this.officeTypeList = this.doiCommonService.getDoiPrefetchData('officeTypes');
      this.paymentPreferedList = this.doiCommonService.getDoiPrefetchData('paymentModes');
      this.bankNameList = this.doiCommonService.getDoiPrefetchData('bankDetails');
      this.branchTypeList = this.doiCommonService.getDoiPrefetchData('bankBranchTypes');
    });
  }

  disableFormControls() {
    Object.keys(this.partyMasterForm.controls).forEach(key => {
      this.partyMasterForm.controls[key].disable();
    });
  }
  // select taluka on basis of district
  selectDistrict(index?: any, selectFor?: any) {
    if(index || index === 0) {
      switch(selectFor) {
        case 'office':
          this.doiCommonService.getTalukaList(parseInt(this.dataSourceOfficeDetails.data[index].district)).subscribe(res => {
            this.dataSourceOfficeDetails.data[index].talukaList = res.result;
          });
          break;
        case 'risk':
          this.doiCommonService.getTalukaList(parseInt(this.dataSourceRiskLocationDetails.data[index].district)).subscribe(res => {
            this.dataSourceRiskLocationDetails.data[index].talukaList = res.result;
          });
          break;
      }
    } else {
      const district = this.partyMasterForm.value.district;
      this.doiCommonService.getTalukaList(district).subscribe( response => {
        this.taluka_list = response.result
      });
    }
  }

  addOffice(officeType?: any, officeName?: any, officeAddress?: any, district?: any, taluka?: any,
    city?: any, pinCode?: any, talukaList?: any) {
    const data = this.dataSourceOfficeDetails.data;
    data.push({
      officeType: officeType || '',
      officeName: officeName || '',
      officeAddress: officeAddress || '',
      district: district || '',
      taluka: taluka || '',
      city: city || '',
      pinCode: pinCode || '',
      talukaList: talukaList || []
    });
    this.dataSourceOfficeDetails.data = data;
  }

  addLocation() {
    const data = this.dataSourceRiskLocationDetails.data;
    data.push({
      locationType: '',
      locationName: '',
      locationAddress: '',
      district: '',
      taluka: '',
      city: '',
      pinCode: '',
      talukaList: []
    });

    this.dataSourceRiskLocationDetails.data = data;
  }

  addBankDetails(bankId?: any, bankName?: any, branchName?: any, 
    branchId?: any, ifscCode?: any, accountNo?: any, paymentPrefered?: any,
    BranchCode?: any, branchType?: any,  branchList?: any) {
    const data = this.dataSourceBankDetails.data;
    data.push({
      bankId: bankId || '',
      bankName: bankName || '',
      branchName: branchName || '',
      branchId: branchId || '',
      ifscCode: ifscCode || '',
      BranchCode: BranchCode || '',
      branchType: branchType || '',
      accountNo: accountNo || '',
      paymentPrefered: paymentPrefered || '',
      branchList: branchList || []
    });
    this.dataSourceBankDetails.data = data;
  }

  selectBank(event: any, index: number) {
    this.doiCommonService.getBankBranches(parseInt(this.dataSourceBankDetails.data[index].bankId)).subscribe(res => {
      this.dataSourceBankDetails.data[index].branchList = res.result;
      this.dataSourceBankDetails.data[index].bankName = event.source.selected.viewValue;
    });
  }

  selectBranch(event: any, index: number) {
    this.dataSourceBankDetails.data[index].branchName = event.source.selected.viewValue;
  }

  deleteColumn(dataSource, index) {
    dataSource.data.splice(index, 1);
    dataSource.data = dataSource.data;
  }


  onSubmit() {
    console.log(this.partyMasterForm.value, this.bankDataCollection, this.officeDetails, this.locationDetails)
    this.partyMasterService.addPartyMasterEntry(this.partyMasterForm.value,
      this.bankDataCollection, this.officeDetails, 
      this.locationDetails,
      this.partyMasterService.getCurrentPartyMasterDataByIndex()['dbPartyId']
      ).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  onReset() {
    this.partyMasterForm.reset();
  }

  goToListing() {
    this.router.navigate(['dashboard/doi/party-master-listing']);
  }

  onClose() { }

  ngOnDestroy(): void {
    if(this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if(this.listingSubscription) {
      this.listingSubscription.unsubscribe();
    }
  }
}
