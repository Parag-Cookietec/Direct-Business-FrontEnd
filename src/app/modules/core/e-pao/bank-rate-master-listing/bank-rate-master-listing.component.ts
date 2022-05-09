import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ListValue } from '../../../../models/e-pao/epaoModel';
import { BankRateMasterService } from '../services/bank-rate-master/bank-rate-master.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { DateLocaleAndFormat } from 'src/app/shared/constants/constants/common/common-data.constants';
import { EpaoCommonWorkflowService } from '../epao-common-workflow-service/epao-common-workflow.service';
import { CommonService } from 'src/app/modules/services/common.service';
import { DataConst } from 'src/app/shared/constants/common/common-data.constants';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
@Component({
  selector: 'app-bank-rate-master-listing',
  templateUrl: './bank-rate-master-listing.component.html',
  styleUrls: ['./bank-rate-master-listing.component.css']
})
export class BankRateMasterListingComponent implements OnInit {
  jsonArr = [];
  newSearch: boolean = false;
  maxDate = new Date();
  // Form Group
  bankRateMasterForm: FormGroup;
  //  Table Sourve
  newdataSource = new MatTableDataSource<any>();
  newdisplayedColumns: string[] = [
    'srNo',
    'refNo',
    'refDate',
    'effectivFromDate',
    'effectivToDate',
    'bankRate',
    'addRated',
    'penRated',
    'status',
    'newaction'
  ];
  newSearchParam: number = 0;
  pouId: number;
  menuId: number;
  pageSize = 0;
  pageIndex = 0;
  customPageIndex: number;
  iteratablePageIndex: number;
  pageElements: number;
  paginationArray;
  tokenFlag: boolean = false;
  sortBy: string = '';
  sortOrder: string = '';
  isSearch: number = 0;
  indexedItem: number;
  selectedStatusText: string;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private bankRateMasterService: BankRateMasterService,
    private toastr: ToastrService,
    private datepipe: DatePipe,
    private workflowService: EpaoCommonWorkflowService,
    private commonService: CommonService
  ) { }
  // error message
  public errorMessages;
  statusCtrl: FormControl = new FormControl();
  status_list: ListValue[] = [];
  //     { value: '1', viewValue: 'Created' },
  //     { value: '2', viewValue: 'Forwarded' },
  //     { value: '3', viewValue: 'Approved' }
  // ];

  ngOnInit(): void {
    this.bankRateMasterForm = this.bankRateMasterData();
    this.menuId = this.commonService.getLinkMenuId();
    //this.paginator._intl.itemsPerPageLabel = DataConst.RECORDS_PER_PAGE;
    this.paginationArray = DataConst.PAGINATION_ARRAY;
    this.indexedItem = 0;
    this.customPageIndex = 0;
    this.iteratablePageIndex = 0;
    this.pageElements = 250;
    this.pageSize = 25;
    this.pageIndex = 0;
    this.workflowService.getCurrentUserDetail().then((res: any) => {
      console.log(res, 'currentuserdetails')
      this.pouId = res.lkPOUId;
      if (this.pouId)
        this.listingDataV2();
    });

    this.getStatusList();
  }

  /**
   * @description To convert the date into 'yyyy-MM-dd' format
   * @param date date value
   */
  convertDateOnly(date) {
    if (date !== '' && date !== undefined && date !== null) {
      date = new Date(date);
      return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
    }
    return '';
  }

  /* getCurrentUser() {
     this.workflowService.getCurrentUserDetail().then((res: any) => {
       console.log(res, 'currentuserdetails')
       this.pouId = res.lkPOUId;
     });
     if (this.pouId)
       this.getListData()
   } */

  bankRateMasterData(): FormGroup {
    return this.fb.group({
      additionalRate: [''],
      effectiveFromDate: [''],
      bankRate: [''],
      panaltyRate: [''],
      referenceNumber: [''],
      referenceDate: [''],
      status: ['']
    });
  }

  listingData(): void {
    this.jsonArr = [
      {
        key: 'activeStatus',
        value: 1
      }
    ];
    const value = this.bankRateMasterForm.value;
    for (const key in value) {
      if (value[key]) {
        const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
        this.jsonArr.push({
          key,
          value:
            moment.isMoment(feild)
              ? this.convertDateOnly(feild)
              : key === "referenceNumber" ? feild : parseFloat(feild) !== NaN
                ? parseFloat(feild)
                : feild
        });
      }
    }
    this.getBankRateMasterList();
  }

  getStatusList(): void {
    const data = { name: 'GST_WF_Status_List' };
    this.bankRateMasterService.getStatusList(data)
      .subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            this.status_list = res['result'];
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
  }

  StatusChanged(event){
     this.selectedStatusText = event.source.selected.viewValue;
  }


  search() {
    this.newSearch = true;
    this.pageIndex = 0;
    this.customPageIndex = 0;
    //this.paginator.pageIndex = 0;
    this.iteratablePageIndex = 0;
    //this.isSearch = 1;


    this.listingDataV2()
  }

  listingDataV2(): void {
    if (
      this.newSearch && (
        this.bankRateMasterForm.value.referenceNumber ||
        this.bankRateMasterForm.value.referenceDate ||
        this.bankRateMasterForm.value.effectiveFromDate ||
        this.bankRateMasterForm.value.bankRate ||
        this.bankRateMasterForm.value.additionalRate ||
        this.bankRateMasterForm.value.panaltyRate ||
        this.bankRateMasterForm.value.status)
    ) {
      this.newSearchParam = 1;
    } else {
      this.newSearchParam = 0;
    }
    const datePipe = new DatePipe(DateLocaleAndFormat.Locale.EnUS);
    this.jsonArr = [
      {
        key: "pouId",
        value: this.pouId
      },
      {
        key: "menuId",
        value: this.menuId
      },
      {
        key: "refNo",
        value: this.bankRateMasterForm.value.referenceNumber || ""
      },
      {
        key: "refDate",
        value: datePipe.transform(this.bankRateMasterForm.value.referenceDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
      },
      {
        key: "effDate",
        value: datePipe.transform(this.bankRateMasterForm.value.effectiveFromDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
      },

      {
        key: "bankRateAmt",
        value: this.bankRateMasterForm.value.bankRate || 0.0
      },
      {
        key: "addRateAmt",
        value: this.bankRateMasterForm.value.additionalRate || 0.0
      },
      {
        key: "penRateAmt",
        value: this.bankRateMasterForm.value.panaltyRate || 0.0
      },
      {
        key: "status",
        value: this.bankRateMasterForm.value.status || ""
      },
      {
        key: "wfStatus",
        value: this.selectedStatusText || ""
      },
      {
        key: "isSearch",
        value: this.newSearchParam
      }
    ];
    this.getBankRateMasterListV2();
  }

  resetListing(): void {
    /*  this.jsonArr = [
         {
             key: 'activeStatus',
             value: 1
         }
     ];
     this.getBankRateMasterList(); */
    this.newSearch = false;
    this.bankRateMasterForm.reset();
    this.selectedStatusText ="";
    this.listingDataV2();
  }

  getBankRateMasterList(): void {
    this.bankRateMasterService
      .getBankRateMasterList({
        pageIndex: this.customPageIndex,
        pageElement: this.pageElements,
        sortByColumn: 'effectiveFromDate',
        sortOrder: 'desc',
        jsonArr: this.jsonArr
      })
      .subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            this.newdataSource.data = res['result']['result'];
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
  }

  getBankRateMasterListV2(): void {
    this.bankRateMasterService
      .getBankRateMasterListV2({
        pageIndex: 0,
        pageElement: 100,
        jsonArr: this.jsonArr
      })
      .subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            this.newdataSource.data = res['result']['result'];
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
  }

  /* getDDoFilterParams() {
      additionalRate: [''],
      effectiveFromDate: [''],
      bankRate: [''],
      panaltyRate: [''],
      referenceNumber: [''],
      referenceDate: [''],
      status: ['']
      if (
        this.newSearch && (
          this.bankRateMasterForm.value.referenceNumber ||
          this.bankRateMasterForm.value.referenceDate ||
          this.bankRateMasterForm.value.effectiveFromDate ||
          this.bankRateMasterForm.value.bankRate ||
          this.bankRateMasterForm.value.additionalRate ||
          this.bankRateMasterForm.value.panaltyRate ||
          this.bankRateMasterForm.value.status)
      ) {
        this.newSearchParam = 1;
      } else {
        this.newSearchParam = 0;
      }
  
      const datePipe = new DatePipe(DateLocaleAndFormat.Locale.EnUS);
  
      const returnArray = [
        {
          key: "pouId",
          value: this.pouId//2796
        },
        {
          key: "menuId",
          value: this.menuId
        },
        {
          key: "refNo",
          value: this.lcChequeCancelationListingForm.value.referenceNo || ""
        },
        {
          key: "refFromDate",
          value: datePipe.transform(this.lcChequeCancelationListingForm.value.referenceFromDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
        },
        {
          key: "refToDate",
          value: datePipe.transform(this.lcChequeCancelationListingForm.value.referenceToDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
        },
  
        {
          key: "chequeFromAmt",
          value: this.lcChequeCancelationListingForm.value.chequeFromAmt || 0
        },
        {
          key: "chequeToAmt",
          value: this.lcChequeCancelationListingForm.value.chequeToAmt || 0
        },
        {
          key: "recFromDate",
          value: datePipe.transform(this.lcChequeCancelationListingForm.value.receivedFromDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
        },
        {
          key: "recToDate",
          value: datePipe.transform(this.lcChequeCancelationListingForm.value.receivedToDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
        },
        {
          key: "sentFromDate",
          value: datePipe.transform(this.lcChequeCancelationListingForm.value.sentFromDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
        },
        {
          key: "sentToDate",
          value: datePipe.transform(this.lcChequeCancelationListingForm.value.sentToDate, DateLocaleAndFormat.Format.MMddyyyy) || ''
        },
        {
          key: "lyingWith",
          value: this.lcChequeCancelationListingForm.value.lyingWith || ""
        },
        {
          key: "status",
          value: this.lcChequeCancelationListingForm.value.status || ""
        },
        {
          key: "wfStatus",
          value: this.lcChequeCancelationListingForm.value.workflowStatus || ""
        },
        {
          key: "isSearch",
          value: this.newSearchParam
        }
      ]
  
      const referenceFromDate = this.lcChequeCancelationListingForm.value.referenceFromDate;
      const referenceToDate = this.lcChequeCancelationListingForm.value.referenceToDate;
      const receiveFromDate = this.lcChequeCancelationListingForm.value.receivedFromDate;
      const receiveToDate = this.lcChequeCancelationListingForm.value.receivedToDate;
      const sentFromDate = this.lcChequeCancelationListingForm.value.sentFromDate;
      const sentToDate = this.lcChequeCancelationListingForm.value.sentToDate;
      const lcChequeFromAmount:number = this.lcChequeCancelationListingForm.controls['chequeFromAmt'].value
      const lcChequeToAmount:number =  this.lcChequeCancelationListingForm.controls['chequeToAmt'].value
  
  
      if (receiveFromDate || receiveToDate || referenceFromDate || referenceToDate || sentFromDate || sentToDate || lcChequeFromAmount || lcChequeToAmount) {
        if (receiveFromDate || receiveToDate) {
          if (!receiveFromDate) {
            this.toastr.error(MESSAGES.RECEIVE_FROM_DATE);
            return false;
          } else if (!receiveToDate) {
            this.toastr.error(MESSAGES.RECEIVE_TO_DATE);
            return false;
          }
        }
  
        else if (referenceFromDate || referenceToDate) {
          if (!referenceFromDate) {
            this.toastr.error(MESSAGES.REFERENCE_FROM_DATE);
            return false;
          } else if (!referenceToDate) {
            this.toastr.error(MESSAGES.REFERENCE_TO_DATE);
            return false;
          }
        }
  
  
        else if (lcChequeFromAmount || lcChequeToAmount) {
          if (!lcChequeFromAmount) {
              this.toastr.error(MESSAGES.CHEQUE_FROM_AMOUNT);
              return false;
          } else if (!lcChequeToAmount) {
              this.toastr.error(MESSAGES.CHEQUE_TO_AMOUNT);
              return false;
          }
      }
  
        else if (sentFromDate || sentToDate) {
          if (!sentFromDate) {
            this.toastr.error(MESSAGES.SENT_FROM_DATE);
            return false;
          } else if (!sentToDate) {
            this.toastr.error(MESSAGES.SENT_TO_DATE);
            return false;
          }
        }
  
  
      }
  
      if (lcChequeFromAmount && lcChequeToAmount) {
        if ((Number(lcChequeFromAmount)) > (Number(lcChequeToAmount))) {
            this.toastr.error(MESSAGES.CHEQUE_FROM_AMOUNT_VALIDATION);
            return false;
        } else { 
            return returnArray;
        }
    }
  
      return returnArray
    } */

  // go to Bank Master
  goToBankRateMaster(element): void {
    //this.router.navigate(['/dashboard/e-pao/bank-rate-master'], { skipLocationChange: true });
    this.router.navigate(
      ['/dashboard/e-pao/bank-rate-master', { mode: 'edit', id: element.id, trnStatus: element.trnStatus }],
      { relativeTo: this.activatedRoute, skipLocationChange: true }
    );
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
