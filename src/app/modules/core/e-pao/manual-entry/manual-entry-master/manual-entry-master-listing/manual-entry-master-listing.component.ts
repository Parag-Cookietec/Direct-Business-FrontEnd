import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ListValue, ManualEntryListing } from 'src/app/models/e-pao/epaoModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CommonListing } from 'src/app/models/common-listing';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManualAccountingService } from '../../../services/Manual-Accounting/manual-accounting.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/edp/edp-msg.constants';
import { CommonWorkflowService } from 'src/app/modules/core/common/workflow-service/common-workflow.service';


@Component({
  selector: 'app-manual-entry-master-listing',
  templateUrl: './manual-entry-master-listing.component.html',
  styleUrls: ['./manual-entry-master-listing.component.css']
})
export class ManualEntryMasterListingComponent implements OnInit {

  ELEMENT_DATA: ManualEntryListing[] = [];

  maxDate = new Date();
  // FormGroup
  entryMasterForm: FormGroup;
  selection = new SelectionModel<any>(true, []);
  typeCtrl: FormControl = new FormControl();
  statusCtrl: FormControl = new FormControl();
  // Table Source
  displayedColumns = ['referenceNo', 'cinNo', 'totalEntryAmt', 'manualEntryDt', 'valueDt', 'typeId', 'status', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  type_list: ListValue[] = [];
 
  statusList: CommonListing[] = [
    {
      value: '1', viewValue: 'Draft'
    },
    { value: '2', viewValue: 'Verified' },
    { value: '3', viewValue: 'Approved' },
  ];

  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  newSearch: boolean = false;
  newSearchParam: number = 0;
  pouId: number;
  menuId: number;


  constructor(private router: Router, private fb: FormBuilder, public dialog: MatDialog
    , private toastr: ToastrService, private commonWorkflowService: CommonWorkflowService, private manualaccountingservice: ManualAccountingService, private datePipe: DatePipe) { }
  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.entryMasterForm = this.fb.group({
      code: [''],
      lapse: ['1'],
      majorHead: [''],
      subMajorHead: [''],
      minorHead: [''],
      subHead: [''],
      refNo: [''],
      date: [''],
      cinNo: [''],
      type: [''],
      status: ['']
    });
    this.commonWorkflowService.getCurrentUserDetail().then((res: any) => {
      console.log(res, 'currentuserdetails')
      this.pouId = res.lkPOUId;
      this.menuId = res.linkMenuId;
      if (this.pouId)
          this.fetchListingDetailsV2();
    });
    this.fetchTypeLists();
  }

  resetListing(): void {
    this.newSearch=false;
    this.entryMasterForm.reset();
    this.dataSource.data = [];
    //this.getBlockCpinList();
    this.fetchListingDetailsV2();
  }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchListingDetails(this.pageIndex)
  }

  delete(index) {
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  search() {
    this.newSearch = true;
    this.fetchListingDetailsV2();
 }

  fetchListingDetails(offset = null) {
    let jsonObj =[];
    if(this.entryMasterForm.value.cinNo){
      jsonObj.push({
        "key": "cinNo",
        "value": this.entryMasterForm.value.cinNo ? this.entryMasterForm.value.cinNo : null
      });
    }
    
    if(this.entryMasterForm.value.type){
      jsonObj.push({
        "key": "typeId",
        "value": this.entryMasterForm.value.type ? this.entryMasterForm.value.type : ""
      });
    }
    
    if(this.entryMasterForm.value.refNo){
      jsonObj.push({
        "key": "referenceNo",
        "value": this.entryMasterForm.value.refNo ? this.entryMasterForm.value.refNo : null
      });
    }
    if(this.entryMasterForm.value.date){
      jsonObj.push({
        "key": "manualEntryDt",
        "value": this.entryMasterForm.value.date ? this.datePipe.transform(this.entryMasterForm.value.date, 'yyyy-MM-dd').toString() : null
      });
    }
    if(this.entryMasterForm.value.status){
      jsonObj.push({
        "key": "entryStatusId",
        "value": this.entryMasterForm.value.status ? parseInt(this.entryMasterForm.value.status) : null
      });
    }
    var obj = {
      "pageIndex": offset ? offset : this.pageIndex,
      "jsonArr": jsonObj
      // [{
      //   "key": "cinNo",
      //   "value": this.entryMasterForm.value.cinNo ? this.entryMasterForm.value.cinNo : null
      // }
      // , {
      //   "key": "typeId",
      //   "value": this.entryMasterForm.value.type ? this.entryMasterForm.value.type : null
      // }
      // , {
      //   "key": "referenceNo",
      //   "value": this.entryMasterForm.value.refNo ? this.entryMasterForm.value.refNo : null
      // }, {
      //   "key": "manualEntryDt",
      //   "value": this.entryMasterForm.value.date ? this.datePipe.transform(this.entryMasterForm.value.date, 'yyyy-MM-dd').toString() : null
      // }, {
      //   "key": "entryStatusId",
      //   "value": this.entryMasterForm.value.status ? parseInt(this.entryMasterForm.value.status) : null
      // }]
    }

    this.manualaccountingservice.fetchListingDetails(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.ELEMENT_DATA = res['result'].result;
          this.totalRecords = res['result'].totalElement;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  fetchListingDetailsV2(offset = null) {
    if (
      this.newSearch && (
        this.entryMasterForm.value.cinNo ||
        this.entryMasterForm.value.type ||
        this.entryMasterForm.value.refNo ||
        this.entryMasterForm.value.date ||
        this.entryMasterForm.value.status)
    ) {
      this.newSearchParam = 1;
    } else {
      this.newSearchParam = 0;
    }
  
    let jsonObj =[];
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
    if(this.entryMasterForm.value.cinNo){
      jsonObj.push({
        "key": "cinNo",
        "value": this.entryMasterForm.value.cinNo ? this.entryMasterForm.value.cinNo : ""
      });
    }
    if(this.entryMasterForm.value.type){
      jsonObj.push({
        "key": "typeId",
        "value": this.entryMasterForm.value.type ? this.entryMasterForm.value.type : ""
      });
    }
    if(this.entryMasterForm.value.refNo){
      jsonObj.push({
        "key": "referenceNo",
        "value": this.entryMasterForm.value.refNo ? this.entryMasterForm.value.refNo : ""
      });
    }
    if(this.entryMasterForm.value.date){
      jsonObj.push({
        "key": "manualEntryDt",
        "value": this.entryMasterForm.value.date ? this.datePipe.transform(this.entryMasterForm.value.date, 'MM/dd/yyyy').toString() : ""
      });
    }
    if(this.entryMasterForm.value.status){
      jsonObj.push({
        "key": "status",
        "value": this.entryMasterForm.value.status ? parseInt(this.entryMasterForm.value.status) : ""
      });
    }
    var obj = {
      "pageIndex": offset ? offset : this.pageIndex,
      "pageElement": this.pageSize,
      "jsonArr": jsonObj
      // [{
      //   "key": "cinNo",
      //   "value": this.entryMasterForm.value.cinNo ? this.entryMasterForm.value.cinNo : null
      // }
      // , {
      //   "key": "typeId",
      //   "value": this.entryMasterForm.value.type ? this.entryMasterForm.value.type : null
      // }
      // , {
      //   "key": "referenceNo",
      //   "value": this.entryMasterForm.value.refNo ? this.entryMasterForm.value.refNo : null
      // }, {
      //   "key": "manualEntryDt",
      //   "value": this.entryMasterForm.value.date ? this.datePipe.transform(this.entryMasterForm.value.date, 'yyyy-MM-dd').toString() : null
      // }, {
      //   "key": "entryStatusId",
      //   "value": this.entryMasterForm.value.status ? parseInt(this.entryMasterForm.value.status) : null
      // }]
    }

    this.manualaccountingservice.fetchListingDetailsV2(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.ELEMENT_DATA = res['result'].result;
          this.totalRecords = res['result'].totalElement;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  

  fetchTypeLists() {
    //value.branchId = this.getBranchId();
    this.manualaccountingservice.fetchTypeLists().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.type_list = res['result'];
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  onEdit(id)
  {
    this.router.navigate(['./dashboard/e-pao/manual-entry/manual-entry-master'], id);
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
        this.manualaccountingservice.DeleteManualEntry(obj).subscribe(
          res => {
            if (res && res['status'] === 200) {
              this.toastr.success(res['message']);
              this.fetchListingDetails();
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
