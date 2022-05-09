import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { WorkFlowEPaoComponent } from '../work-flow-e-pao/work-flow-e-pao.component';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { BranchHamApping, GenerateMoeEntry, ListValue } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MoeService } from '../services/moe/moe.service';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { EPAOCommonWorkflowComponent } from '../epao-common-workflow/epao-common-workflow.component';
import { ModuleNames } from '../epao-common-workflow-constant/epao-common-workflow.constants';
import { CommonService } from 'src/app/modules/services/common.service';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';
import { MoeCommonPopupComponent } from '../moe-common-popup/moe-common-popup.component';

@Component({
    selector: 'app-genereate-moe',
    templateUrl: './genereate-moe.component.html',
    styleUrls: ['./genereate-moe.component.css']
})
export class GenereateMoeComponent implements OnInit {
    ELEMENT_DATA: GenerateMoeEntry[] = [];
    //   {
    //     status: 'Forwarded',
    //     gstIN: '4254432',
    //     mOEAmount: '550.00',
    //     cin: '4654651',
    //     mOEType: 'MOE',
    //     partyName: 'A K Mehta',
    //     rbiAmount: '500.00',
    //     gstAmount: '500.00',
    //     bank: 'State Bank Of India',
    //     govCreditDate: '12-Feb-20',
    //     moeRaisedDate: '12-Feb-20',
    //     paymentDate: '19-Dec-19',
    //     remarks: 'Created'
    //   },
    // ];
    // FormGroup
    generateMoeForm: FormGroup;
    // date
    maxDate = new Date();
    todayDate = new Date();
    // FormControl
    bankCtrl: FormControl = new FormControl();
    typeCtrl: FormControl = new FormControl();
    // list
    bank_list: ListValue[] = [];
    //   {
    //   value: '1', viewValue: 'State Bank Of India',
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
    //   { value: '1', viewValue: 'Not Received from GSTN ' },
    //   { value: '2', viewValue: 'Amount Less' },
    //   { value: '3', viewValue: 'Amount Greater' },
    //   { value: '4', viewValue: 'Not received from RBI' },
    // ];
    // table source
    newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

    newdisplayedColumns: string[] = [
        'srNo',
        'gstIN',
        'partyName',
        'cin',
        'paymentDate',
        'gstAmount',
        'rbiAmount',
        'mOEType',
        'bank',
        'mOEAmount',
        'govCreditDate',
        'moeRaisedDate',
        'remarks'
    ];

    statusCtrl: FormControl = new FormControl();
    status_list: ListValue[] = [];
    //   { value: '1', viewValue: 'Created' },
    //   { value: '2', viewValue: 'Forwarded' },
    //   { value: '3', viewValue: 'Verified' },
    //   { value: '4', viewValue: 'Approved' }
    // ];
    id;
    currentobj;
    selectedRows = [];
    TypeList = 'MOE_Type_List';
    statusList = 'EPAO_Status_List';
    saveResult;
    menuId: any;
    lkPoOffUserId: any;
    currentObj: any;
    genMoeData: any;
    newObj: { wfRequestNo: any; actionConfigId: number; menuId: number; assignType: string; trnDto: any[] };
    postId: any;
    wfRoleIds: any;
    wfRoleCode: any;
    linkMenuId: any;
    userId: any;
    officeId: any;
    districtId: any;
    commentHistoryOfficeName: any;
    loggedInDepartmentId: any;
    selectedStatusText: '';
    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private moeservice: MoeService,
        private toastr: ToastrService,
        private commonService: CommonService,
        private commonWorkflowService: CommonWorkflowService
    ) {
        const navigation = this.router.getCurrentNavigation();
        this.id = navigation.extras as number;
    }
    directiveObject = new EPaoDirectives(this.router, this.dialog);

    public errorMessages;
    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.generateMoeData();
        this.getBank();
        this.fetchTypeLists();
        this.genMOEListData();
        this.menuId = this.commonService.getMenuId();
        this.commonWorkflowService.getCurrentUserDetail().then(res => {
            if (res) {
                console.log(res);
                this.wfRoleIds = res['wfRoleId'];
                this.wfRoleCode = res['wfRoleCode'];
                this.menuId = res['menuId'];
                this.linkMenuId = res['linkMenuId'] ? res['linkMenuId'] : this.menuId;
                this.postId = res['postId'];
                this.userId = res['userId'];
                this.lkPoOffUserId = res['lkPoOffUserId'];
                this.officeId = res['officeDetail']['officeId'];
                this.districtId = res['officeDetail']['districtId'];
                this.commentHistoryOfficeName = res['officeDetail']['officeName'];
                this.loggedInDepartmentId = res['officeDetail']['departmentId'];
            }
        });
        this.fetchStatusLists();
    }
    generateMoeData() {
        this.generateMoeForm = this.fb.group({
            fromDate: [''],
            toDate: [''],
            babk: [''],
            bankName: [''],
            type: [''],
            gstin: [''],
            cin: [''],
            ctin: [''],
            moeRaisedfromDate: [''],
            moeRaisedtoDate: [''],
            status: [''],
            statusid: ['']
        });
    }

    // navigation routing
    navigate() {
        this.router.navigate(['./e-pao/generate-moe-listing']);
    }

    // GST Dialog
    openView() {
        // tslint:disable-next-line: no-use-before-declare
        const dialogRef = this.dialog.open(GSTDialogComponent, {
            width: '1200px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    getBank() {
        //value.branchId = this.getBranchId();
        this.moeservice.GetBankList().subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.bank_list = res['result']['bankNames'];
                    // this.GetMOEListing();
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
    genMOEListData() {
        let data = {
            wfRequestId: '001234',
            wfRequestNo: '',
            menuId: this.menuId,
            typeId: 71
        };
        //value.branchId = this.getBranchId();
        this.moeservice.genMOEList(data).subscribe(
            res => {
                console.log(res);
                if (res && res['result'] && res['status'] === 200) {
                    this.genMoeData = res['result'];
                    console.log(  this.genMoeData)
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
    fetchTypeLists() {
        //value.branchId = this.getBranchId();
        let obj = {
            name: this.TypeList
        };
        this.moeservice.GetLookupValues(obj).subscribe(
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
    StatusChanged(event){
        console.log(event)
        this.selectedStatusText = event.source.selected.viewValue;
     }

    fetchStatusLists() {
        //value.branchId = this.getBranchId();
        let obj = {
            name: this.statusList
        };
        this.moeservice.GetLookupValues(obj).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.status_list = res['result'];
                    console.log(this.status_list)
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
    clearForm() {
        this.ELEMENT_DATA = [];
        this.newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.generateMoeForm.reset();
        this.selectedStatusText ="";
    }

    fetchMOEList() {
      let jsonObj = [];
 
      jsonObj.push({
          key: 'fromDate',
          value: this.generateMoeForm.value.fromDate ? this.generateMoeForm.value.fromDate : ''
      });
      jsonObj.push({
          key: 'toDate',
          value: this.generateMoeForm.value.toDate ? this.generateMoeForm.value.toDate : ''
      });

      jsonObj.push({
          key: 'moeRaisedFromDate',
          value: this.generateMoeForm.value.moeRaisedfromDate ? this.generateMoeForm.value.moeRaisedfromDate : ''
      });

      jsonObj.push({
          key: 'moeRaisedToDate',
          value: this.generateMoeForm.value.moeRaisedtoDate ? this.generateMoeForm.value.moeRaisedtoDate : ''
      });

      jsonObj.push({
          key: 'bankId',
          value: this.generateMoeForm.value.babk ? this.generateMoeForm.value.babk : ''
      });

      jsonObj.push({
          key: 'GSTIN_TMPID_NO',
          value: this.generateMoeForm.value.gstin ? this.generateMoeForm.value.gstin : ''
      });

      jsonObj.push({
          key: 'CPIN_NO',
          value: this.generateMoeForm.value.ctin ? this.generateMoeForm.value.ctin : ''
      });

      jsonObj.push({
          key: 'CIN_NO',
          value: this.generateMoeForm.value.cin ? this.generateMoeForm.value.cin : ''
      });

      jsonObj.push({
          key: 'pouId',
          value: this.lkPoOffUserId
      });
      jsonObj.push({
          key: 'menuId',
          value: this.menuId
      });
      jsonObj.push({
        key: "status",
        value: this.generateMoeForm.value.status || ""
      });
      jsonObj.push({
        key: "wfStatus",
        value: this.selectedStatusText || ""
      });

      jsonObj.push({
          key: 'isSearch',
          value: 0
      });
      let obj = {
          pageIndex: 0,
          pageElement: 250,
          jsonArr: jsonObj
      };
      console.log(obj);

      this.moeservice.FetchMOEList(obj).subscribe(
          res => {
              if (res && res['result'] && res['status'] === 200) {
                  // this.type_list = res['result'];
                  this.ELEMENT_DATA = res['result']['result'];
                  this.newdataSource = new MatTableDataSource(this.ELEMENT_DATA);
              }
          },
          err => {
              this.toastr.error(err);
          }
      );
  }

    GetMOEListing() {
        let jsonObj = [];

        jsonObj.push({
            key: 'fromDate',
            value: this.generateMoeForm.value.fromDate ? this.generateMoeForm.value.fromDate : ''
        });
        jsonObj.push({
            key: 'toDate',
            value: this.generateMoeForm.value.toDate ? this.generateMoeForm.value.toDate : ''
        });

        jsonObj.push({
            key: 'moeRaisedFromDate',
            value: this.generateMoeForm.value.moeRaisedfromDate ? this.generateMoeForm.value.moeRaisedfromDate : ''
        });

        jsonObj.push({
            key: 'moeRaisedToDate',
            value: this.generateMoeForm.value.moeRaisedtoDate ? this.generateMoeForm.value.moeRaisedtoDate : ''
        });

        jsonObj.push({
            key: 'bankId',
            value: this.generateMoeForm.value.babk ? this.generateMoeForm.value.babk : ''
        });

        jsonObj.push({
            key: 'GSTIN_TMPID_NO',
            value: this.generateMoeForm.value.gstin ? this.generateMoeForm.value.gstin : ''
        });

        jsonObj.push({
            key: 'CPIN_NO',
            value: this.generateMoeForm.value.ctin ? this.generateMoeForm.value.ctin : ''
        });

        jsonObj.push({
            key: 'CIN_NO',
            value: this.generateMoeForm.value.cin ? this.generateMoeForm.value.cin : ''
        });

        jsonObj.push({
            key: 'pouId',
            value: this.lkPoOffUserId
        });
        jsonObj.push({
            key: 'menuId',
            value: this.menuId
        });

        jsonObj.push({
            key: 'isSearch',
            value: 0
        });
        let obj = {
            pageIndex: 0,
            pageElement: 250,
            jsonArr: jsonObj
        };
        console.log(obj);

        this.moeservice.FetchMOEList(obj).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    // this.type_list = res['result'];
                    // this.ELEMENT_DATA = res['result']['result'];
                    // this.newdataSource = new MatTableDataSource(this.ELEMENT_DATA);
                    this.currentobj = res['result'].result[0];
                    this.generateMoeForm.patchValue({
                        //   user: this.question.user,
                        //   questioning: this.question.questioning
                        // });
                        id: this.id,
                        fromDate: '',
                        toDate: '',
                        babk: this.currentobj.bank_ID,
                        bankName: this.currentobj.bank_NAME,
                        type: '',
                        gstin: this.currentobj.gstin_TMPID_NO,
                        cin: this.currentobj.cin_NO,
                        ctin: this.currentobj.cpin_NO,
                        date: this.currentobj.referenceDt,
                        moeRaisedfromDate: this.currentobj.govtCreditDt,
                        moeRaisedtoDate: parseInt(this.currentobj.interestAmount),
                        status: this.currentobj.moe_STATUS,
                        statusid: this.currentobj.moe_STATUS_ID
                    });
                    this.setMoeEntries();
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
    setMoeEntries() {
        var data = [];
        for (let row of this.currentobj.penalDetailsList) {
            var obj = {
                status: row.moe_STATUS,
                gstIN: row.gstin_TMPID_NO,
                mOEAmount: '',
                cin: row.cin_NO,
                mOEType: '',
                partyName: row.party_NAME,
                rbiAmount: row.rbi_AMOUNT,
                gstAmount: row.gst_AMOUNT,
                bank: row.bank_NAME,
                govCreditDate: row.govt_CREDIT_DT,
                moeRaisedDate: row.moe_RAISED_DT,
                paymentDate: row.moe_PAYMENT_DT,
                remarks: ''
            };
            data.push(obj);
        }
        this.newdataSource = new MatTableDataSource<any>(data);
    }

      SubmitMOElist() {
          let data={
              "wfRequestNo" : this.genMoeData.wfRequestNo,
              "actionConfigId": 265,
              "menuId" : this.menuId,
              "assignType" : "MULTIPLE_USER",
            "trnDto" : [
              {
                  "trnId" : this.objMoe[0].id,
                  "remarks" :this.objMoe[0].remarks,
                  "officeId": this.officeId,
                  "pouId":  this.lkPoOffUserId,
                  "postId": this.postId,
                  "userId": this.userId,
                  "wfRoleId": this.wfRoleIds,
                  "level": 0
              }
            ]
          }
          console.log('submit'+ data)
          this.moeservice.SubmitMOE(data).subscribe(
            res => {
              if (res && res['status'] === 202) {
                console.log("dataa")
                this.toastr.success(res['message']);
                this.saveResult = res;
                alert()
                window.location.reload();
              }
            },
            err => {
              this.toastr.error(err);
            }
          )
       }
    
    objMoe=[];
    selected=-1;
    onChange(row){  
      this.objMoe=[];     
      this.objMoe.push(row);
    }
    SubmitMOE() {
        this.openWfPopup()
    }

    openWfPopup() {
        console.log(this.objMoe[0])
        // const headerDetails = this.objMoe[0];
        // const headerJson = [
        //   { label: 'GSTN', value: headerDetails.gstin_TMPID_NO },
        //   { label: 'Party Name', value: headerDetails.party_NAME },
        //   { label: 'Amount(₹)', value: headerDetails.rbi_AMOUNT }
        // ];
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
        const dialogRef = this.dialog.open(MoeCommonPopupComponent, {
            width: '700px',
            height: '500px',
            data: {
                menuModuleName: 'MOE',
                headingName: 'MOE',
                // headerJson: headerJson,
                trnId: [482], //43
                moduleInfo: moduleInfo,
                // headerDetails.referanceNo ? headerDetails.referanceNo :
                refNo: '',
                //headerDetails.referanceDate ? headerDetails.referanceDate :
                refDate: '',
                conditionUrl: '',
                isAttachmentTab: false // for Attachment tab visible it should be true
            }
        });

        dialogRef.afterClosed().subscribe(wfData => {
            console.log(wfData);
            if (wfData !== 'no') {
              this.SubmitMOElist();
            }
        });
    }

  }

// generate mode dialog
const ELEMENT_DATA1: BranchHamApping[] = [
    {
        branchName: 'Receipt Branch 1',
        branch: 'HA'
    }
];

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'generate-mode-dialog',
    templateUrl: 'generate-mode-dialog.html'
})
export class GSTDialogComponent {
    constructor(private router: Router, public dialogRef: MatDialogRef<GSTDialogComponent>) {}
    ELEMENT_DATA: GenerateMoeEntry[] = [
        {
            status: 'Forwarded',
            gstIN: '4254432',
            mOEAmount: '550.00',
            cin: '4654651',
            mOEType: 'MOE',
            partyName: 'A K Mehta',
            rbiAmount: '500.00',
            gstAmount: '500.00',
            bank: 'State Bank Of India',
            govCreditDate: '12-Feb-20',
            paymentDate: '19-Dec-19',
            moeRaisedDate: '19-Dec-19',
            remarks: 'Created'
        }
    ];
    // table source
    newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    newdisplayedColumns: string[] = [
        'srNo',
        'gstIN',
        'partyName',
        'cin',
        'paymentDate',
        'gstAmount',
        'rbiAmount',
        'mOEType',
        'bank',
        'mOEAmount',
        'bank',
        'govCreditDate',
        'remarks',
        'newaction'
    ];
    vitocancel(): void {
        this.dialogRef.close();
    }
}
