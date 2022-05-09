import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListValue } from 'src/app/model/common-listing';
import { DoiCommonService } from 'src/app/modules/services/doi/doi-common.service';
import { PartyMasterService } from 'src/app/modules/services/doi/party-master.service';
import { TalukaList, PartyMasterListing } from '../../../models/doiModel';

@Component({
  selector: 'app-party-master-listing',
  templateUrl: './party-master-listing.component.html',
  styleUrls: ['./party-master-listing.component.css']
})
export class PartyMasterListingComponent implements OnInit {

  todayDate = new Date();
  partyTypeList: ListValue[] = [];
  partyMasterListingForm: FormGroup;
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;
  partTypeCtrl: FormControl = new FormControl();
  districtCtrl: FormControl = new FormControl();
  statusCtrl: FormControl = new FormControl();
  officeLocationNameCtrl: FormControl = new FormControl();
  @ViewChild(MatPaginator, { static : false} ) paginator: MatPaginator;
  districtList: ListValue[] = [];

  statusList: any[] = [
    {
      value: 1, viewValue: 'Active'
    },
    {
      value: 0, viewValue: 'Inactive'
    }
  ]

  officeLocationNameList: ListValue[] = [
    { value: '1', viewValue: 'Ahmedabad' },
    { value: '2', viewValue: 'Gujarat' }
  ]

  displayedColumns: string[] = [
    'srno',
    'partyType',
    'partyName',
    'address',
    'officeLocationName',
    'addrerss',
    'contactNo',
    'emailId',
    'paymentPreferred',
    'createModeON',
    'modifyModeON',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<PartyMasterListing>;

  constructor(private fb: FormBuilder, 
    private doiCommonService: DoiCommonService,
    private partyMasterService: PartyMasterService) { }

  ngOnInit() {
    this.partyMasterListingForm = this.fb.group({
      partyType: [''],
      district: [''],
      status: [''],
      officeLocationName: [''],
    });
    this.partyMasterListingForm.valueChanges.subscribe(searchCriteria => {
      this.partyMasterService.filterChange(searchCriteria);
    });
    this.partyMasterListingForm.get('status').setValue(1);

    this.doiCommonService.doiPrefetchData$.subscribe(data => {
      this.districtList = this.doiCommonService.getDoiPrefetchData('districtList');
      this.partyTypeList = this.doiCommonService.getDoiPrefetchData('dbPartyTypes');
    });

    this.partyMasterService.getPartyMasterListing(this.partyMasterService.filters);
    this.partyMasterService.partyMasterListing$.subscribe(result => {
      this.totalRecords = result.totalRecords;
      this.dataSource =  new MatTableDataSource<PartyMasterListing>(result.viewData);
    })
  }

  pageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.partyMasterService.getPartyMasterListing(this.partyMasterService.filters,event.pageIndex,event.pageSize);
  }

  search() {
    this.pageIndex = 0;
    this.paginator.firstPage();
    this.partyMasterService.getPartyMasterListing(this.partyMasterService.filters, this.pageIndex,this.pageSize);
  }

  viewParty(index: number) {
    this.partyMasterService.viewParty(index);
  }

  editParty(index: number) {
    this.partyMasterService.editParty(index);
  }
}
