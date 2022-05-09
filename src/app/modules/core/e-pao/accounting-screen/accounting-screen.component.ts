import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { AccountingEn, AccountingEntries, GSTDetails, ListValue, RBIDetails } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChallanAccountingService } from '../services/Challan-Accounting/challan-accounting.service';
import { ToastrService } from 'ngx-toastr';
import { ModuleNames } from '../epao-common-workflow-constant/epao-common-workflow.constants';
import * as _ from 'lodash';
import { EPAOCommonWorkflowComponent } from '../epao-common-workflow/epao-common-workflow.component';
// const ELEMENT_DATA: RBIDetails[] = [];
// //   {
// //     status: 'Forwarded',
// //     cin: '4254432',
// //     amount: '10000.00',
// //     partyName: 'A K Mehta',
// //     govCreditDate: '12-Feb-20',
// //     scrollDate: '19-Dec-19',
// //     paymentDate: '19-Dec-19',
// //     remarks: '-',
// //     type: 'RAT Clear',
// //     bank: '-',
// //     scrollNo: 'ENV486468541'
// //   },
// // ];
// const ELEMENT_DATAGST: GSTDetails[] = [];
// //   {

// //     gstin: '486468541',
// //     cin: '4254432',
// //     partyName: 'A K Mehta',
// //     paymentDate: '19-Dec-19',
// //     sgstFees: '5000.00',
// //     sgsttac: '5000.00',
// //     sgstInterest: '0.00',
// //     sgstOthers: '0.00',
// //     sgstPenalty: '0.00',
// //     sgstTotal: '10,000.00'
// //   }
// // ];
// const ELEMENT_DATAAS: AccountingEntries[] = [];
// //   {
// //     matched: 'Yes',
// //     moeType: '-',
// //     moeId: '-',
// //     moeStatus: '-',
// //     debitHeaad: '05',
// //     creditHead: '01',
// //     amount: '10,000.00',
// //   }
// // ];
// const ELEMENT_DATAR: AccountingEn[] = [];
//   {

//     majorHead: '8675',
//     subMajorHead: '00',
//     minorHead: '106',
//     subhead: '05',
//     detailHead: '01',
//     amount: '10,000.00',
//     majorHead1: '8568',
//     subMajorHead1: '00',
//     minorHead1: '108',
//     subhead1: '01',
//     detailHead1: '01',
//     amount1: '10,000.00',
//     description: 'deposit with Reverse Bank (Reserve Bank of India, PAD)',
//     description1: ' suspense account (reserve Bank of India, PAD)',
//   }
// ];
@Component({
  selector: 'app-accounting-screen',
  templateUrl: './accounting-screen.component.html',
  styleUrls: ['./accounting-screen.component.css']
})
export class AccountingScreenComponent implements OnInit {
  ELEMENT_DATAR = [];
  ELEMENT_DATAAS = [];
  ELEMENT_DATAGST = [];
  ELEMENT_DATA = [];
  // FormGroup
  accountScreenForm: FormGroup;
  // Date
  maxDate = new Date();
  todayDate = new Date();
  saveResult: any;
  // FormControl
  bankCtrl: FormControl = new FormControl();
  typeCtrl: FormControl = new FormControl();
  // List
  bank_list: ListValue[] = [];
  // {
  //   value: '1', viewValue: ' State Bank Of India',
  // },
  // {
  //   value: '2', viewValue: 'Bank Of Baroda',
  // }
  //   ,
  // {
  //   value: '2', viewValue: 'HDFC Bank',
  // }
  // ];
  type_list: ListValue[] = [];
  //   {
  //   value: '1', viewValue: ' RAT Clear',
  // },
  // {
  //   value: '2', viewValue: 'MOE Resolution',
  // }
  // ];
  account_list: ListValue[] = [{
    value: '1', viewValue: ' Yes',
  },
  {
    value: '2', viewValue: 'No',
  }
  ];
  // Data Source Table
  // gstRows = new BehaviorSubject(['noData']);
  // agstRows = new BehaviorSubject(['noData']);
  // reconcileRows = new BehaviorSubject(['noData']);
  asdataSource = new MatTableDataSource<any>(this.ELEMENT_DATAAS);
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  gstdataSource = new MatTableDataSource<any>(this.ELEMENT_DATAGST);
  newdisplayedColumns: string[] = ['cin', 'govCreditDate', 'amount'];
  gstnewdisplayedColumns: string[] = ['gstin', 'partyName', 'cin', 'paymentDate',
    'sgsttac', 'sgstInterest', 'sgstFees', 'sgstOthers', 'sgstPenalty', 'sgstTotal'];
  agstnewdisplayedColumns: string[] = ['matched', 'moeId', 'moeType', 'moeStatus'];

  subscription: Subscription;
  reconcileSource = new MatTableDataSource<any>(this.ELEMENT_DATAR);
  // reconciledisplayedColumns: string[] = ['majorHead', 'subMajorHead', 'minorHead', 'subhead', 'detailHead',
  //   'amount', 'majorHead1', 'subMajorHead1', 'minorHead1', 'subhead1', 'detailHead1',
  //   'amount1'];
  reconciledisplayedColumns: string[] = ['majorHead', 'subMajorHead', 'minorHead', 'subhead', 'detailHead', 'description',
    'amount', 'majorHead1', 'subMajorHead1', 'minorHead1', 'subhead1', 'detailHead1', 'description1', 'amount1'];

  reconShow = false;
  showTotalRow = false;
  onShow = false;
  total1 = 0;
  total2 = 0;
  currentObj;
  checkReconcile: boolean = true;
  accHdrId: any;
  trnIdData: void;
  status: any;
  data;
  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder,
    private challanaccountingservice: ChallanAccountingService, private toastr: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    let value = navigation.extras.state;

    this.id = value.id;
    this.accHdrId = value.accountHdrId;
    this.type = value.type;
    this.status = value.status;
    this.data = value.data;
  }
  directiveObject = new EPaoDirectives(this.router, this.dialog);
  public errorMessages;
  id;
  type: string;
  enabledReconcile: boolean = false;
  enabledSubmit: boolean = false;
  ngOnInit() {
    this.errorMessages = EPOAMessage;
    this.accountScreenData();
    this.fetchTypeLists();
    console.log(this.status)
   
    if (this.id > 0) {
      this.fetchChallanList();
      if (this.type === "view" && this.status === "Draft") {
        this.enabledReconcile = true;
      } else if (this.type === "view" && this.status !== "Draft") {
        this.enabledReconcile = true;
        this.ReconcileDetails();
        this.enabledSubmit = true;
      }
    }
    let statusValue= this.status.replace(/\s/g,'')
    console.log(statusValue)
    if(statusValue === 'ForwardedtoHA' || 'ReturnedtoSA/DA' ){
      this.ReconcileDetails();
    }
  }

  navigateToSelf(element) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate(['./dashboard/e-pao/account-screen'], { state: { 'id': element.id, 'accountHdrId': element.accountHdrId, 'type': 'edit', 'status': element.status, 'data': this.data.filter(i => i.id !== element.id && i.status === 'Draft') } });
    });
  }

  accountScreenData() {
    this.accountScreenForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      babk: [''],
      type: [''],
      acountCtrl: ['1']
    });
  }
  // navigation
  navigate() {
    this.router.navigate(['./dashboard/e-pao/account-screen-listing']);
  }
  reconcile() {
    this.reconShow = true;
    this.showTotalRow = true;
    this.onShow = true;
    this.checkReconcile = false;

    //this.gstRows.next(this.gstnewdisplayedColumns);
    //this.agstRows.next(this.agstnewdisplayedColumns);
    //this.reconcileRows.next(this.reconciledisplayedColumns);
    //this.total1 = '10,000.00';
    //this.total2 = '10,000.00';
  }
  getBank() {
    //value.branchId = this.getBranchId();
    this.challanaccountingservice.GetBankList().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.bank_list = res['result']['bankNames'];
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  ReconcileDetails() {
    let obj = { "id": this.id };
    //value.branchId = this.getBranchId();
    this.challanaccountingservice.ReconcileDetails(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          //this.bank_list = res['result']['bankNames'];
          // this.ELEMENT_DATA =[];
          // this.ELEMENT_DATA.push(res['result']);
          // this.newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
          this.currentObj = res['result'];
          this.reconcile();
          this.setGSTEntries(res['result']['gstDetails']);
          // this.ELEMENT_DATAAS =[];
          // this.ELEMENT_DATAAS.push(res['result']['accountingEntriesDto']);
          // this.asdataSource = new MatTableDataSource<any>(this.ELEMENT_DATAAS);
          this.setAccountingEntries(res['result']['accountingEntriesDto']);
          // this.ELEMENT_DATAGST =[];
          // this.ELEMENT_DATAGST.push(res['result']['gstDetails']);
          // this.gstdataSource = new MatTableDataSource<any>(this.ELEMENT_DATAGST);

        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  setGSTEntries(dataObj) {
    var data = [];
    // for (let row of dataObj) {
    if (dataObj != null) {
      var obj: GSTDetails = {
        gstin: dataObj.gstin,
        cin: dataObj.cinNo,
        partyName: dataObj.partyName,
        paymentDate: dataObj.paymentDt,
        sgstFees: dataObj.sgstFee,
        sgsttac: dataObj.sgstTax,
        sgstInterest: dataObj.sgstIntr,
        sgstOthers: dataObj.sgstOth,
        sgstPenalty: dataObj.sgstPnlty,
        sgstTotal: dataObj.sgstTotal
      }
      data.push(obj);
    }
    //}
    this.gstdataSource = new MatTableDataSource<any>(data);
  }

  setAccountingEntries(dataObj) {
    var dataobjAsdataSource = [];
    var dataRecdataSource = [];
    //for (let row of dataObj) {
    var objAsdataSource: AccountingEntries = {
      matched: dataObj.isEntryMatched ? (dataObj.isEntryMatched == 'Y' ? 'Yes' : (dataObj.isEntryMatched == 'N' ? 'No' : '')) : '',
      moeType: dataObj.moeType,
      moeId: dataObj.moeId,
      moeStatus: dataObj.moeStatus,
      debitHeaad: dataObj.debitEntries[0].detailhead,
      creditHead: dataObj.creditEntries[0].detailhead,
      amount: '-',
    }
    dataobjAsdataSource.push(objAsdataSource);

    let rowCount = 0;
    if (dataObj.debitEntries.length > dataObj.creditEntries.length) {
      rowCount = dataObj.debitEntries.length
    } else {
      rowCount = dataObj.creditEntries.length
    }

    for (let i = 0; i < rowCount; i++) {
      this.total1 += dataObj.debitEntries[i] ? dataObj.debitEntries[i].debitAmount : 0;
      this.total2 += dataObj.creditEntries[i] ? dataObj.creditEntries[i].creditAmount : 0;

      var obj: AccountingEn = {
        majorHead: dataObj.debitEntries[i] ? dataObj.debitEntries[i].majorhead : '',
        subMajorHead: dataObj.debitEntries[i] ? dataObj.debitEntries[i].submajorhead : '',
        minorHead: dataObj.debitEntries[i] ? dataObj.debitEntries[i].minorhead : '',
        subhead: dataObj.debitEntries[i] ? dataObj.debitEntries[i].subhead : '',
        detailHead: dataObj.debitEntries[i] ? dataObj.debitEntries[i].detailhead : '',
        amount: dataObj.debitEntries[i] ? dataObj.debitEntries[i].debitAmount : '',

        majorHead1: dataObj.creditEntries[i] ? dataObj.creditEntries[i].majorhead : '',
        subMajorHead1: dataObj.creditEntries[i] ? dataObj.creditEntries[i].submajorhead : '',
        minorHead1: dataObj.creditEntries[i] ? dataObj.creditEntries[i].minorhead : '',
        subhead1: dataObj.creditEntries[i] ? dataObj.creditEntries[i].subhead : '',
        detailHead1: dataObj.creditEntries[i] ? dataObj.creditEntries[i].detailhead : '',
        amount1: dataObj.creditEntries[i] ? dataObj.creditEntries[i].creditAmount : '',

        description: dataObj.debitEntries[i] ? dataObj.debitEntries[i].entryDesc : '',
        description1: dataObj.creditEntries[i] ? dataObj.creditEntries[i].entryDesc : ''
      }

      dataRecdataSource.push(obj);
    }
    // }
    this.asdataSource = new MatTableDataSource<any>(dataobjAsdataSource);
    this.reconcileSource = new MatTableDataSource<any>(dataRecdataSource);
  }

  SubmitReconcileDetails() {
    this.currentObj.accountHdrId = this.accHdrId;
    let obj = this.currentObj;
    this.challanaccountingservice.SubmitReconcileDetails(obj).subscribe(
      res => {
        if (res && res['status'] === 200) {
          this.toastr.success(res['message']);
          this.saveResult = res;
          if (this.currentObj.accountingEntriesDto.isEntryMatched === 'N') {
            this.trnIdData = this.saveResult.result.accountHdrId;
            this.openWfPopup();
          }
          else {
            this.router.navigate(['./dashboard/e-pao/account-screen-listing']);
          }
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  openWfPopup(): void {
    const headerDetails = this.saveResult.result;
    const headerJson = [
      { label: 'GSTN', value: this.currentObj.gstDetails.gstin },
      { label: 'Party Name', value: this.currentObj.gstDetails.partyName },
      { label: 'CIN', value: this.currentObj.accountScreenChallanDto.cin },
      { label: 'Government Credit Date', value: this.currentObj.accountScreenChallanDto.govCreditDate },
      { label: 'Amount(₹)', value: this.currentObj.accountScreenChallanDto.amount }
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
        headingName: 'Challan Accounting',
        headerJson: headerJson,
        trnId: this.trnIdData,
        moduleInfo: moduleInfo,
        refNo: '',
        refDate: '',
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
          // menuId: this.linkMenuId, //TODO this is satic for now
        };

        // this.wfSubmitDetails(paramsForWf); // TODO need to work on this

        if (this.data.length > 0) {
          this.navigateToSelf(this.data[0]);
        }
        else {
          console.log(paramsForWf);
          this.directiveObject.selection.clear();
          this.clearForm();
          this.router.navigate(['./dashboard/e-pao/account-screen-listing']);
        }
      }
    });
  }


  setSaveObject() {
    return {
      "accountScreenChallanDto": {
        "id": 6,
        "cin": "SBIN17012500000015",
        "govCreditDate": "2021-09-07",
        "amount": 27192,
        "scrollDate": "2021-09-07",
        "paymentDate": "2021-09-07",
        "partyName": "-",
        "remarks": "-",
        "status": "Created"
      },
      "gstDetails": {
        "id": 1,
        "referenceNo": "REF-No-000001",
        "gstin": "25AAAAM2172N1Z9",
        "referenceDt": "2021-08-28",
        "isGstinTmpid": "F",
        "gstinTmpidNo": "1233",
        "partyName": "XYZ",
        "paymentDt": "2021-08-28",
        "sgstTax": 0,
        "sgstIntr": 0,
        "sgstFee": 0,
        "sgstPnlty": 0,
        "sgstOth": 0,
        "sgstTotal": 27192,
        "isEntryMatched": "Y",
        "cinNo": "SBIN17012500000015"
      },
      "accountingEntriesDto": {
        "moeId": null,
        "moeStatus": null,
        "moeType": null,
        "creditEntries": [
          {
            "id": 0,
            "referenceNo": "20-21/EPAO/MES/000014",
            "referenceDt": "2021-10-21T00:06:57.292+0530",
            "cinNo": "SBIN17012500000015",
            "majorheadId": 8675,
            "majorhead": "",
            "submajorheadId": 0,
            "submajorhead": "",
            "minorheadId": 106,
            "minorhead": "",
            "subhead": "",
            "subheadId": 5,
            "detailheadId": 1,
            "detailhead": "",
            "entryDesc": "Deposit with Reverse Bank (Reserve Bank of India, PAD)",
            "creditAmount": 27192
          }
        ],
        "debitEntries": [
          {
            "id": 0,
            "referenceNo": "20-21/EPAO/MES/000015",
            "referenceDt": "2021-10-21T00:06:57.422+0530",
            "cinNo": "SBIN17012500000015",
            "majorheadId": 8568,
            "majorhead": "",
            "submajorheadId": 0,
            "submajorhead": "",
            "minorheadId": 108,
            "minorhead": "",
            "subhead": "",
            "subheadId": 1,
            "detailheadId": 1,
            "detailhead": "",
            "entryDesc": "Suspense account (reserve Bank of India, PAD)",
            "debitAmount": 27192
          }
        ]
      }
    }
  }

  clearForm() {
    this.ELEMENT_DATAR = [];
    this.ELEMENT_DATAAS = [];
    this.ELEMENT_DATAGST = [];
    this.newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATAR);
    this.asdataSource = new MatTableDataSource<any>(this.ELEMENT_DATAAS);
    this.gstdataSource = new MatTableDataSource<any>(this.ELEMENT_DATAGST);
    this.reconShow = false;
    this.showTotalRow = false;
    this.onShow = false;
    this.checkReconcile = true;
    this.accountScreenForm.reset();
  }

  fetchTypeLists() {
    //value.branchId = this.getBranchId();
    this.challanaccountingservice.fetchTypeLists().subscribe(
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

  fetchChallanList() {
    let obj = {
      id: this.id
    }

    this.challanaccountingservice.FetchChallanAccountingListById(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          // this.type_list = res['result'];
          this.ELEMENT_DATA = [];
          this.ELEMENT_DATA.push(res['result']);
          this.newdataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

}
