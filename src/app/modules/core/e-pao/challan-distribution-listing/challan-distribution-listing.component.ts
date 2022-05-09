import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { ChallanDistributionListing, ListValue } from 'src/app/models/e-pao/epaoModel';
import { ChallanDistributionService } from '../services/challan-distribution/challan-distribution.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-challan-distribution-listing',
    templateUrl: './challan-distribution-listing.component.html',
    styleUrls: ['./challan-distribution-listing.component.css']
})
export class ChallanDistributionListingComponent implements OnInit {
    
    private paginator: MatPaginator;
    private sort: MatSort;
  
    pageSize = 1;
    showFirstLastButtons;
    pageSizeOptions = [1, 5, 10, 20, 50, 100];
    totalPages: number = 0;
    pageIndex: number = 0;
    
    // FormGroup
    challanForm: FormGroup;
    // Date
    maxDate = new Date();
    todayDate = new Date();
    // MatTableDataSource
    newdataSource = new MatTableDataSource<Array<ChallanDistributionListing>>();

    dataColumns: string[] = ['srNo','refNumber', 'refDt', 'bank', 'noOfChallan', 'amount', 'saDA'];

    public errorMessages;

    @ViewChild(MatPaginator, { read: true }) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
    }
  
    @ViewChild(MatSort) set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }

    jsonArr: { key: string; value: number }[];
    bankList: any[];
    sadaList: any[];
    bankCtrl: FormControl = new FormControl();
    saDaCtrl: FormControl = new FormControl();

    filterData: { bankName: string; saDaName: string; distributeDt: string; };


    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private storageService: StorageService,
        private challandistributionservice: ChallanDistributionService,
        private datepipe: DatePipe
    ) { }
 
    ngOnInit() {

        this.errorMessages = EPOAMessage;
        this.filterData = { bankName: "", saDaName: "", distributeDt: ""};
        this.challanForm = this.clearFilter();
        this.pageSize = 1;
        this.doSearch(this.filterData);
        this.ChallanDistributionList();
        
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
        return this.challanForm = this.fb.group({
            bankName: [''],
            saDaName: [''],
            distributeDt: ['']
        });
    }


    resetListing(): void {
        this.clearFilter();
        this.doSearch(this.filterData);
        this.newdataSource.data = [];
        this.ChallanDistributionList();
    
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
        this.filterData.saDaName = data.saDaName;
        //data.distributeDt = this.convertDateTime(data.distributeDt);
        this.filterData.distributeDt = this.convertDateTime(data.distributeDt);
        //data.distributeDt = this.convertDateOnly(data.distributeDt);
        this.doSearch(this.filterData);

      }


      doSearch(value): void {
       
        this.challandistributionservice.searchChallanDistributionListing(value).subscribe(
          res => {
            if (res && res['result'] && res['status'] === 200) {
              this.initDataTable(res['result']);
              this.newdataSource.data = res['result'];
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




    getBankList() {
        const currentUser = this.storageService.get('currentUser');
        let data = currentUser['branchDetails'];
        data = data.map(itm => itm.branchId);
        this.challandistributionservice.getBankList({ branchId: data }).subscribe(
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
            this.challanForm.patchValue({
                bank: event.source['value']
            });
        }
    }

    onSelectSada(event: { source: { selected: any } }) {
        if (event.source.selected) {
            this.challanForm.patchValue({
                sadaName: event.source['value']
            });
        }
    }


    // get all list
    ChallanDistributionList(): void {
        this.challandistributionservice
            .getAllChallanDistribution({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    // resetListing(): void {
    //     this.newdataSource.data = [];
    //     this.ChallanDistributionList();
    //     // this.gftFileAccountingListOnSearch(this.currentDayData);
    // }


    //search call

    listingData(): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        const value = this.challanForm.value;
        for (const key in value) {
            if (value[key]) {
                const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
                this.jsonArr.push({
                    key,
                    value: moment.isMoment(feild)
                        ? this.convertDateOnly(feild)
                        : key === 'referenceNo'
                            ? feild
                            : parseFloat(feild) !== NaN
                                ? parseFloat(feild)
                                : feild
                });
            }
        }
        this.challanDistributionOnSearch(value);
    }

    challanDistributionOnSearch(value): void {

        value.bankName = value.bankName === null|| value.bankName ==='' ? '' : value.bankName;
        value.saDaName = value.saDaName === null|| value.saDaName ==='' ? '' : value.saDaName;
        value.distributeDt = value.distributeDt === null|| value.distributeDt ==='' ? '' : value.distributeDt;

        value.distributeDt = this.datepipe.transform(value.distributeDt, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        this.challandistributionservice.searchChallanDistributionListing(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource = res['result'];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }






    // On close to open ProceedDialogComponent
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
