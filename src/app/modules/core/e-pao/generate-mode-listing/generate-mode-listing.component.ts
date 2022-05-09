import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ListValue } from 'src/app/models/common-grant';
import { GenerateMoe } from 'src/app/models/e-pao/epaoModel';
import { MoeService } from '../services/moe/moe.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/modules/services/common.service';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';
type NewType = GenerateMoe;


//   {
//     status: 'Forwarded',
//     gstIN: '4254432',
//     mOEAmount: '550.00',
//     cin: '4654651',
//     mOEType: 'MOE',
//     partyName: 'A K Mehta',
//     rbiAmount: '500.00',
//     gstAmount: '500.00',
//     bank: 'Branch 1',
//     govCreditDate: '12-Feb-20',
//     paymentDate: '19-Dec-19',
//     remarks: '-'
//   },
// ];

@Component({
  selector: 'app-generate-mode-listing',
  templateUrl: './generate-mode-listing.component.html',
  styleUrls: ['./generate-mode-listing.component.css']
})
export class GenerateModeListingComponent implements OnInit {
  ELEMENT_DATA: NewType[] = [];
  // FormGroup
  generateMoeForm: FormGroup;
  // DAte
  maxDate = new Date();
  todayDate = new Date();
  // FormControl
  bankCtrl: FormControl = new FormControl();
  typeCtrl: FormControl = new FormControl();
  bank_list: ListValue[] = [];
  //    {
  //    // List
  //    value: '1', viewValue: ' State Bank Of India',
  //  },
  //  {
  //    value: '2', viewValue: 'Bank Of Baroda',
  //  }
  //    ,
  //  {
  //    value: '2', viewValue: 'HDFC Bank',
  //  }
  //  ];
  //  type_list: ListValue[] = [{
  //    value: '1', viewValue: ' RAT Clear',
  //  },
  //  {
  //    value: '2', viewValue: 'MOE Resolution',
  //  }
  //  ];
  // Table Source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'gstIN', 'partyName', 'cin', 'paymentDate', 'gstAmount',
    'rbiAmount', 'mOEType', 'bank', 'mOEAmount', 'govCreditDate', 'remarks', 'newaction'];
  menuId: any;
  lkPoOffUserId: any;
  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder,
    private moeservice: MoeService, private toastr: ToastrService, private commonService: CommonService, private commonWorkflowService: CommonWorkflowService,) { }

  ngOnInit() {

    this.generateMoeData();
    this.getBank();
    this.menuId = this.commonService.getMenuId();
    this.commonWorkflowService.getCurrentUserDetail().then(res => {
      if (res) {
        this.lkPoOffUserId = res['lkPoOffUserId'];
      }
    });
  }
  generateMoeData() {
    this.generateMoeForm = this.fb.group({
      paymentDate: [''],
      gcDate: [''],
      bank: [''],
      cin: [''],
      gstin: [''],
      partyName: [''],
      gstAmount: [''],
      rbiAmount: [''],
      moeType: [''],
      amuntType: [''],
      remarks: ['']
    });

  }

  getBank() {
    //value.branchId = this.getBranchId();
    this.moeservice.GetBankList().subscribe(
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
  fetchMOEList() {
    let jsonObj = [];

    jsonObj.push({
      "key": "fromDate",
      "value": this.generateMoeForm.value.fromDate ? this.generateMoeForm.value.fromDate : ''
    });
    jsonObj.push({
      "key": "toDate",
      "value": this.generateMoeForm.value.toDate ? this.generateMoeForm.value.toDate : ''
    });

    jsonObj.push({
      "key": "moeRaisedFromDate",
      "value": this.generateMoeForm.value.moeRaisedfromDate ? this.generateMoeForm.value.moeRaisedfromDate : ''
    });

    jsonObj.push({
      "key": "moeRaisedToDate",
      "value": this.generateMoeForm.value.moeRaisedtoDate ? this.generateMoeForm.value.moeRaisedtoDate : ''
    });

    jsonObj.push({
      "key": "bankId",
      "value": this.generateMoeForm.value.babk ? this.generateMoeForm.value.babk : ''
    });


    jsonObj.push({
      "key": "GSTIN_TMPID_NO",
      "value": this.generateMoeForm.value.gstin ? this.generateMoeForm.value.gstin : ''
    });

    jsonObj.push({
      "key": "CPIN_NO",
      "value": this.generateMoeForm.value.ctin ? this.generateMoeForm.value.ctin : ''
    });

    jsonObj.push({
      "key": "CIN_NO",
      "value": this.generateMoeForm.value.cin ? this.generateMoeForm.value.cin : ''
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
      "key": "isSearch",
      "value": 0
    });
    let obj = {
      "pageIndex": 0,
      "pageElement": 250,
      "jsonArr": jsonObj
    }
    console.log(obj)
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

  clearForm() {
    this.newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    this.generateMoeForm.reset();
  }

  onEdit(id) {
    this.router.navigate(['./dashboard/e-pao/generate-moe'], id);
  }

}
