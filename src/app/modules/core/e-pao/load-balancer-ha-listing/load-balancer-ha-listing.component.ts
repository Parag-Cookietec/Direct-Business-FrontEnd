import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ListValue, LoadBalancerAOListing } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LoadBalancerService } from '../services/load-balancer/load-balancer.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import * as moment from 'moment';
import { ChallanDistributionService } from '../services/challan-distribution/challan-distribution.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';


@Component({
    selector: 'app-load-balancer-ha-listing',
    templateUrl: './load-balancer-ha-listing.component.html',
    styleUrls: ['./load-balancer-ha-listing.component.css']
})
export class LoadBalancerHaListingComponent implements OnInit {
    // FormGroup
    scrollForm: FormGroup;

    private paginator: MatPaginator;
    private sort: MatSort;
  
    pageSize =1;
    showFirstLastButtons;
    pageSizeOptions = [1, 5, 10, 20, 50, 100];
    totalPages: number = 0;
    pageIndex: number = 0;

    // date
    maxDate = new Date();
    todayDate = new Date();

    // table source
    newdataSource = new MatTableDataSource<any>();

    directiveObject = new EPaoDirectives(this.router, this.dialog);
  
    dataColumns: string[] = ['srNo', 'bankName', 'fromSaDA', 'totalChallan', 'totalAmount', 'toSaDA', 'noOfChallan', 'amount'
    ];

    public errorMessages;
    selection = new SelectionModel<any>(true, []);

        // FormControl
        bankNameCtrl: FormControl = new FormControl();
        branchCtrl: FormControl = new FormControl();
        branch2Ctrl: FormControl = new FormControl();
        bankCtrl: FormControl = new FormControl();
        saDaCtrl: FormControl = new FormControl();
        fromSaDaCtrl: FormControl = new FormControl();
        toSaDaCtrl: FormControl = new FormControl();
        bankList: any[];
        sadaList: any[];
        jsonArr: { key: string; value: number }[];

    @ViewChild(MatPaginator, { read: true }) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
    }
    
      @ViewChild(MatSort) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
      }

      
      filterData: { srNo: string; bankName: string; fromSaDaName: string; totalChallans: string; totalAmount: string; 
        toSaDaName: string; totalChallansTrnf: string; totalAmountTrnf: string};

    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder,
        private loadBalancerService: LoadBalancerService, private datepipe: DatePipe,
        private challandistributionservice: ChallanDistributionService,
        private toastr: ToastrService, private storageService: StorageService,) { }

   


    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.filterData = {srNo: "", bankName: "", fromSaDaName: "", totalChallans: "", totalAmount: "", toSaDaName: "", totalChallansTrnf: "", 
        totalAmountTrnf: ""};
        this.scrollForm = this.clearFilter();
        this.pageSize = 1;
        this.doSearch(this.filterData);
        this.getBankList();
        //this.getLoadBalancerHaList();
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
            totalAmountTrnf: ['']

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
        this.filterData.fromSaDaName = data.fromSaDaName;
        this.filterData.totalChallans = data.totalChallans;
        this.filterData.totalAmount = data.totalAmount;
        this.filterData.toSaDaName = data.toSaDA;
        this.filterData.totalChallansTrnf = data.totalChallansTrnf;
        this.filterData.totalAmountTrnf = data.totalAmountTrnf;
        this.doSearch(this.filterData);
    
      }

      doSearch(value): void {
       // value.branchId = this.getBranchId();

       this.loadBalancerService.getLoadBalHAListSearch(value).subscribe(
        res => {
            if (res && res['result'] && res['status'] === 200) {
                this.initDataTable(res['result']);
                //this.newdataSource = res['result'];
                this.newdataSource = res['result']['result'];
                //this.newdataSource.data = res['result'];
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
                bankName: event.source['value'],

            });
        }
    }





    onSelectSada(event: { source: { selected: any } }, i) {
        console.log(i);
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



    



    // getLoadBalancerHaList() {
    //     this.loadBalancerService
    //         .getLoadBalHAList({
    //             pageIndex: 0,
    //             pageElement: 100,
    //             sortByColumn: '',
    //             sortOrder: '',
    //             jsonArr: []
    //         })
    //         .subscribe(
    //             res => {
    //                 if (res && res['result'] && res['status'] === 200) {
    //                     this.newdataSource.data = res['result']['result'];
    //                     console.log("----", this.newdataSource)
    //                 }
    //             },
    //             err => {
    //                 this.toastr.error(err);
    //             }
    //         );
    // }


    // listingData(): void {
    //     this.jsonArr = [
    //         {
    //             key: 'activeStatus',
    //             value: 1
    //         }
    //     ];
    //     const value = this.scrollForm.value;
    //     for (const key in value) {
    //         if (value[key]) {
    //             const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
    //             this.jsonArr.push({
    //                 key,
    //                 value: moment.isMoment(feild)
    //                     ? this.convertDateOnly(feild)
    //                     : key === 'fileName'
    //                         ? feild
    //                         : parseFloat(feild) !== NaN
    //                             ? parseFloat(feild)
    //                             : feild
    //             });
    //         }
    //     }
    //     this.getDataOnSearch(value);
    // }

    // getDataOnSearch(value) {
    //     //value.branchId = this.getBranchId();
    //     this.loadBalancerService.getLoadBalHAListSearch(value).subscribe(
    //         res => {
    //             if (res && res['result'] && res['status'] === 200) {
    //                 this.newdataSource.data = res['result'];
    //             }
    //         },
    //         err => {
    //             this.toastr.error(err);
    //         }
    //     );
    // }

    reset() {
        this.scrollForm.reset();
       // this.scrollData();
        this.directiveObject.selection.clear();
        this.newdataSource.data = [];
        //this.getLoadBalancerHaList();
        
    }
        // onSelectFromSaDa(event: { source: { selected: any } }) {
    //   if (event.source.selected) {
    //       this.scrollForm.patchValue({
    //         fromSaDaName: event.source['value'],

    //       });
    //   }
    // }

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
