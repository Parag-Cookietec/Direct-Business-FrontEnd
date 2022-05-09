import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-listing';

@Component({
  selector: 'app-avaiation-proposal',
  templateUrl: './avaiation-proposal.component.html',
  styleUrls: ['./avaiation-proposal.component.css']
})
export class AvaiationProposalComponent implements OnInit {
  errorMessage = doiMessage;
  dispOthers = false;
  isTokentable = false;
  isTokentableOPEN = false;
  bankbranchCtrl: FormControl = new FormControl();
  paymentModetrl: FormControl = new FormControl();
  bankCtrl: FormControl = new FormControl();
  todayDate = new Date();
  aviationForm: FormGroup;
  paymentDetailsForm: FormGroup;
  premiumDetailsForm: FormGroup;
  descriptionOfPremisesCtrl: FormControl = new FormControl();
  soleOccupierCtrl: FormControl = new FormControl();
  premisesLeftUnOccupiedCtrl: FormControl = new FormControl();
  burglaryRasistingSafesCtrl: FormControl = new FormControl();
  wallFixedFloorCtrl: FormControl = new FormControl();
  stockSalesBookCtrl: FormControl = new FormControl();
  premisesRoberryAttemptCtrl: FormControl = new FormControl();
  robberyLossClaimCtrl: FormControl = new FormControl();
  previouslyProposedInsuranceCtrl: FormControl = new FormControl();
  proposalAcceptedCtrl: FormControl = new FormControl();
  renewalAcceptanceCtrl: FormControl = new FormControl();
  increasedRateCtrl: FormControl = new FormControl();
  paymentTypeCtrl: FormControl = new FormControl();


  riskCovCtrl: FormControl = new FormControl();
  riReqCtrl: FormControl = new FormControl();
  directiveObj = new CommonDirective();
  treasuryName_list: ListValue[] = [
    { value: '1', viewValue: 'District Treasury Office, Gandhinagar' }
  ];

  treasuryNameCtrl: FormControl = new FormControl();


  riReqList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];



  descriptionOfPremisesList: ListValue[] = [
    { value: '1', viewValue: 'Shop' },
    { value: '2', viewValue: 'Warehouse' },
    { value: '3', viewValue: 'Factory' },
  ];
  soleOccupierList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  premisesLeftUnOccupiedList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];

  burglaryRasistingSafesList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];

  wallFixedFloorList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  paymentTypeList: any[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' }
  ];

  stockSalesBookList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  premisesRoberryAttemptList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  robberyLossClaimList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  previouslyProposedInsuranceList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  proposalAcceptedList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  renewalAcceptanceList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  increasedRateList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  bankbranch_list: ListValue[] = [
    { value: '1', viewValue: 'AXIS BOTAD [GJ] ' },
    { value: '2', viewValue: 'BOB ARM,AHMEDABAD' },
    { value: '3', viewValue: 'BOI MID CORPORATE' },
    { value: '4', viewValue: ' FEDERAL BANK VASNA IYAVA' },
    { value: '5', viewValue: 'HDFC Bavla' },
    { value: '6', viewValue: 'ICICI Ambawadi' },
    { value: '7', viewValue: 'IDFC Prahladnagar' },
    { value: '8', viewValue: ' KOTAK MAHINDRA PRAHALADNAGAR BRANCH' },
    { value: '9', viewValue: ' PNB Ahmedabad Vanijya Bhavan' },
    { value: '10', viewValue: 'PNB Ahmedabad Vanijya Bhavan' },
    { value: '11', viewValue: 'SBI AKHBARNAGAR CHAR RASTA, AHMEDABAD' },
  ];
  bank_list: ListValue[] = [
    { value: '1', viewValue: 'Bank of Baroda    ' },
    { value: '2', viewValue: 'Bank of India' },
    { value: '3', viewValue: 'Canara Bank' },
    { value: '4', viewValue: ' Central Bank of India' },
    { value: '5', viewValue: 'Indian Bank' },
    { value: '6', viewValue: 'Indian Overseas Bank' },
    { value: '7', viewValue: 'Punjab National Bank' },
    { value: '8', viewValue: ' State Bank of India' },
    { value: '9', viewValue: ' Union Bank of India' },
    { value: '10', viewValue: 'Axis Bank' },
    { value: '11', viewValue: 'HDFC Bank' },
    { value: '12', viewValue: 'ICICI Bank' },
    { value: '13', viewValue: 'IDBI Bank' },
    { value: '14', viewValue: 'IDFC First Bank' },
    { value: '15', viewValue: ' IndusInd Bank' },
    { value: '16', viewValue: 'Jammu & Kashmir Bank ' },
    { value: '17', viewValue: 'Karnataka Bank' },
    { value: '18', viewValue: 'Karur Vysya Bank' },
    { value: '19', viewValue: ' South Indian Bank' },
    { value: '20', viewValue: ' Tamilnad Mercantile Bank' },
    { value: '20', viewValue: 'Axis Bank' },
    { value: '21', viewValue: 'Yes Bank' },
  ];
  paymentMode_list: ListValue[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' },
    { value: '3', viewValue: 'Treasury' },
  ];
  riskCovList: ListValue[] = [
    { value: '1', viewValue: 'HULL ALL RISKS' },
    { value: '2', viewValue: 'HULL WAR RISKS' },
    { value: '3', viewValue: 'PLL' },
    { value: '4', viewValue: 'TPL' },
    { value: '5', viewValue: 'Others' },
  ];

  displayedColumns1: string[] = [
    'makeType',
    'seriesNo',
    'yearConst',
    'yearPur',
    'seat',
    'idMark',
    'noOfEng',
    'type',
    'action',
  ];
  aelementData: any[] = [
    {
      makeType: '',
      seriesNo: '',
      yearConst: '',
      yearPur: '',
      seat: '',
      idMark: '',
      noOfEng: '',
      type: '',
    }
  ];
  dataSource1 = new MatTableDataSource<any>(this.aelementData);

  displayedColumnsRi: string[] = [
    'riCompName',
    'riOff',
    'riShare',
    'riAmt',
    'action',
  ];
  elementDataRi: any[] = [
    {
      riCompName: '',
      riOff: '',
      riShare: '',
      riAmt: '',
      action: '',
    }
  ];
  dataSourceRi = new MatTableDataSource<any>(this.elementDataRi);
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.aviationForm = this.fb.group({
      prevPolNo: [''],
      proposerName: [''],
      address: [''],
      phoneNo: [''],
      emailId: [''],
      insuranceFromDate: [''],
      insuranceToDate: [''],
      aircraftStd: [''],
      totAggVal: [''],
      appDed: [''],
      tpl: [''],
      pll: [''],
      crewPa: [''],
      riskCov: [''],
      otherRisk: [''],
      pilWarr: [''],
      purpAircraft: [''],
      geoLimit: [''],
      riReq: [''],

      sumInsured: [''],
      rate: [''],
      discpPerc: [''],
      loadCha: [''],
      loadAmt: [''],
      totAddPre: [''],
      totPre: [''],
      gstPerc: [''],
      payPre: [''],
      discAmt: [''],
      gstAmt: [''],
      insurance: [''],
    });

    this.premiumDetailsForm = this.fb.group({
      typeofbuildingUse: [''],
      wall: [''],
      cellinf: [''],
      paymentMode: [''],
      dateCheque: [''],
      ddZNo: [''],
      banName: [''],
      bankBranch: [''],
      challanDate1: [''],
      challanNo: [{ value: '12345', disabled: true }],
      chaAmount: [{ value: '12345.00', disabled: true }],
      challanDate: [{ value: new Date('05/11/2019'), disabled: true }],
      paymentDate: [{ value: new Date('05/10/2019'), disabled: true }],
      treasuryName: [''],
    });
  }
  addColumnRI() {
    const data = this.dataSourceRi.data;
    data.push({
      riskLocation: '',
      address: '',
      pinCode: '',
    });
    this.dataSourceRi.data = data;
  }

  deleteColumnRI(dataSourceRi, index) {
    dataSourceRi.data.splice(index, 1);
    dataSourceRi.data = dataSourceRi.data;
  }

  ontoken(index) {
    if (index.value === '3') {
      this.isTokentable = true;
      this.aviationForm.patchValue({
        challanNo: '1856',
        challanDate: new Date('07/18/2020'),
        challaAmount: '10000.00'
      });
    } else {
      this.isTokentable = false;
    }
    if (index.value === '2' || index.value === '1') {
      this.isTokentableOPEN = true;
      this.aviationForm.patchValue({
        receiptNo: '11246254',
        receiptDate: new Date('07/17/2020'),
      });

    } else {
      this.isTokentableOPEN = false;
    }
  }



  total = (sumInsured, ratePercent): Number => { return (sumInsured * ratePercent / 100) }

  riskVal() {
    this.dispOthers = false;
    const temp = this.aviationForm.controls.riskCov.value;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === '5') {
        this.dispOthers = true;
      }
    }

  }

  addColumn() {
    const data = this.dataSource1.data;
    data.push({
      makeType: '',
      seriesNo: '',
      yearConst: '',
      yearPur: '',
      seat: '',
      idMark: '',
      noOfEng: '',
      type: '',
    });
    this.dataSource1.data = data;
  }

  deleteColumn(dataSource, index) {
    dataSource.data.splice(index, 1);
    dataSource.data = dataSource.data;
  }
  setFieldVal() {
    
  }
}
