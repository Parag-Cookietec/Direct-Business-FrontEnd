import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NgModule } from '@angular/core';
import { LoadBalancerService } from '../services/load-balancer/load-balancer.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import * as moment from 'moment';
import { ChallanDistributionService } from '../services/challan-distribution/challan-distribution.service';
import { LoadBalancerAOListing } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { RBDregister } from 'src/app/models/e-pao/epaoModel';





const ELEMENT_DATA: LoadBalancerAOListing[] = [
  {
    bankName: 'HDFC Bank',
    noOfChallan: '500',
    amount: '5000000.00',
    totalChallan: '500',
    totalAmount: '5000000.00',
    branch: 'Receipt Branch 1',
    saDA: 'M B Patel',
    fromSaDA: 'H A Mehta',
    toSaDA: 'M K Patel',
    challanAmount: '2000.00',
    bank: 'HDFC Bank'
  },
  {
    bankName: 'Bank Of Baroda',
    noOfChallan: '500',
    amount: '5000000.00',
    totalChallan: '500',
    totalAmount: '5000000.00',
    branch: 'Receipt Branch 2',
    saDA: 'B G Patel',
    fromSaDA: 'H A Mehata',
    toSaDA: 'H A PAtel',
    challanAmount: '2000.00',
    bank: 'State Bank Of India'
  },
  {
    bankName: 'State Bank Of India',
    noOfChallan: '500',
    amount: '5000000.00',
    totalChallan: '500',
    totalAmount: '5000000.00',
    branch: 'Receipt Branch 3',
    saDA: 'H A Mehta',
    fromSaDA: 'H A Mehta',
    toSaDA: 'H M Patel',
    challanAmount: '2000.00',
    bank: 'State Bank Of India'
  },

];

@Component({
  selector: 'app-load-balancer-ao-listing',
  templateUrl: './load-balancer-ao-listing.component.html',
  styleUrls: ['./load-balancer-ao-listing.component.css']
})
export class LoadBalancerAoListingComponent implements OnInit {

  private paginator: MatPaginator;
  private sort: MatSort;

  pageSize = 1;
  showFirstLastButtons;
  pageSizeOptions = [1, 5, 10, 20, 50, 100];
  totalPages: number = 0;
  pageIndex: number = 0;



  //  FormGroup
  scrollForm: FormGroup;
  // date
  maxDate = new Date();
  todayDate = new Date();
  // table source
  newdataSource = new MatTableDataSource<any>();



  selection = new SelectionModel<any>(true, []);

  // form control
  branchCtrl: FormControl = new FormControl();
  bankCtrl: FormControl = new FormControl();
  bankNameCtrl: FormControl = new FormControl();
  saDaCtrl: FormControl = new FormControl();
  fromSaDaCtrl: FormControl = new FormControl();
  toSaDaCtrl: FormControl = new FormControl();
  branch2Ctrl: FormControl = new FormControl();

  bankList: any[];
  sadaList: any[];
  branchList: any[];



  // lists


  directiveObject = new EPaoDirectives(this.router, this.dialog);

  dataColumns: string[] = ['srNo', 'bankName', 'fromSaDA', 'totalChallan', 'totalAmount', 'toSaDA', 'noOfChallan', 'amount', 'toBranch', 'newaction'];

  public errorMessages;

  @ViewChild(MatPaginator, { read: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  jsonArr: { key: string; value: number }[];

  filterData: {
    srNo: string; bankName: string; fromSaDA: string; totalChallan: string; totalAmount: string;
    toSaDA: string; noOfChallan: string; amount: string; toBranch: string,
    toBranchId: string, bank: string, fromSaDaName: string, totalChallans: string, toSaDaName: string, totalChallansTrnf: string
    , totalAmountTrnf: string, toBranchName: string
  };

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder,
    private loadBalancerService: LoadBalancerService, private datepipe: DatePipe,
    private challandistributionservice: ChallanDistributionService,
    private toastr: ToastrService, private storageService: StorageService,) { }

  ngOnInit() {

    this.errorMessages = EPOAMessage;
    this.filterData = {
      srNo: "", bankName: "", fromSaDA: "", totalChallan: "", totalAmount: "", toSaDA: "", noOfChallan: "",
      amount: "", toBranch: "", toBranchId: "", bank: "", fromSaDaName: "", totalChallans: "", toSaDaName: "", totalChallansTrnf: "", totalAmountTrnf: "", toBranchName: ""
    };
    this.scrollForm = this.clearFilter();
    this.pageSize = 1;
    this.doSearch(this.filterData);
    this.getBankList();
    //this.getLoadBalancerAoList();
    this.getBranchList();

  }

  setDataSourceAttributes() {
    this.newdataSource.paginator = this.paginator;
    this.newdataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.newdataSource.filter = filterValue;
  }


  PageEvents(event: PageEvent) {
    this.updatePageSize(event);
    //console.log(event, 'total pageSize', this.pageSize)
    //console.log(event, 'total pages', this.totalPages)
    //console.log(event, 'current page Index', this.pageIndex)
    this.doSearch(this.filterData);

  }


  clearFilter() {
    return this.scrollForm = this.fb.group({
      bankName: [''],
      bank: [''],
      fromSaDaName: [''],
      totalChallans: [''],
      totalAmount: [''],
      toSaDaName: [''],
      totalChallansTrnf: [''],
      totalAmountTrnf: [''],
      toBranchName: ['']

    });
  }



  resetListing(): void {
    this.clearFilter();
    this.doSearch(this.filterData);

  }

  convertDateOnly(date) {
    if (date !== '' && date !== undefined && date !== null) {
      date = new Date(date);
      return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
    }
    return '';
  }

  convertDateTime(date) {
    if (!date || date !== '') {
      date = new Date(date);
      return this.datepipe.transform(date, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss').toString();
    }
    return null;
  }


  onSearch(data: any): void {

    this.filterData.bankName = data.bankName;
    this.filterData.fromSaDA = data.fromSaDA;
    this.filterData.totalChallan = data.totalChallan;
    this.filterData.totalAmount = data.totalAmount;
    this.filterData.toSaDA = data.toSaDA;
    this.filterData.noOfChallan = data.noOfChallan;
    this.filterData.amount = data.amount;
    this.filterData.toBranch = data.toBranch;
    this.filterData.toBranchId = data.toBranchId;
    this.filterData.bank = data.bank;
    this.filterData.fromSaDaName = data.fromSaDaName;
    this.filterData.totalChallans = data.totalChallans;
    this.filterData.totalAmount = data.totalAmount;
    this.filterData.toSaDaName = data.toSaDaName;
    this.filterData.totalChallansTrnf = data.totalChallansTrnf;
    this.filterData.totalAmountTrnf = data.totalAmountTrnf;
    this.filterData.toBranchName = data.toBranchName;
    this.doSearch(this.filterData);

  }


  doSearch(value): void {
    value.branchId = this.getBranchId();
    this.loadBalancerService.getLoadBalAODataOnSearch(value).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.initDataTable(res['result']);
          this.newdataSource = res['result']['result'];
          this.clearFilter();
        }
      },
      err => {
        this.toastr.error(err);
      }
    );


  }



  updatePageSize(event): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  initDataTable(result): void {
    if (result && result?.size) {
      this.totalPages = Math.ceil(result?.totalElement / this.pageSize);
    }

  }



  // getLoadBalancerAoList() {
  //   this.loadBalancerService
  //     .getLoadBalAOList({
  //       pageIndex: 0,
  //       pageElement: 100,
  //       sortByColumn: '',
  //       sortOrder: '',
  //       jsonArr: []
  //     })
  //     .subscribe(
  //       res => {
  //         if (res && res['result'] && res['status'] === 200) {
  //           this.newdataSource = res['result']['result'];
  //         }
  //       },
  //       err => {
  //         this.toastr.error(err);
  //       }
  //     );
  // }

  getBranchList() {
    this.loadBalancerService
      .getBranchNameList({
        pageIndex: 0,
        pageElement: 250,
        jsonArr: [
          { key: 'trnNo', value: '' },
          { key: 'fromDate', value: '' },
          { key: 'toDate', value: '' },
          { key: 'branchName', value: '' },
          { key: 'branchTypeId', value: 0 }
        ]
      })
      .subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            this.branchList = res['result']['result'];
            this.branchList = this.branchList.filter(itm => itm.branchName !== 'Account Current');
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
  }



  getBranchId() {
    const currentUser = this.storageService.get('currentUser');
    let data = currentUser['branchDetails'];
    data = data.map(itm => itm.branchId);
    return data;
  }

  getBankList() {
    this.challandistributionservice.getBankList({ branchId: this.getBranchId() }).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.bankList = res['result']['bankNames'];
          this.sadaList = res['result']['sadaName'];
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  onSelect(event: { source: { selected: any } }) {
    if (event.source.selected) {
      this.scrollForm.patchValue({
        toBranchName: event.source['value']
      });
    }
  }

  onSelectSada(event: { source: { selected: any } }, i) {
    if (event.source.selected) {
      this.newdataSource.data.forEach(element => {
        element['toSaDaId'] = event.source['value'];
        element['branchId'] = this.getBranchId();
        this.sadaList.filter(itm => {
          if (itm['sadaId'] === element['toSaDaId']) {
            element['toSaDaName'] = itm['sadaName'];
          }
        });
      });
    }
  }



  // convertDateOnly(date) {
  //   if (date !== '' && date !== undefined && date !== null) {
  //     date = new Date(date);
  //     return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
  //   }
  //   return '';
  // }


  // listingData(): void {
  //   this.jsonArr = [
  //     {
  //       key: 'activeStatus',
  //       value: 1
  //     }
  //   ];
  //   const value = this.scrollForm.value;
  //   for (const key in value) {
  //     if (value[key]) {
  //       const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
  //       this.jsonArr.push({
  //         key,
  //         value: moment.isMoment(feild)
  //           ? this.convertDateOnly(feild)
  //           : key === 'fileName'
  //             ? feild
  //             : parseFloat(feild) !== NaN
  //               ? parseFloat(feild)
  //               : feild
  //       });
  //     }
  //   }
  //   this.getDataOnSearch(value);
  // }



  // getDataOnSearch(value) {
  //   value.toBranchId = value.toBranchId === null || value.toBranchId ==='' ? '' : value.toBranchId;
  //   value.bankName = value.bankName === null|| value.bankName ==='' ? '' : value.bankName;
  //   value.bank = value.bank === null|| value.bank ==='' ? '' : value.bank;
  //   value.fromSaDaName = value.fromSaDaName === null|| value.fromSaDaName ==='' ? '' : value.fromSaDaName;
  //   value.totalChallans = value.totalChallans === null|| value.totalChallans ==='' ? '' : value.totalChallans;
  //   value.totalAmount = value.totalAmount === null|| value.totalAmount ==='' ? '' : value.totalAmount;
  //   value.toSaDaName = value.toSaDaName === null|| value.toSaDaName ==='' ? '' : value.toSaDaName;
  //   value.totalChallansTrnf = value.totalChallansTrnf === null|| value.totalChallansTrnf ==='' ? '' : value.totalChallansTrnf;
  //   value.totalAmountTrnf = value.totalAmountTrnf === null|| value.totalAmountTrnf ==='' ? '' : value.totalAmountTrnf;
  //   value.toBranchName = value.toBranchName === null|| value.toBranchName ==='' ? '' : value.toBranchName;
  //   value.branchId = this.getBranchId();

  //   this.loadBalancerService.getLoadBalAODataOnSearch(value).subscribe(
  //     res => {
  //       if (res && res['result'] && res['status'] === 200) {
  //         this.newdataSource = res['result'];
  //       }
  //     },
  //     err => {
  //       this.toastr.error(err);
  //     }
  //   );
  // }



  reset() {
    //this.scrollData();
    this.scrollForm.reset();
    this.directiveObject.selection.clear();
    this.newdataSource.data = [];
    // this.getLoadBalancerAoList();
  }

  onClose() {
    const dialogRef = this.dialog.open(ProceedDialogComponent, {
      width: '300px',
      height: 'auto',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.router.navigate(['/dashboard'], { skipLocationChange: true });
      }
    });
  }



}



