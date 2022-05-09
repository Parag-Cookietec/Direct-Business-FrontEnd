import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { Router } from '@angular/router';
import { ListValue } from 'src/app/models/common-grant';
import { CreditDebit, ManualEntry, ManualEntryCredit, SubmitManualEntry } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ManualAccountingService } from '../../services/Manual-Accounting/manual-accounting.service';
import { DatePipe } from '@angular/common';
import { RopWfComponent } from '../../../pvu/rop/rop-wf/rop-wf.component';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';

import { CommonWorkflowService } from '../../../common/workflow-service/common-workflow.service';
import { ModuleNames } from '../../epao-common-workflow-constant/epao-common-workflow.constants';
import { EPAOCommonWorkflowComponent } from '../../epao-common-workflow/epao-common-workflow.component';

@Component({
  selector: 'app-manual-entry-master',
  templateUrl: './manual-entry-master.component.html',
  styleUrls: ['./manual-entry-master.component.css']
})
export class ManualEntryMasterComponent implements OnInit {
  currentobj;
  todayDate = Date.now();
  initiatiomdate = new Date((new Date()));
  maxDate = new Date();
  // errorMessages
  errorMessages = EPOAMessage;
  isSubmitted = false;
  // FormGroup
  entryMasterForm: FormGroup;
  // FormControl
  creditTableName = 'dataSourceCredit';
  debitTableName = 'dataSourceDebit';

  directiveObj = new CommonDirective();
  creditTotal = 0;
  debitTotal = 0;
  typeCtrl: FormControl = new FormControl();
  mHeadCtrl: FormControl = new FormControl();
  subMajorHeadCtrl: FormControl = new FormControl();
  minorHeadCtrl: FormControl = new FormControl();
  subHeadCtrl: FormControl = new FormControl();
  objeHeadCtrl: FormControl = new FormControl();

  mHeadCreditCtrl: FormControl = new FormControl();
  subMajorHeadCreditCtrl: FormControl = new FormControl();
  minorHeadCreditCtrl: FormControl = new FormControl();
  subHeadCreditCtrl: FormControl = new FormControl();
  objeHeadCreditCtrl: FormControl = new FormControl();
  // List
  type_list: ListValue[] = [];
  TypeName: string;

  majorHead_list: ListValue[] = [];
  majorHead_list_credit: ListValue[] = [];
  sub_major: ListValue[] = [];
  sub_major_credit: ListValue[] = [];

  minor_head: ListValue[] = [];
  minor_head_credit: ListValue[] = [];

  sub_head: ListValue[] = [];
  sub_head_credit: ListValue[] = [];

  details_head: ListValue[] = [];
  details_head_credit: ListValue[] = [];

  object_head: ListValue[] = [];
  object_head_credit: ListValue[] = [];

  Element_Data_1: ManualEntryCredit[] = [
    { majorHeadCredit: '', majorHeadCredit_source: [], subMajorHeadCredit: '', subMajorHeadCredit_source: [], minorHeadCredit: '', minorHeadCredit_source: [], subHeadCredit: '', subHeadCredit_source: [], detailsHeadCredit: '', detailsHeadCredit_source: [], objectHeadCredit: '', objectHeadCredit_source: [], amtCred: 0 }
  ];
  Element_Data_2: ManualEntry[] = [
    { majorHead: '', majorHead_source: [], subMajorHead: '', subMajorHead_source: [], minorHead: '', minorHead_source: [], subHead: '', subHead_source: [], detailsHead: '', detailsHead_source: [], objectHead: '', objectHead_source: [], amt: 0 }
  ];
  dataSourceCredit = new MatTableDataSource<any>(this.Element_Data_1);
  dataSourceDebit = new MatTableDataSource<any>(this.Element_Data_2);
  creditColumns: string[] = ['srno', 'majorHeadCredit', 'subMajorHeadCredit', 'minorHeadCredit', 'subHeadCredit', 'detailsHeadCredit', 'objectHeadCredit', 'amtCred', 'action'];
  debitColumns: string[] = ['srno', 'majorHead', 'subMajorHead', 'minorHead', 'subHead', 'detailsHead', 'objectHead', 'amt', 'action'];
  id;
  wfRoleIds: any;
  wfRoleCode: any;
  linkMenuId: any;
  postId: any;
  userId: any;
  lkPoOffUserId: any;
  officeId: any;
  saveResult: any;

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog,
    private toastr: ToastrService, private commonWorkflowService: CommonWorkflowService, private manualaccountingservice: ManualAccountingService, private datePipe: DatePipe) {
    const navigation = this.router.getCurrentNavigation();
    this.id = navigation.extras;

  }

  directiveObject = new EPaoDirectives(this.router, this.dialog);


  ngOnInit() {
    this.entryMasterForm = this.fb.group({
      date: [''],
      cinNo: [''],
      type: [''],
      typeId: [''],

      mHead: [''],
      subMajorHead: [''],
      detailsHead: [''],
      subHead: [''],
      minorHead: [''],
      objectHead: [''],
      amt: [''],
      totalAmount: ['']

    });
    this.getCurrentUserDetail();
    this.fetchMajorHead();
    this.fetchTypeLists();
    if (this.id > 0) { this.fetchListingDetails(); }

  }

  getCurrentUserDetail() {
    this.commonWorkflowService.getCurrentUserDetail().then((res: any) => {
      if (res) {
        console.log(res);
        this.wfRoleIds = res.wfRoleId;
        this.wfRoleCode = res.wfRoleCode;
        this.linkMenuId = res.linkMenuId ? res.linkMenuId : res.menuId;
        this.postId = res.postId;
        this.userId = res.userId;
        this.lkPoOffUserId = res.lkPoOffUserId;
        this.officeId = res.officeDetail.officeId;
      }
    });
  }

  addCreditRow() {
    if (this.dataSourceCredit) {
      this.dataSourceCredit = new MatTableDataSource(this.dataSourceCredit.data);
      const p_data = this.dataSourceCredit.data;
      p_data.push({ majorHeadCredit: '', majorHeadCredit_source: [], subMajorHeadCredit: '', subMajorHeadCredit_source: [], minorHeadCredit: '', minorHeadCredit_source: [], subHeadCredit: '', subHeadCredit_source: [], detailsHeadCredit: '', detailsHeadCredit_source: [], objectHeadCredit: '', objectHeadCredit_source: [], amtCred: 0 }
      );
      this.dataSourceCredit.data = p_data;
    }
  }

  deleteCreditRow(i) {
    this.dataSourceCredit.data.splice(i, 1);
    this.dataSourceCredit = new MatTableDataSource(this.dataSourceCredit.data);
  }

  addDebitRow() {
    if (this.dataSourceDebit) {
      this.dataSourceDebit = new MatTableDataSource(this.dataSourceDebit.data);
      const p_data = this.dataSourceDebit.data;
      p_data.push(
        { majorHead: '', majorHead_source: [], subMajorHead: '', subMajorHead_source: [], minorHead: '', minorHead_source: [], subHead: '', subHead_source: [], detailsHead: '', detailsHead_source: [], objectHead: '', objectHead_source: [], amt: 0, menuId: this.linkMenuId }
      );
      this.dataSourceDebit.data = p_data;
    }
  }

  deleteDebitRow(i) {
    this.dataSourceDebit.data.splice(i, 1);
    this.dataSourceDebit = new MatTableDataSource(this.dataSourceDebit.data);
  }

  onSave() {
    if (this.entryMasterForm.valid) {
      this.isSubmitted = false;
    } else {
      this.isSubmitted = true;
    }
  }

  checkDuplicateEntries() {
    let listId = [];
    for (let row of this.dataSourceCredit.data) {
      if (row.majorHeadCredit != '') {
        let checkVal = listId.some(m => m === row.majorHeadCredit);
        if (checkVal) {
          return true;
        } else {
          listId.push(row.majorHeadCredit);
        }
      }
    }

    for (let deb of this.dataSourceDebit.data) {
      if (deb.majorHead != '') {
        let checkVal = listId.some(m => m === deb.majorHead);
        if (checkVal) {
          return true;
        } else {
          listId.push(deb.majorHead);
        }
      }
    }

    return false;
  }

  onSubmit() {
    if (this.entryMasterForm.valid) {
      const datePipe = new DatePipe('en-US');
      let totalDebt = this.totalAmountDebit();
      let totalCredit = this.totalAmountCredit();
      if (!this.checkDuplicateEntries()) {
        if (totalDebt == totalCredit) {
          let totalEntryAmount = totalDebt;
          var data: SubmitManualEntry = {
            id: this.id > 0 ? this.id : 0,
            cinNo: this.entryMasterForm.value.cinNo,
            typeId: this.entryMasterForm.value.typeId,
            type: this.entryMasterForm.value.type,
            typeName: this.TypeName,
            valueDt: datePipe.transform(this.entryMasterForm.value.date, 'yyyy-MM-dd'),
            totalEntryAmt: totalEntryAmount,
            totalDebitAmt: totalDebt,
            totalCreditAmt: totalCredit,
            creditEntries: this.getCreditEntries(),
            debitEntries: this.getDebitEntries(),
            menuId: this.linkMenuId
          };

          //value.branchId = this.getBranchId();
          this.manualaccountingservice.saveManualEntry(data).subscribe(
            res => {
              if (res && res['result'] && res['status'] === 200) {
                this.toastr.success(res['message']);
                this.saveResult = res;
                this.openWfPopup();
              } else if (res && res['status'] !== 200) {
                this.toastr.error(res['message']);
              }
            },
            err => {
              this.toastr.error(err);
            }
          );
        } else {
          this.toastr.warning('Total Credit and Total Debit amount should be match..');
        }
      } else {
        this.toastr.warning('Duplicate entries present in Debit or Credit..');
      }
    } else {
      this.entryMasterForm.markAllAsTouched();
      this.toastr.warning('Please fill all mandatory fields..');
    }
  }

  openWfPopup(): void {
    const headerDetails = this.saveResult.result;
    const headerJson = [
      { label: 'CIN No', value: headerDetails.cinNo },
      { label: 'Total Debit Amount', value: headerDetails.totalDebitAmt },
      { label: 'Total Credit Amount', value: headerDetails.totalCreditAmt },
      { label: 'Total Entry Amount', value: headerDetails.totalEntryAmt },
    ];
    const moduleInfo = {
      moduleName: ModuleNames.EPAO,
      tbudSceHdrId: 1,
      financialYearId: 1,
      trnRefNo: 1,
      departmentId: 1,
      estimationFrom: 1,
      demandId: 1,
      bpnI: 1,
      majorheadId: 1,
      isRevenueCapital: 1,
      submajorheadId: 1,
      minorheadId: 1,
      subheadId: 1,
      detailheadId: 1,
      isChargedVoted: 1,
      proposed_Amount: 1000,
      officeTypeId: 1,
      workflowId: 1,
      wfRoleId: 1,
      statusId: 1
    };
    const dialogRef = this.dialog.open(EPAOCommonWorkflowComponent, {
      width: '2700px',
      height: '600px',
      data: {
        menuModuleName: 'gst',
        headingName: 'Manual Entry',
        headerJson: headerJson,
        trnId: headerDetails.id,
        moduleInfo: moduleInfo,
        refNo: headerDetails.referenceNo ? headerDetails.referenceNo : '',
        refDate: headerDetails.referenceDt ? headerDetails.referenceDt : '',
        //conditionUrl: 'loc1/accCloseReq/2001', // TODO NEED TO CHANGE THIS
        isAttachmentTab: false, // for Attachment tab visible it should be true
      }
    });

    dialogRef.afterClosed().subscribe(wfData => {
      if (wfData.commonModelStatus === true) {
        const popUpRes = wfData.data.result[0];
        const paramsForWf = {
          trnId: popUpRes.trnId,
          wfId: popUpRes.wfId,
          assignByWfRoleId: popUpRes.assignByWfRoleId,
          trnStatus: popUpRes.trnStatus,
          assignToWfRoleId: popUpRes.assignToWfRoleId,
          assignByBranchId: popUpRes.assignByBranchId,
          wfActionId: popUpRes.wfActionId,
          assignByOfficeId: popUpRes.assignByOfficeId,
          assignToOfficeId: popUpRes.assignToOfficeId,
          assignToPouId: popUpRes.assignToPouId,
          menuId: this.linkMenuId, //TODO this is satic for now
        };
        this.clearForm();
        // this.wfSubmitDetails(paramsForWf); // TODO need to work on this
        console.log(paramsForWf);
        this.goToListing();
      }
    });
  }
  

  goToListing() {
    this.router.navigate(['/dashboard/e-pao/manual-entry/manual-entry-master-listing'], { skipLocationChange: true });
  }

  getCreditEntries() {
    var data: CreditDebit[] = [];
    for (let row of this.dataSourceCredit.data) {
      var obj: CreditDebit = {
        id: row.id ? row.id : 0,
        majorHeadId: row.majorHeadCredit,
        majorHead: '',
        subMajorHeadId: row.subMajorHeadCredit,
        subMajorHead: '',
        minorHeadId: row.minorHeadCredit,
        minorHead: '',
        subHeadId: row.subHeadCredit,
        subHead: '',
        detailHeadId: row.detailsHeadCredit,
        detailHead: '',
        objectHeadId: row.objectHeadCredit,
        objectHead: '',
        creditAmt: row.amtCred
      }
      data.push(obj);
    }

    return data;
  }

  getDebitEntries() {
    var data = [];
    for (let row of this.dataSourceDebit.data) {
      var obj = {
        id: row.id ? row.id : 0,
        majorHeadId: row.majorHead,
        majorHead: '',
        subMajorHeadId: row.subMajorHead,
        subMajorHead: '',
        minorHeadId: row.minorHead,
        minorHead: '',
        subHeadId: row.subHead,
        subHead: '',
        detailHeadId: row.detailsHead,
        detailHead: '',
        objectHeadId: row.objectHead,
        objectHead: '',
        debitAmt: row.amt
      }
      data.push(obj);
    }

    return data;
  }

  clearForm() {
    this.Element_Data_1 = [
      { majorHeadCredit: '', majorHeadCredit_source: [], subMajorHeadCredit: '', subMajorHeadCredit_source: [], minorHeadCredit: '', minorHeadCredit_source: [], subHeadCredit: '', subHeadCredit_source: [], detailsHeadCredit: '', detailsHeadCredit_source: [], objectHeadCredit: '', objectHeadCredit_source: [], amtCred: 0 }
    ];
    this.Element_Data_2 = [
      { majorHead: '', majorHead_source: [], subMajorHead: '', subMajorHead_source: [], minorHead: '', minorHead_source: [], subHead: '', subHead_source: [], detailsHead: '', detailsHead_source: [], objectHead: '', objectHead_source: [], amt: 0 }
    ];
    this.dataSourceCredit = new MatTableDataSource<any>(this.Element_Data_1);
    this.dataSourceDebit = new MatTableDataSource<any>(this.Element_Data_2);

    this.entryMasterForm.reset();
    Object.keys(this.entryMasterForm.controls).forEach(key => {
      this.entryMasterForm.get(key).setErrors(null);
    });
  }

  totalAmountCredit(): number {
    let amountExp = 0;
    this.dataSourceCredit.data.forEach((element) => {
      amountExp = amountExp + Number(element.amtCred);
    });
    return amountExp;
  }

  totalAmountDebit(): number {
    let amountExp = 0;
    this.dataSourceDebit.data.forEach((element) => {
      amountExp = amountExp + Number(element.amt);
    });
    return amountExp;
  }

  fetchMajorHead() {
    //value.branchId = this.getBranchId();
    this.manualaccountingservice.fetchMajorHead().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.majorHead_list = res['result'];
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  fetchSubmajorHead(event, index, tableName, row) {
    if (event && index != undefined) {
      var obj = {
        "majorheadId": event
      }
      this.manualaccountingservice.fetchSubmajorHead(obj).subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            if (tableName == this.creditTableName) {
              row.subMajorHeadCredit_source = res['result'];
            } else if (tableName == this.debitTableName) {
              row.subMajorHead_source = res['result'];
            }
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
    }
  }

  fetchMinorHead(event, index, tableName, row) {
    if (event && index != undefined) {
      var obj = {
        "majorheadId": tableName == this.debitTableName ? this[tableName].data[index].majorHead : this[tableName].data[index].majorHeadCredit,
        "submajorheadId": event
      }
      this.manualaccountingservice.fetchMinorHead(obj).subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            //this.minor_head = res['result'];
            if (tableName == this.creditTableName) {
              row.minorHeadCredit_source = res['result'];
            } else if (tableName == this.debitTableName) {
              row.minorHead_source = res['result'];
            }
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
    }
  }

  fetchSubhead(event, index, tableName, row) {
    if (event && index != undefined) {
      var obj = {
        "majorheadId": tableName == this.debitTableName ? this[tableName].data[index].majorHead : this[tableName].data[index].majorHeadCredit,
        "submajorheadId": tableName == this.debitTableName ? this[tableName].data[index].subMajorHead : this[tableName].data[index].subMajorHeadCredit,
        "minorheadId": event

      }
      this.manualaccountingservice.fetchSubhead(obj).subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            //this.sub_head = res['result'];
            if (tableName == this.creditTableName) {
              row.subHeadCredit_source = res['result'];
            } else if (tableName == this.debitTableName) {
              row.subHead_source = res['result'];
            }
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
    }
  }

  fetchDetailHead(event, index, tableName, row) {
    if (event && index != undefined) {
      var obj = {
        "majorheadId": tableName == this.debitTableName ? this[tableName].data[index].majorHead : this[tableName].data[index].majorHeadCredit,
        "submajorheadId": tableName == this.debitTableName ? this[tableName].data[index].subMajorHead : this[tableName].data[index].subMajorHeadCredit,
        "minorheadId": tableName == this.debitTableName ? this[tableName].data[index].minorHead : this[tableName].data[index].minorHeadCredit,
        "subheadId": event
      }
      this.manualaccountingservice.fetchDetailHead(obj).subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            //this.details_head = res['result'];
            if (tableName == this.creditTableName) {
              row.detailsHeadCredit_source = res['result'];
            } else if (tableName == this.debitTableName) {
              row.detailsHead_source = res['result'];
            }
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
      this.fetchObjectHead(obj, index, tableName, row);
    }
  }

  onTypeChange(event) {
    this.TypeName = event.source.triggerValue;
  }

  fetchObjectHead(obj, index, tableName, row) {
    if (obj == null) {
      obj = {
        "majorheadId": tableName == this.debitTableName ? this[tableName].data[index].majorHead : this[tableName].data[index].majorHeadCredit,
        "submajorheadId": tableName == this.debitTableName ? this[tableName].data[index].subMajorHead : this[tableName].data[index].subMajorHeadCredit,
        "minorheadId": tableName == this.debitTableName ? this[tableName].data[index].minorHead : this[tableName].data[index].minorHeadCredit,
        "subheadId": row.subHeadId
      }
    }
    this.manualaccountingservice.fetchObjectHead(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {

          if (tableName == this.creditTableName) {
            row.objectHeadCredit_source = res['result'];
          } else if (tableName == this.debitTableName) {
            row.objectHead_source = res['result'];
          }
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  //value ={
  // 	"pageIndex":0,
  //   "jsonArr":[{"key":"cinNo",
  //   	"value":"abc"
  //   }]
  // }
  // fetchListingDetails(value) {
  //   //value.branchId = this.getBranchId();
  //   this.manualaccountingservice.fetchListingDetails(value).subscribe(
  //     res => {
  //       if (res && res['result'] && res['status'] === 200) {
  //         //this.object_head = res['result'];
  //       }
  //     },
  //     err => {
  //       this.toastr.error(err);
  //     }
  //   );
  // }

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
  fetchListingDetails() {
    var obj = {
      "pageIndex": 0,
      "jsonArr": [{
        "key": "id",
        "value": this.id
      },]
    }

    this.manualaccountingservice.fetchListingDetails(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.currentobj = res['result'].result[0];
          this.entryMasterForm.patchValue({
            id: this.id,
            cinNo: this.currentobj.cinNo,
            typeId: this.currentobj.typeId,
            type: this.currentobj.type,
            date: this.datePipe.transform(this.currentobj.manualEntryDt, 'yyyy-MM-dd'),
            totalEntryAmt: this.currentobj.totalEntryAmt,
            totalDebitAmt: this.currentobj.totalDebitAmt,
            totalCreditAmt: this.currentobj.totalCreditAmt
          });
          this.setDebitEntries();
          this.setCreditEntries();
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  setCreditEntries() {
    var data = [];
    let i: number = -1;
    for (let row of this.currentobj.creditEntries) {
      var obj = {
        id: row.id,
        // majorHead_source: this.majorHead_list,
        // subMajorHead_source: this.fetchSubmajorHead(),
        // minorHead_source: [],
        // subHead_source: [],
        // detailsHead_source: [],
        // objectHead_source: [],
        // majorHeadId: row.majorHeadId,
        // majorHead: '',
        // subMajorHeadId: row.subMajorHeadId,
        // subMajorHead: '',
        // minorHeadId: row.minorHeadId,
        // minorHead: '',
        // subHeadId: row.subHeadId,
        // subHead: '',
        // detailHeadId: row.detailHeadId,
        // detailHead: '',
        // objectHeadId: row.objectHeadId,
        // objectHead: '',
        // creditAmt: row.creditAmt 
        majorHeadCredit_source: this.majorHead_list,

        majorHeadCredit: row.majorHeadId,
        //subMajorHeadCredit_source: this.fetchSubmajorHead(row.majorHeadId, i, this.creditTableName, row),
        subMajorHeadCredit: row.subMajorHeadId,
        //minorHeadCredit_source: this.fetchMinorHead(row.subMajorHeadId, i, this.creditTableName, row),
        minorHeadCredit: row.minorHeadId,

        //subHeadCredit_source: this.fetchSubhead(row.minorHeadId, i, this.creditTableName, row),
        subHeadCredit: row.subHeadId,

        //detailsHeadCredit_source: this.fetchDetailHead(row.subHeadId, i, this.creditTableName, row),
        detailsHeadCredit: row.detailHeadId,

        objectHeadCredit: row.objectHeadId,
        //objectHeadCredit_source: [], 
        amtCred: row.creditAmt

      }
      data.push(obj);
    }
    this.dataSourceCredit = new MatTableDataSource<any>(data);
    // return data;
    for (let row of this.dataSourceCredit.data) {
      i = i + 1;
      row.majorHeadCredit_source = this.majorHead_list,
        // majorHead: row.majorHeadId,
        row.subMajorHeadCredit_source = this.fetchSubmajorHead(row.majorHeadCredit, i, this.creditTableName, row);
      // subMajorHead: row.subMajorHeadId,
      row.minorHeadCredit_source = this.fetchMinorHead(row.subMajorHeadCredit, i, this.creditTableName, row);
      // minorHead: row.minorHeadId,

      row.subHeadCredit_source = this.fetchSubhead(row.minorHeadCredit, i, this.creditTableName, row);
      // subHead: row.subHeadId,

      row.detailsHeadCredit_source = this.fetchDetailHead(row.subHeadCredit, i, this.creditTableName, row);
      // detailsHead: row.detailHeadId,

      // objectHead: row.objectHeadId,
      row.objectHeadCredit_source = this.fetchObjectHead(null, i, this.creditTableName, row);
      // amtCred: row.debitAmt
    }
  }

  setDebitEntries() {
    var data = [];
    let i: number = -1;
    for (let row of this.currentobj.debitEntries) {
      var obj = {
        id: row.id,
        // majorHead_source: this.majorHead_list,
        // subMajorHead_source: [],
        // minorHead_source: [],
        // subHead_source: [],
        // detailsHead_source: [],
        // objectHead_source: [],
        // majorHeadId: row.majorHeadId,
        // majorHead: '',
        // subMajorHeadId: row.subMajorHeadId,
        // subMajorHead: '',
        // minorHeadId: row.minorHeadId,
        // minorHead: '',
        // subHeadId: row.subHeadId,
        // subHead: '',
        // detailHeadId: row.detailHeadId,
        // detailHead: '',
        // objectHeadId: row.objectHeadId,
        // objectHead: '',
        // creditAmt: row.amt
        majorHead_source: this.majorHead_list,

        majorHead: row.majorHeadId,
        //subMajorHead_source: this.fetchSubmajorHead(row.majorHeadId, i, this.debitTableName, row),
        subMajorHead: row.subMajorHeadId,
        //minorHead_source: this.fetchMinorHead(row.subMajorHeadId, i, this.debitTableName, row),
        minorHead: row.minorHeadId,

        //subHead_source: this.fetchSubhead(row.minorHeadId, i, this.debitTableName, row),
        subHead: row.subHeadId,

        //detailsHead_source: this.fetchDetailHead(row.subHeadId, i, this.debitTableName, row),
        detailsHead: row.detailHeadId,

        objectHead: row.objectHeadId,
        //objectHeadCredit_source: [], 
        amt: row.debitAmt,
        menuId: this.linkMenuId
      }
      data.push(obj);

    }
    this.dataSourceDebit = new MatTableDataSource<any>(data);
    for (let row of this.dataSourceDebit.data) {
      i = i + 1;

      row.majorHead_source = this.majorHead_list,
        // majorHead: row.majorHeadId,
        row.subMajorHead_source = this.fetchSubmajorHead(row.majorHead, i, this.debitTableName, row);
      // subMajorHead: row.subMajorHeadId,
      row.minorHead_source = this.fetchMinorHead(row.subMajorHead, i, this.debitTableName, row);
      // minorHead: row.minorHeadId,

      row.subHead_source = this.fetchSubhead(row.minorHead, i, this.debitTableName, row);
      // subHead: row.subHeadId,

      row.detailsHead_source = this.fetchDetailHead(row.subHead, i, this.debitTableName, row);
      // detailsHead: row.detailHeadId,

      // objectHead: row.objectHeadId,
      row.objectHead_source = this.fetchObjectHead(null, i, this.debitTableName, row);
      // amtCred: row.debitAmt
    }
    // return data;
  }

}