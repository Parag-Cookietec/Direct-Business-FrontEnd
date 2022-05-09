import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ListValue, PenaltyAmount } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PenalInterestCollectionService } from '../../services/Penal-Interest-Collection/penal-interest-collection.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/edp/edp-msg.constants';
import { CommonWorkflowService } from '../../../common/workflow-service/common-workflow.service';

@Component({
  selector: 'app-penalty-amount-receive-listing',
  templateUrl: './penalty-amount-receive-listing.component.html',
  styleUrls: ['./penalty-amount-receive-listing.component.css']
})
export class PenaltyAmountReceiveListingComponent implements OnInit {

  ELEMENT_DATA: PenaltyAmount[] = [];
  modeOfReciept = "Mode Of Receipt";
  // Date
  todayDate = Date.now();
  initiatiomdate = new Date();
  maxDate = new Date();
  // Error Message
  errorMessages = EPOAMessage;
  // vaiable
  isSubmitted = false;
  // Form Group
  penaltyAmountListForm: FormGroup;

  // FormControl
  bankTypeCtrl: FormControl = new FormControl();
  morecivedCtrl: FormControl = new FormControl();
  // List
  bankType_list: ListValue[] = [];
  //   { value: '1', viewValue: 'Bank Of Baroda, Baroda' },
  //   { value: '2', viewValue: 'HDFC Bank' },

  // ];


  mor_list: ListValue[] = [];

  // Table Source
  displayedColumns = ['checkBox', 'referenceNo', 'referenceDt', 'bankName', 'receiptModeId', 'interestAmount', 'entryStatus', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  newSearch: boolean = false;
  newSearchParam: number = 0;
  pouId: number;
  menuId: number;
  constructor(private router: Router, private fb: FormBuilder,
    public dialog: MatDialog
    , private commonWorkflowService: CommonWorkflowService
    , private penalService: PenalInterestCollectionService
    , private toastr: ToastrService, private datePipe: DatePipe) { }
  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.penaltyAmountListForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      bankType: [''],
      morecieved: ['']
    });
    this.commonWorkflowService.getCurrentUserDetail().then((res: any) => {
      console.log(res, 'currentuserdetails')
      this.pouId = res.lkPOUId;
      this.menuId = res.linkMenuId;
      if (this.pouId)
          this.GetPenalListingV2();
    });
    this.getBank();
    this.getLookupValues(this.modeOfReciept);
  }

  onSave() {
    if (this.penaltyAmountListForm.valid) {
      this.isSubmitted = false;
    } else {
      this.isSubmitted = true;
    }
  }

  clearForm() {
    this.penaltyAmountListForm.reset();
    this.newSearch=false;
    this.dataSource.data = [];
    this.GetPenalListingV2();
  }

  GetBankWiseInterest() {
    let obj = {
      "fromDate": this.penaltyAmountListForm.value.fromDate,
      "toDate": this.penaltyAmountListForm.value.toDate,
      "bankId": this.penaltyAmountListForm.value.bankType,
      "modeOfReceiptId": this.penaltyAmountListForm.value.morecieved,
      "modeOfReceiptName": null
    }

    this.penalService.GetBankWiseInterest(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.ELEMENT_DATA = res['result'];
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  getBank() {
    //value.branchId = this.getBranchId();
    this.penalService.GetBankList().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.bankType_list = res['result']['bankNames'];
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  getLookupValues(name) {
    let obj = {
      "name": this.modeOfReciept
    };

    this.penalService.GetLookupValues(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.mor_list = res['result'];
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  onEdit(id) {
    this.router.navigate(['./dashboard/e-pao/penalty-amount-receive'], id);
  }

  GetPenalListing() {
    let jsonObj = [];
    if (this.penaltyAmountListForm.value.bankType) {
      jsonObj.push({
        "key": "bankId",
        "value": this.penaltyAmountListForm.value.bankType
      });
    }
    if (this.penaltyAmountListForm.value.fromDate) {
      jsonObj.push({
        "key": "fromDate",
        "value": this.penaltyAmountListForm.value.fromDate ? this.datePipe.transform(this.penaltyAmountListForm.value.fromDate, 'yyyy-MM-dd').toString() : null
      });
    }
    if (this.penaltyAmountListForm.value.toDate) {
      jsonObj.push({
        "key": "toDate",
        "value": this.penaltyAmountListForm.value.toDate ? this.datePipe.transform(this.penaltyAmountListForm.value.toDate, 'yyyy-MM-dd').toString() : null
      });
    }
    if (this.penaltyAmountListForm.value.morecieved) {
      jsonObj.push({
        "key": "receiptModeId",
        "value": this.penaltyAmountListForm.value.morecieved
      });
    }
    let obj = {
      "pageIndex": 0,
      "jsonArr": jsonObj
      // [{"key":"bankId",
      //   "value":this.penaltyAmountListForm.value.bankType
      // },{"key":"fromDate",
      //   "value": this.penaltyAmountListForm.value.fromDate ? this.datePipe.transform(this.penaltyAmountListForm.value.fromDate, 'yyyy-MM-dd').toString() : null
      // },{"key":"toDate",
      //   "value":this.penaltyAmountListForm.value.toDate ? this.datePipe.transform(this.penaltyAmountListForm.value.toDate, 'yyyy-MM-dd').toString() : null
      // },{"key":"receiptModeId",
      //   "value":this.penaltyAmountListForm.value.morecieved
      // }]
    }
    this.penalService.GetListing(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.ELEMENT_DATA = res['result']['result'];
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  search() {
    this.newSearch = true;
    this.GetPenalListingV2();
  }

  GetPenalListingV2() {
    if (
      this.newSearch && (
        this.penaltyAmountListForm.value.bankType ||
        this.penaltyAmountListForm.value.fromDate ||
        this.penaltyAmountListForm.value.toDate ||
        this.penaltyAmountListForm.value.morecieved)
    ) {
      this.newSearchParam = 1;
    } else {
      this.newSearchParam = 0;
    }
    let jsonObj = [];
    jsonObj.push({
      "key": "pouId",
      "value": this.pouId.toString()
    });
    jsonObj.push({
      "key": "menuId",
      "value": this.menuId.toString()
    });
    jsonObj.push({
      "key": "wfStatus",
      "value": ""
    });
    jsonObj.push({
      "key": "isSearch",
      "value": this.newSearchParam.toString()
    });
    if (this.penaltyAmountListForm.value.bankType) {
      jsonObj.push({
        "key": "bankId",
        "value": this.penaltyAmountListForm.value.bankType
      });
    }
    if (this.penaltyAmountListForm.value.fromDate) {
      jsonObj.push({
        "key": "fromDate",
        "value": this.penaltyAmountListForm.value.fromDate ? this.datePipe.transform(this.penaltyAmountListForm.value.fromDate, 'MM/dd/yyyy').toString() : null
      });
    }
    if (this.penaltyAmountListForm.value.toDate) {
      jsonObj.push({
        "key": "toDate",
        "value": this.penaltyAmountListForm.value.toDate ? this.datePipe.transform(this.penaltyAmountListForm.value.toDate, 'MM/dd/yyyy').toString() : null
      });
    }
    if (this.penaltyAmountListForm.value.morecieved) {
      jsonObj.push({
        "key": "receiptModeId",
        "value": this.penaltyAmountListForm.value.morecieved
      });
    }
    let obj = {
      "pageIndex": 0,
      "pageElement": 250,
      "jsonArr": jsonObj
    }
    this.penalService.GetListingV2(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.ELEMENT_DATA = res['result']['result'];
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }


  onDelete(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '360px',
      data: msgConst.CONFIRMATION_DIALOG.DELETE
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        let obj = {
          "id": id
        }
        this.penalService.DeletePenalEntry(obj).subscribe(
          res => {
            if (res && res['status'] === 200) {
              this.toastr.success(res['message']);
              this.GetPenalListing();
            }
          },
          err => {
            this.toastr.error(err);
          }
        );
      }
    });
  }
}
