import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { Router } from '@angular/router';
import { ListValue } from 'src/app/models/common-grant';
import { AmountDetails, PanaltyAmountReceive, PenalSave } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PenalInterestCollectionService } from '../services/Penal-Interest-Collection/penal-interest-collection.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';
import { ModuleNames } from '../epao-common-workflow-constant/epao-common-workflow.constants';
import { EPAOCommonWorkflowComponent } from '../../e-pao/epao-common-workflow/epao-common-workflow.component'

@Component({
  selector: 'app-penalty-amount-receive',
  templateUrl: './penalty-amount-receive.component.html',
  styleUrls: ['./penalty-amount-receive.component.css']
})
export class PenaltyAmountReceiveComponent implements OnInit {

  // date
  todayDate = Date.now();
  initiatiomdate = new Date((new Date()));
  maxDate = new Date();
  // Error messgae
  errorMessages = EPOAMessage;
  // variable
  isSubmitted = false;
  // FormGroup
  penaltyAmountForm: FormGroup;
  currentobj;
  // FormControl
  bankTypeCtrl: FormControl = new FormControl();
  morCtrl: FormControl = new FormControl();

  // List
  bankType_list: ListValue[] = [];
  //   { value: '1', viewValue: 'Bank Of Baroda, Baroda' },
  //   { value: '2', viewValue: 'State bank of India' },

  // ];

  modeOfReciept = "Mode Of Receipt";
  year = "Year List";
  month = "Month";

  rMonth_list: ListValue[] = [
    { value: '1', viewValue: 'January' },
    { value: '2', viewValue: 'March' },
    { value: '3', viewValue: 'April' },
  ];

  mor_list: ListValue[] = [];
  //   { value: '1', viewValue: 'Cheque' },
  //   { value: '2', viewValue: 'NEFT/RTGS' },
  //   { value: '3', viewValue: 'RBI' },
  //   { value: '4', viewValue: 'Draft' },
  //   { value: '5', viewValue: 'Challan/Cash' }
  // ];
  year_list: ListValue[] = [];
  //   { value: '1', viewValue: '2009' },
  //   { value: '2', viewValue: '2010' },
  //   { value: '3', viewValue: '2011' },
  //   { value: '4', viewValue: '2012' },
  //   { value: '5', viewValue: '2013' },
  //   { value: '6', viewValue: '2014' },
  //   { value: '7', viewValue: '2015' },
  //   { value: '8', viewValue: '2016' },
  //   { value: '9', viewValue: '2017' },
  //   { value: '10', viewValue: '2018' },
  //   { value: '11', viewValue: '2019' },
  //   { value: '12', viewValue: '2020' },
  // ];
  month_list: ListValue[] = [];
  //   { value: '1', viewValue: 'Jan' },
  //   { value: '2', viewValue: 'Feb' },
  //   { value: '3', viewValue: 'Mar' },
  //   { value: '4', viewValue: 'Apr' },
  //   { value: '5', viewValue: 'May' },
  //   { value: '6', viewValue: 'Jun' },
  //   { value: '7', viewValue: 'Jul' },
  //   { value: '8', viewValue: 'Aug' },
  //   { value: '9', viewValue: 'Sep' },
  //   { value: '10', viewValue: 'Oct' },
  //   { value: '11', viewValue: 'Nov' },
  //   { value: '12', viewValue: 'Dec' },

  // ];
  Element_Data: PanaltyAmountReceive[] = [
    { year: '', month: '', claimAmt: '', oldAmt: '', remainingAmt: '', currentAmt: '' }
  ];
  dataSource = new MatTableDataSource<any>(this.Element_Data);
  columns: string[] = ['position', 'year', 'month', 'claimAmt', 'oldAmt', 'remainingAmt', 'currentAmt', 'action'];
  id: number;
  MORName:string;
  BankName:string;
  wfRoleIds: any;
  wfRoleCode: any;
  linkMenuId: any;
  postId: any;
  userId: any;
  lkPoOffUserId: any;
  officeId: any;
  saveResult: any;

  constructor(private fb: FormBuilder, private router: Router,
    public dialog: MatDialog
    , private penalService: PenalInterestCollectionService
    , private commonWorkflowService: CommonWorkflowService
    , private toastr: ToastrService
    , private datepipe: DatePipe) {
    const navigation = this.router.getCurrentNavigation();
    this.id = navigation.extras as number;

  }
  directiveObject = new EPaoDirectives(this.router, this.dialog);

  ngOnInit() {

    this.penaltyAmountForm = this.fb.group({
      date: [''],
      creditDate: [''],
      bankType: [''],
      bankName: [''],
      //bank: ['Bank Of Baroda, Baroda'],
      penaltyAmount: ['200.00'],
      recoveredAmount: ['0.00'],
      //rMonth: [''],
      //rYear: [''],
      amt: [''],
      chqCeferenceNo:[''],
      refNo: [''],
      referenceDt: [''],
      mor: [''],
      year: [''],
      month: [''],
    });

    this.getCurrentUserDetail();
    this.getBank();
    this.getLookupValues(this.modeOfReciept);
    this.getLookupValues(this.year);
    this.getLookupValues(this.month);
    
    if(this.id > 0){this.GetPenalListing();}
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

  addRow() {
    if (this.dataSource) {
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      const p_data = this.dataSource.data;
      p_data.push({ year: '', month: '', claimAmt: '', oldAmt: '', remainingAmt: '', currentAmt: '' });
      this.dataSource.data = p_data;
    }
  }

  delete(index) {
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  onSave() {
    if (this.penaltyAmountForm.valid) {
      this.isSubmitted = false;
    } else {
      this.isSubmitted = true;
    }

  }

  clearForm() {
    this.Element_Data = [
      { year: '', month: '', claimAmt: '', oldAmt: '', remainingAmt: '', currentAmt: '' }
    ];
    this.dataSource = new MatTableDataSource<any>(this.Element_Data);
    this.penaltyAmountForm.reset();
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

  onBankChange(event){
this.BankName = event.source.triggerValue;
  }

  onMORChange(event){
    this.MORName = event.source.triggerValue;

  }

  getLookupValues(name) {
    let obj = {};
    if (name === this.modeOfReciept) {
      obj = {
        "name": this.modeOfReciept
      };
    } else if (name === this.year) {
      obj = {
        "name": this.year
      };
    } else if (name === this.month) {
      obj = {
        "name": this.month
      };
    }
    this.penalService.GetLookupValues(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          if (name === this.modeOfReciept) {
            this.mor_list = res['result'];
          } else if (name === this.year) {
            this.year_list = res['result'];
          } else if (name === this.month) {
            this.month_list = res['result'];
          }
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  GetBankWiseInterest(event, index) {
    if (this.dataSource.data[index].year && this.dataSource.data[index].month &&
      this.penaltyAmountForm.value.bankType) {
      let obj = {
        "year": this.dataSource.data[index].year,
        "month": this.dataSource.data[index].month,
        "bankId": this.penaltyAmountForm.value.bankType
      };
      this.penalService.GetBankWiseInterest(obj).subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            this.dataSource.data[index]['claimAmt'] = res["result"].claimAmount;
            this.dataSource.data[index]['oldAmt'] = res["result"].earliearReceivedAmount;
            this.dataSource.data[index]['remainingAmt'] = res["result"].remainingAmount;
          }
        },
        err => {
          this.toastr.error(err);
        }
      );
    }
  }

  Submit(form: NgForm) {
    debugger;
    if (this.penaltyAmountForm.valid && form.valid) {
      if (this.checkTotalAmount()) {
        let obj = this.setSaveObject();
        this.penalService.Save(obj).subscribe(
          res => {
            if (res && res['result'] && res['status'] === 200) {
              this.toastr.success(res['message']);
              this.saveResult = res;
              this.openWfPopup();
            }
          },
          err => {
            this.toastr.error(err);
          }
        );
      } else {
        this.toastr.warning('Currently Received Amount (₹) should be match with Amount (₹)..');
      }
    } else {
      this.penaltyAmountForm.markAllAsTouched();
      form.form.markAllAsTouched();
      this.toastr.warning('Please fill all required fields..');
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
                        headingName: 'Penal Interest Collection ',
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

                    // this.wfSubmitDetails(paramsForWf); // TODO need to work on this
                        console.log(paramsForWf);
                        this.clearForm();
                        this.goToListing();
                    }
                });
    }

    goToListing() {
      this.router.navigate(['/dashboard/e-pao/penalty-amount-receive-listing'], { skipLocationChange: true });
    }

  checkAmountVal(element, amt) {
    element.currentAmt = parseInt(amt.value);
    if (element.currentAmt > element.remainingAmt) {
      this.toastr.warning('Currently Received Amount (₹) should not be greater than Remaining Amount (₹)..');
    }
  }

  checkTotalAmount() {
    let totalAmount = 0;
    this.dataSource.data.forEach(element => {
      totalAmount = totalAmount + parseInt(element.currentAmt);
    });
    if (this.penaltyAmountForm.value.amt != totalAmount) {
      return false;
    }
    return true;
  }

  setSaveObject() {
    let data: PenalSave = {
      id : this.id>0 ? this.id : null,
      bankId: this.penaltyAmountForm.value.bankType,
      bankName: this.BankName ? this.BankName : this.penaltyAmountForm.value.bankName,
      receiptModeId: this.penaltyAmountForm.value.mor,
      receiptModeText: this.penaltyAmountForm.value.receiptModeText,
      chqCeferenceNo: this.penaltyAmountForm.value.chqCeferenceNo,
      referenceNo: this.penaltyAmountForm.value.refNo ? this.penaltyAmountForm.value.refNo : null,
      receiptDt: this.penaltyAmountForm.value.date,
      referenceDt: this.penaltyAmountForm.value.referenceDt ? this.penaltyAmountForm.value.referenceDt : null,      
      //this.datepipe.transform(this.penaltyAmountForm.value.date, 'dd/MM/yyyy').toString(),
      govtCreditDt: this.penaltyAmountForm.value.creditDate,
      //this.datepipe.transform(this.penaltyAmountForm.value.creditDate, 'dd/MM/yyyy').toString(),
      interestAmount: parseInt(this.penaltyAmountForm.value.amt),
      entryStatusId: this.penaltyAmountForm.value.entryStatusId ? this.penaltyAmountForm.value.entryStatusId : null,
      entryStatus: this.penaltyAmountForm.value.entryStatus ? this.penaltyAmountForm.value.entryStatus : null,
      penalDetailsList: this.setAmountDetails(),
      menuId: this.linkMenuId
    }

    return data;
  }

  setAmountDetails() {
    let obj: AmountDetails[] = [];
    this.dataSource.data.forEach(element => {
      let data: AmountDetails = {
        id: element.id ? element.id : null, 
        penalIntrstId: null,
        receivedYearId: element.year,
        receivedYrYyyy:'',
        receivedMonthId: element.month,
        receivedMonth:'',
        claimAmount: element.claimAmt,
        earlierRecvAmount: element.oldAmt,
        remainingAmount: element.remainingAmt,
        currRecvAmount: element.currentAmt
      }
      obj.push(data);
    });
    return obj;
  }

  GetPenalListing() {
    let obj = {
      "pageIndex": 0,
      "jsonArr": [{
        "key": "id",
        "value": this.id
      }]
    }
    this.penalService.GetListing(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.currentobj = res['result'].result[0];
          this.penaltyAmountForm.patchValue({
          //   user: this.question.user,
          //   questioning: this.question.questioning
          // });
           id : this.id,
           bankType : this.currentobj.bankId,
           bankName : this.currentobj.bankName,
           mor : this.currentobj.receiptModeId,
           receiptModeText : this.currentobj.receiptModeText,
           chqCeferenceNo : this.currentobj.chqCeferenceNo,
           refNo : this.currentobj.referenceNo,
           referenceDt : this.currentobj.referenceDt,
           date : this.currentobj.receiptDt,
           creditDate : this.currentobj.govtCreditDt,
           amt : parseInt(this.currentobj.interestAmount)
          });
          this.setPenalEntries();
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  setPenalEntries() {
    var data = [];
    for (let row of this.currentobj.penalDetailsList) {
      var obj = {
        id: row.id,
        year: row.receivedYearId,
        month: row.receivedMonthId,
        claimAmt: row.claimAmount,
        oldAmt: row.earlierRecvAmount,
        remainingAmt: row.remainingAmount,
        currentAmt: row.currRecvAmount
      }
      data.push(obj);
    }
    this.dataSource = new MatTableDataSource<any>(data);
  }

}
