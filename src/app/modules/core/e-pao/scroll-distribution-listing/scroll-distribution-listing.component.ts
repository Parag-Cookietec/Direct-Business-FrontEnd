import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ListValue, ScrollDisListing } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScrollDistributionService } from '../services/scroll-distribution/scroll-distribution.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-scroll-distribution-listing',
    templateUrl: './scroll-distribution-listing.component.html',
    styleUrls: ['./scroll-distribution-listing.component.css']
})
export class ScrollDistributionListingComponent implements OnInit {


    private paginator: MatPaginator;
    private sort: MatSort;
  
    pageSize = 1;
    showFirstLastButtons;
    pageSizeOptions = [1, 5, 10, 20, 50, 100];
    totalPages: number = 0;
    pageIndex: number = 0;

    maxDate = new Date();
    todayDate = new Date();
    // FormGroup
    scrollForm: FormGroup;
    // FormControl
    branchCtrl: FormControl = new FormControl();
    statusCtrl: FormControl = new FormControl();
    // MatTableDataSource
    newdataSource = new MatTableDataSource<any>();
   
    // ELEMENT_DATA: ScrollDisListing[] = [
    //     {
    //         refNo: '9846546466943',
    //         refDate: '22-FEB-2020',
    //         scrollName: 'ENV87484165118421',
    //         noOfChallan: '50',
    //         amount: '10000.00',
    //         branch: 'Receipt Branch 1',
    //         status: 'Distributed'
    //     },
    //     {
    //         refNo: '9846943',
    //         refDate: '12-FEB-2020',
    //         scrollName: 'ENV84165118421',
    //         noOfChallan: '50',
    //         amount: '20000.00',
    //         branch: 'Receipt Branch 2',
    //         status: 'Distributed'
    //     },
    //     {
    //         refDate: '22-AUG-2020',
    //         refNo: '49864165132123',
    //         scrollName: 'ENV484165118421',
    //         noOfChallan: '50',
    //         amount: '30000.00',
    //         branch: 'Receipt Branch 3',
    //         status: 'Distributed'
    //     }
    // ];
    
    dataColumns: string[] = [
        'srNo',
        'refNo',
        'refDate',
        'scrollName',
        'noOfChallan',
        'amount',
        'branch',
        'status'
    ];

    public errorMessages;

    @ViewChild(MatPaginator, { read: true }) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
    }
  
    @ViewChild(MatSort) set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
  
    branchList: any[];
    jsonArr: { key: string; value: number }[];
  
    filterData: { srNo: string; scrollNo: string; branchName: string; fromDate: string; toDate: string; distributeStatus: string  };

    status_list: ListValue[] = [
        {
            value: 'Distributed',
            viewValue: 'Distributed'
        },
        {
            value: 'Received',
            viewValue: 'Received'
        }
    ];


    constructor(
        private router: Router,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private scrollDistributionService: ScrollDistributionService,
        private fb: FormBuilder
    ) { }

    directiveObject = new EPaoDirectives(this.router, this.dialog);
    // error Messages
   

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.filterData = { srNo: "", scrollNo: "", branchName: "", fromDate: "", toDate: "", distributeStatus: ""};
        this.scrollForm = this.clearFilter();
        this.pageSize = 1;
        this.doSearch(this.filterData);
        this.getBranchList();
        // this.getScrollDistributionList();
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
            scrollNo: [''],
            branchName: [''],
            fromDate: [''],
            toDate: [''],
            distributeStatus: ['']
        });
    }


    resetListing(): void {
        this.clearFilter();
        this.doSearch(this.filterData);
        this.scrollForm.reset();
        this.newdataSource.data = [];
       // this.getScrollDistributionList();
    
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

        this.filterData.scrollNo = data.scrollNo;
        this.filterData.branchName = data.branchName;
        this.filterData.fromDate = data.fromDate;
        this.filterData.toDate = data.toDate;
        this.filterData.distributeStatus = data.distributeStatus;
        // value.fromDate = this.convertDateOnly(value.fromDate);
        // value.toDate = this.convertDateOnly(value.toDate);

        this.doSearch(this.filterData);
    
      }

      doSearch(value): void {
       
        
        this.scrollDistributionService.searchScrollDistribution(value).subscribe(
          res => {
            if (res && res['result'] && res['status'] === 200) {
              this.initDataTable(res['result']);
              this.newdataSource.data = res['result']['result'];
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



    
    getBranchList() {
        this.scrollDistributionService
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

    onSelect(event: { source: { selected: any } }, bl: any) {
        if (event.source.selected) {
            this.scrollForm.patchValue({
                branchName: event.source['value']
            });
        }
    }

    // listingData(data: any): void {
    //     this.jsonArr = [
    //         {
    //             key: 'activeStatus',
    //             value: 1
    //         }
    //     ];
    //     const value = data;
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
    //     this.getSDListOnSearch(value);
    // }

    getSDListOnSearch(value): void {
        value.fromDate = this.convertDateOnly(value.fromDate);
        value.toDate = this.convertDateOnly(value.toDate);
        this.scrollDistributionService.searchScrollDistribution(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = res['result'];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    // getScrollDistributionList() {
    //     this.scrollDistributionService
    //         .getAllScrollDistribution({
    //             pageIndex: 0,
    //             pageElement: 10,
    //             sortByColumn: '',
    //             sortOrder: '',
    //             jsonArr: []
    //         })
    //         .subscribe(
    //             res => {
    //                 if (res && res['result'] && res['status'] === 200) {
    //                     console.log(res);
    //                     this.newdataSource.data = res['result']['result'];
    //                 }
    //             },
    //             err => {
    //                 this.toastr.error(err);
    //             }
    //         );
    // }

    openView(id): void {
        const dialogRef = this.dialog.open(ScrollDistributionListingDialogeComponent, {
            width: '1200px',
            data: {
                id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}


// view  dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'scroll-distribution-listing-dialoge',
    templateUrl: 'scroll-distribution-listing-dialoge.html'
})
export class ScrollDistributionListingDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private datepipe: DatePipe,
        private scrollDistributionService: ScrollDistributionService,
        public dialogRef: MatDialogRef<ScrollDistributionListingDialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);

    newdataSource = new MatTableDataSource<any>();
    displayedColumns: string[] = [
        'srNo',
        'referenceNo',
        'referenceDt',
        'scrollNo',
        'noOfChallan',
        'amount',
        'branch',
        'distributeStatus'
    ];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.scrollDistributionService.getScrollDistributionById({ id: this.data.id }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = [res['result']];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
}
