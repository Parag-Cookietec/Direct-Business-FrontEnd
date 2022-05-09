import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-listing';
import { Note1, Note2, CoInsuranceDetails, EquipmentDetails } from '../../models/doiModel';

@Component({
  selector: 'app-electronic-equip-policy',
  templateUrl: './electronic-equip-policy.component.html',
  styleUrls: ['./electronic-equip-policy.component.css']
})
export class ElectronicEquipPolicyComponent implements OnInit {
  errorMessage = doiMessage;
  isTokentable = false;
  isTokentableOPEN = false;
  todayDate = new Date();
  policyTypeForm: FormGroup;
  paymentDetailsForm: FormGroup;
  premiumDetailsForm: FormGroup;
  bankbranchCtrl: FormControl = new FormControl();
  paymentTypeCtrl: FormControl = new FormControl();
  bankCtrl: FormControl = new FormControl();
  paymentModetrl: FormControl = new FormControl();
  proposalTypeCtrl: FormControl = new FormControl();
  businessTypeCtrl: FormControl = new FormControl();
  selectCodeCtrl: FormControl = new FormControl();
  previouslyHeldInsuranceCtrl: FormControl = new FormControl();
  policyYearCtrl: FormControl = new FormControl();
  policyTypeCtrl: FormControl = new FormControl();
  proposalDeclinedCtrl: FormControl = new FormControl();
  coInsuranceTypeCtrl: FormControl = new FormControl();
  gicSubsidiaryEmployeeCtrl: FormControl = new FormControl();
  breakDownCtrl: FormControl = new FormControl();
  maintenanceAgreementCtrl: FormControl = new FormControl();
  firePolicyCtrl: FormControl = new FormControl();
  manufacturerTrainedCtrl: FormControl = new FormControl();
  compulsoryExcessIndemnityCtrl: FormControl = new FormControl();


  policyTypeValCtrl: FormControl = new FormControl();
  letterProposalCttrl: FormControl = new FormControl();
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

  letterProposalList: ListValue[] = [
    { value: '1', viewValue: '19-20/DOI/12345' },
    { value: '2', viewValue: '19-20/DOI/6783' },
  ];
  policyTypeList: ListValue[] = [
    { value: '1', viewValue: 'New' },
    { value: '2', viewValue: 'Renewal' },
    { value: '3', viewValue: 'Endrosment' },
  ];


  proposalTypeList: ListValue[] = [
    { value: '1', viewValue: 'New Policy' },
    { value: '2', viewValue: 'Renewal' },
    { value: '3', viewValue: 'Endorsement' },
    { value: '4', viewValue: 'Declaration' },
  ];
  businessTypeList: ListValue[] = [
    { value: '1', viewValue: 'Block/Tied' },
    { value: '2', viewValue: 'Organised' },
    { value: '3', viewValue: 'Pubklic Sector' },
  ];
  selectCodeList: ListValue[] = [
    { value: '1', viewValue: 'Industry' },
    { value: '2', viewValue: 'Spl. Client' },
    { value: '3', viewValue: 'Dev. Officer' },
    { value: '4', viewValue: 'Agent' },
  ];
  previouslyHeldInsuranceList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  policyYearList: ListValue[] = [
    { value: '1', viewValue: '2011' },
    { value: '2', viewValue: '2012' },
    { value: '3', viewValue: '2013' },
    { value: '4', viewValue: '2014' },
    { value: '5', viewValue: '2015' },
    { value: '6', viewValue: '2016' },
    { value: '7', viewValue: '2017' },
    { value: '8', viewValue: '2018' },
    { value: '9', viewValue: '2019' },
    { value: '10', viewValue: '2020' },
  ];
  policyTypeValList: ListValue[] = [
    { value: '0', viewValue: 'Standard Fire & Special Perils Policy Schedule' },
    { value: '1', viewValue: 'Burglary & Housebreaking Policy' },
    { value: '2', viewValue: 'Electronics Equipment/Material Damage Schedule' },
    { value: '3', viewValue: 'Case-In-Transit Insurance' },
    { value: '4', viewValue: 'Terrorism Pool Insurance' }
  ];
  proposalDeclinedList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];

  coInsuranceTypeList: ListValue[] = [
    { value: '1', viewValue: 'Incoming' },
    { value: '2', viewValue: 'Outgoing' },
    { value: '3', viewValue: 'None' },
  ];

  gicSubsidiaryEmployeeList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];

  breakDownList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];

  maintenanceAgreementList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];

  firePolicyList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];

  manufacturerTrainedList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  paymentMode_list: ListValue[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' },
    { value: '3', viewValue: 'Treasury' },
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
  paymentTypeList: any[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' }
  ];
  compulsoryExcessIndemnityList: ListValue[] = [
    { value: '1', viewValue: '04 Days' },
    { value: '2', viewValue: '04 Days' },
    { value: '3', viewValue: '14 Days' },
    { value: '4', viewValue: '28 Days' },
  ];


  note1List: Note1[] = [
    {
      column1: 'For Value upto Rs. One Lac', column2: 'For Value above Rs. One Lac'
    },
    {
      column1: 'Equipment 5% of Claim Amount (Minm. Rs. 1000/-)', column2: 'Equipment-5% of Claim Amount (Minm. Rs. 250/-)'
    },
    {
      column1: 'Winchester Drive- 10% of Claim Amt.(Minm. Rs. 2500/-)', column2: 'Winchester Drive- 25% of Claim Amt.(Minm. Rs. 10000/-)'
    }
  ];

  note2List: Note2[] = [
    {
      column1: 'Voluntary High Excess, as Multipies of',
      column2: '2 times',
      column3: '5 times',
      column4: '10 times',
      column5: '20 times',
    },
    {
      column1: 'Tariff excess minimum amount as above ',
      column2: '',
      column3: '',
      column4: '',
      column5: '',
    },
    {
      column1: 'Discount for higher Excess opted.',
      column2: '10%',
      column3: '20%',
      column4: '30%',
      column5: '30%',
    }
  ];

  displayedColumns: string[] = [
    'particulars',
    'oic',
    'uii',
    'nia',
    'other',
  ];
  elementData: CoInsuranceDetails[] = [
    {
      particulars: '% of Share',
      oic: '',
      uii: '',
      nia: '',
      other: '',
    },
    {
      particulars: 'Office Code',
      oic: '',
      uii: '',
      nia: '',
      other: '',
    },
    {
      particulars: '(To be given by U/w Office)',
      oic: '',
      uii: '',
      nia: '',
      other: ''
    }
  ];
  dataSourceCoInsuranceDetails = new MatTableDataSource<CoInsuranceDetails>(this.elementData);


  displayedColumnsEquipment: string[] = [
    'details',
    'quantity',
    'description',
    'yearOfManufacture',
    'equipmentHiredPurchased',
    'sumInsured',
    'excessAsOfClaimAmount',
    'action',
  ];

  displayedColumnsEquipment1: string[] = [
    'details1',
    'quantity1',
    'description1',
    'yearOfManufacture1',
    'equipmentHiredPurchased1',
    'sumInsured1',
    'excessAsOfClaimAmount1',
    'action1',
  ];

  elementData1: EquipmentDetails[] = [
    {
      details: '',
      quantity: '',
      description: '',
      yearOfManufacture: '',
      equipmentHiredPurchased: '',
      sumInsured: '',
      excessAsOfClaimAmount: '',
    },
    {
      details: '',
      quantity: '',
      description: '',
      yearOfManufacture: '',
      equipmentHiredPurchased: '',
      sumInsured: '',
      excessAsOfClaimAmount: '',
    },
    {
      details: '',
      quantity: '',
      description: '',
      yearOfManufacture: '',
      equipmentHiredPurchased: '',
      sumInsured: '',
      excessAsOfClaimAmount: '',
    },
  ];
  dataSourceEquipmentDetails = new MatTableDataSource<EquipmentDetails>(this.elementData1);

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
    this.policyTypeForm = this.fb.group({
      policyTypeVal: [''],
      letterProposal: [''],
      proposalDate: [''],
      policyNoVal: ['19-20/DOI/12345'],
      policyDate: [''],
      proposalType: [''],
      businessType: [''],
      codeType: [''],
      codeValue: [''],
      previouslyHeldInsurance: [''],
      policyYear: [''],
      policyNo: [''],
      policyType: [''],
      nameOfPreviousInsuranceCo: [''],
      addressOfPreviousInsuranceCo: [''],
      expiryDate: [''],
      declinedProposal: [''],
      detailsForDeclinedProposal: [''],
      coInsuranceType: [''],
      gicSubsidiaryEmployee: [''],
      salaryRollNo: [''],
      equipmentLocation: [''],
      breakDown: [''],
      equipmentName: [''],
      equipmentNameMaintenance: [''],
      maintenanceAgreement: [''],
      firePolicy: [''],
      policyNoFireInsurance: [''],
      insurerName: [''],
      manufacturerTrained: [''],
      substituteequipmentRent: [''],
      indemnityPerOccurence: [''],
      upperLimitPerOccurance: [{ value: '', disabled: true }],
      aggregateIndemnity: [''],
      personalExpenses: [''],
      materialsTransportationCost: [''],
      totalSumInsured: [{ value: '', disabled: true }],
      compulsoryExcessIndemnity: [''],
      noOfMonth: [''],
      fromDate: [''],
      riReq: [''],
      toDate: ['']

    });
    this.paymentDetailsForm = this.fb.group({
      challanNo: [{ value: '12345', disabled: true }],
      challanDate: [{ value: new Date('05/11/2019'), disabled: true }],
      premiumAmount: [{ value: '17,70,000', disabled: true }],
      bankName: [{ value: 'State Bank Of India', disabled: true }],
      chequeDate: [{ value: new Date('05/10/2019'), disabled: true }],
      chequeNo: [{ value: '76890', disabled: true }],
      paymentType: [{ value: 'Cheque', disabled: true }],
      paymentDate: [{ value: new Date('05/10/2019'), disabled: true }],
    });

    this.premiumDetailsForm = this.fb.group({
      typeofbuildingUse: [''],
      wall: [''],
      cellinf: [''],
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
      sumInsured: [''],
      term: [''],
      insurance: [''],
      paymentMode: [''],
      dateCheque: [''],
      ddZNo: [''],
      banName: [''],
      bankBranch: [''],
      receiptNo: [''],
      receiptDate: [''],
      challanNo: [''],
      challanDate: [''],
      challaAmount: [''],
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

  upperLimit() {
    let value = 0;
    value = Number(this.policyTypeForm.controls.substituteequipmentRent.value) * Number(this.policyTypeForm.controls.indemnityPerOccurence.value);

    return value;
  }

  totalSumImsuredValue() {

    let value = 0;
    if (this.policyTypeForm.value.aggregateIndemnity !== '' || this.policyTypeForm.value.personalExpenses !== '' || this.policyTypeForm.value.materialsTransportationCost !== '') {
      value = (Number(this.upperLimit())
        + Number(this.policyTypeForm.value.aggregateIndemnity)
        + Number(this.policyTypeForm.value.personalExpenses)
        + Number(this.policyTypeForm.value.materialsTransportationCost)
      );

    }
    return value;
  }

  // add new row
  addColumn() {
    const p_data = this.dataSourceEquipmentDetails.data;
    p_data.push({
      details: '',
      quantity: '',
      description: '',
      yearOfManufacture: '',
      equipmentHiredPurchased: '',
      sumInsured: '',
      excessAsOfClaimAmount: '',
    });
    this.dataSourceEquipmentDetails.data = p_data;
  }

  deleteColumn(index) {
    this.dataSourceEquipmentDetails.data.splice(index, 1);
    this.dataSourceEquipmentDetails.data = this.dataSourceEquipmentDetails.data;
  }

  onSubmit() {

  }

  resetForm() {
    this.policyTypeForm.reset();
  }
  ontoken(index) {
    if (index.value === '3') {
      this.isTokentable = true;
      this.policyTypeForm.patchValue({
        challanNo: '1856',
        challanDate: new Date('07/18/2020'),
        challaAmount: '10000.00'
      });
    } else {
      this.isTokentable = false;
    }
    if (index.value === '2' || index.value === '1') {
      this.isTokentableOPEN = true;
      this.policyTypeForm.patchValue({
        receiptNo: '11246254',
        receiptDate: new Date('07/17/2020'),
      });

    } else {
      this.isTokentableOPEN = false;
    }
  }

  setFieldVal() {
    
  }
}
