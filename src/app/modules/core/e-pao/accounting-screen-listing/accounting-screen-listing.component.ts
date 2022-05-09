import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { AcountScreen, ListValue } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChallanAccountingService } from '../services/Challan-Accounting/challan-accounting.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/modules/services/common.service';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';
import { CommonListing } from '../../common/model/common-listing';
import { BankRateMasterService } from '../services/bank-rate-master/bank-rate-master.service';

@Component({
  selector: 'app-accounting-screen-listing',
  templateUrl: './accounting-screen-listing.component.html',
  styleUrls: ['./accounting-screen-listing.component.css']
})
export class AccountingScreenListingComponent implements OnInit {
 
  statusList: CommonListing[] = [
    {
      value: '1', viewValue: 'Draft'
    },
    { value: '2', viewValue: 'Verified' },
    { value: '3', viewValue: 'Approved' },
  ];
   // FormGroup
   ELEMENT_DATA: AcountScreen[] = [];
  //   {
  //     status: 'Forwarded',
  //     cin: '4254432',
  //     amount: '10000.00',
  //     partyName: 'A K Mehta',
  //     govCreditDate: '12-Feb-20',
  //     scrollDate: '19-Dec-19',
  //     paymentDate: '19-Dec-19',
  //     remarks: '-'
  //   },
  //   {
  //     status: 'Draft',
  //     cin: '4254432',
  //     amount: '10000.00',
  //     partyName: 'A K Mehta',
  //     govCreditDate: '12-Feb-20',
  //     scrollDate: '19-Dec-19',
  //     paymentDate: '19-Dec-19',
  //     remarks: '-'
  //   },
  //   {
  //     status: 'Verified',
  //     cin: '4254432',
  //     amount: '10000.00',
  //     partyName: 'A K Mehta',
  //     govCreditDate: '12-Feb-20',
  //     scrollDate: '19-Dec-19',
  //     paymentDate: '19-Dec-19',
  //     remarks: '-'
  //   },
  // ];
  accountScreenForm: FormGroup;
  maxDate = new Date();
  todayDate = new Date();
  // FormControl
  bankCtrl: FormControl = new FormControl();
  typeCtrl: FormControl = new FormControl();
  statusCtrl: FormControl = new FormControl();
  status_list: ListValue[] = [];
  bank_list: ListValue[] = [];
  type_list: ListValue[] = [];
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  newdisplayedColumns: string[] = ['cin', 'govCreditDate', 'amount', 'scrollDate', 'paymentDate', 'partyName',
    'remarks', 'status', 'newaction'];

    TypeList = "Account_Screen_Type_List";
  menuId: any;
  lkPoOffUserId: any;
  selectedStatusText: any;
  wfRoleId: any;
  
  constructor( private bankRateMasterService: BankRateMasterService,private router: Router, public dialog: MatDialog, private commonService:CommonService,    private commonWorkflowService: CommonWorkflowService,
    private fb: FormBuilder,private challanaccountingservice:ChallanAccountingService, private toastr: ToastrService) { }
  directiveObject = new EPaoDirectives(this.router, this.dialog);
  public errorMessages;
  ngOnInit() {
  
    this.errorMessages = EPOAMessage;
    this.accountScreenData();
    this.fetchTypeLists();
    this.getBank();
    this.getStatusList();
    this.menuId = this.commonService.getMenuId();
    this.commonWorkflowService.getCurrentUserDetail().then(res => {
      if (res) {
        console.log(res)
          this.lkPoOffUserId = res['lkPoOffUserId'];
          this.wfRoleId =res['wfRoleId'][0];
          console.log(this.wfRoleId)
          // this.fetchChallanListOnLoad();
          if( this.lkPoOffUserId){
            this.fetchChallanListOnLoad();
            this.fetchChallanList();
          }
      }
    });

  }
  accountScreenData() {
    this.accountScreenForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      babk: [''],
      type: [''],
      status: ['']
    });

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


  // Navigation
  viewNavigate(element) {
    this.router.navigate(['./dashboard/e-pao/account-screen'], { state: { 'id': element.id, 'accountHdrId': element.accountHdrId, 'type': 'view', 'status': element.status, 'data' : null }});
  }

  // Navigation
  navigate(element) {
    this.router.navigate(['./dashboard/e-pao/account-screen'], { state: { 'id': element.id, 'accountHdrId': element.accountHdrId, 'type': 'edit', 'status': element.status, 'data': this.newdataSource.data.filter(i=>i.id !== element.id && i.status ==='Draft')}});
  }

  scrollData() {
    this.accountScreenForm = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }
  StatusChanged(event){
    this.selectedStatusText = event.source.selected.viewValue;
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

    fetchChallanList() {
    let jsonObj = [];
      jsonObj.push({
        "key": "fromDate",
        "value": this.accountScreenForm.value.fromDate ? this.accountScreenForm.value.fromDate :''
      });
      jsonObj.push({
        "key": "toDate",
        "value": this.accountScreenForm.value.toDate? this.accountScreenForm.value.toDate :''
      });

      jsonObj.push({
        "key": "bankId",
        "value": this.accountScreenForm.value.babk? this.accountScreenForm.value.babk :''
      });
      jsonObj.push({
        "key": "type",
        "value": this.accountScreenForm.value.type? this.accountScreenForm.value.type :''
      });
      jsonObj.push({
        "key": "pouId",
        "value": this.lkPoOffUserId 
      });
      jsonObj.push({
        "key": "menuId",
        "value": this.menuId
      });
      jsonObj.push({
        key: "status",
        value: this.accountScreenForm.value.status || ""
      });
      jsonObj.push({
        key: "wfStatus",
        value: this.selectedStatusText || ""
      });
      jsonObj.push({
        "key": "isSearch",
        "value": 0
      });
      
      // jsonObj.push({
      //   "key": "entryStatusId",
      //   "value": this.accountScreenForm.value.status ? parseInt(this.accountScreenForm.value.status) : ''
      // });

    let obj = {
      "pageIndex": 0,
      "pageElement":250,
      "jsonArr": jsonObj
    }

    this.challanaccountingservice.FetchChallanAccountingList(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
         // this.type_list = res['result'];
          this.ELEMENT_DATA = res['result']['result'];
          console.log( this.ELEMENT_DATA )
          this.newdataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  
  fetchChallanListOnLoad() {
    let jsonObj = [];
    jsonObj.push({
      "key": "fromDate",
      "value": this.accountScreenForm.value.fromDate ? this.accountScreenForm.value.fromDate :''
    });
    jsonObj.push({
      "key": "toDate",
      "value": this.accountScreenForm.value.toDate? this.accountScreenForm.value.toDate :''
    });

    jsonObj.push({
      "key": "bankId",
      "value": this.accountScreenForm.value.babk? this.accountScreenForm.value.babk :''
    });
    jsonObj.push({
      "key": "type",
      "value": this.accountScreenForm.value.type? this.accountScreenForm.value.type :''
    });
    jsonObj.push({
      "key": "pouId",
      "value": this.lkPoOffUserId 
    });
    jsonObj.push({
      "key": "menuId",
      "value": this.menuId
    });
    jsonObj.push({
      key: "status",
      value: ''
    });
    jsonObj.push({
      key: "wfStatus",
      value: 'Draft'
    });
    jsonObj.push({
      "key": "isSearch",
      "value": 0
    });
    
    // jsonObj.push({
    //   "key": "entryStatusId",
    //   "value": this.accountScreenForm.value.status ? parseInt(this.accountScreenForm.value.status) : ''
    // });

  let obj = {
    "pageIndex": 0,
    "pageElement":250,
    "jsonArr": jsonObj
  }


    this.challanaccountingservice.FetchChallanAccountingList(obj).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
         // this.type_list = res['result'];
          this.ELEMENT_DATA = res['result']['result'];
          console.log( this.ELEMENT_DATA )
          this.newdataSource = new MatTableDataSource(this.ELEMENT_DATA);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  clearForm() {   
    this.ELEMENT_DATA=[];
    this.newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    this.accountScreenForm.reset();
    this.selectedStatusText ="";
  }
  
  fetchTypeLists() {
    let obj = {
      "name": this.TypeList
    };
    this.challanaccountingservice.GetLookupValues(obj).subscribe(
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
}
