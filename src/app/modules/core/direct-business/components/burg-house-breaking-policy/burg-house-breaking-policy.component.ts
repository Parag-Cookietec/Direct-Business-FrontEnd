import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-listing';
import { BurglaryHouseBreaking } from '../../models/doiModel';

@Component({
  selector: 'app-burg-house-breaking-policy',
  templateUrl: './burg-house-breaking-policy.component.html',
  styleUrls: ['./burg-house-breaking-policy.component.css']
})
export class BurgHouseBreakingPolicyComponent implements OnInit {
  isTokentable = false;
  isTokentableOPEN = false;
  errorMessage = doiMessage;
  bankbranchCtrl: FormControl = new FormControl();
  paymentModetrl: FormControl = new FormControl();
  coverIncludedCtrl: FormControl = new FormControl();
  coverPlinthFoundationCtrl: FormControl = new FormControl();
  bankCtrl: FormControl = new FormControl();
  todayDate = new Date();
  burglaryHouseBreakingPolicyForm: FormGroup;
  standardFirePolicyForm: FormGroup;
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


  policyTypeCtrl: FormControl = new FormControl();
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

  coverIncludedList: ListValue[] = [
    { value: '1', viewValue: 'Flood' },
    { value: '2', viewValue: 'Cyclone' },
    { value: '3', viewValue: 'Group of Perils' },
    { value: '4', viewValue: 'Riot' },
    { value: '5', viewValue: 'Strike & Malicious damage' },
    { value: '6', viewValue: 'Terrorism' },
  ];
  coverPlinthFoundationList: ListValue[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  paymentMode_list: ListValue[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' },
    { value: '3', viewValue: 'Treasury' },
  ];
  displayedColumns: string[] = [
    'particulars',
    'sumInsured',
    'ratePercent',
    'premium',
  ];
  elementData: BurglaryHouseBreaking[] = [
    {
      particulars: 'Stock-in trade',
      sumInsured: null,
      ratePercent: null,
      premium: null,
    },
    {
      particulars: 'Goods in Trust or on commission for which Proposer is responsible',
      sumInsured: null,
      ratePercent: null,
      premium: null,
    },
    {
      particulars: 'Fixutes, Fittings and utensils-in Trade',
      sumInsured: null,
      ratePercent: null,
      premium: null,
    },
    {
      particulars: 'Cash or valuables whilst contained in locked safe',
      sumInsured: null,
      ratePercent: null,
      premium: null,
    },
  ];

  displayedColumns1: string[] = [
    'riskLocation',
    'address',
    'pinCode',
    'action',
  ];
  aelementData: any[] = [
    {
      riskLocation: '',
      address: '',
      pinCode: '',
    }
  ];
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
  dataSource1 = new MatTableDataSource<any>(this.aelementData);

  dataSource = new MatTableDataSource<BurglaryHouseBreaking>(this.elementData);
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.burglaryHouseBreakingPolicyForm = this.fb.group({
      tradeOfOccupation: [''],
      address: [''],
      descriptionOfPremises: [''],
      soleOccupier: [''],
      otherwiseOccupied: [''],
      stateRentalPerAnnum: [''],
      premisesOccupationDuration: [''],
      premisesLeftUnOccupied: [''],
      unOccupied: [''],
      burglaryRasistingSafes: [''],
      safeMakerName: [''],
      safeCost: [''],
      dimensionOfSafe: [''],
      wallFixedFloor: [''],
      keptHow: [''],
      noOfKeys: [''],
      keyHolder: [''],
      externalDoorSafety: [''],
      frontBackWindows: [''],
      skyLightTrapDoors: [''],
      stockSalesBook: [''],
      stockSalesBookFrequency: [''],
      stockSalesBookNightDeposit: [''],
      premisesRoberryAttempt: [''],
      roberryDate: [''],
      roberryAmountLoss: [''],
      robberyAccessGained: [''],
      robberyPrecautions: [''],
      robberyLossClaim: [''],
      nameOfCompanyForLossClaim: [''],
      previouslyProposedInsurance: [''],
      nameOfCompanyForProposal: [''],
      proposalAccepted: [''],
      renewalAcceptance: [''],
      nameOfPersonDeclinedRenewal: [''],
      increasedRate: [''],
      totalValue: [''],
      fireInsuredStockAmount: [''],
      nameOfCompany: [''],
      total: [''],
      amountPremium: [''],
      riReq: [''],
      unOccupiedHowLong: ['']

    });
    this.standardFirePolicyForm = this.fb.group({
      policyType: [''],
      letterProposal: [''],
      proposalDate: [''],
      policyNo: ['19-20/DOI/12345'],
      policyDate: [''],
      proposerName: [''],
      address: [''],
      phoneNo: [''],
      emailId: [''],
      businessOfProposer: [''],
      firmCapitalPaidUp: [''],
      issuedPolicy: [''],
      insuranceFromDate: [''],
      insuranceToDate: [''],
      coverIncluded: [''],
      coverPlinthFoundation: [''],
      architectsConsulting: [''],
      debrisRemoval: [''],
      detoriationOfStocks: [''],
      forestFire: [''],
      vehicleDamageImpact: [''],
      spontaneousCombustion: [''],
      omission: [''],
      earthquake: [''],
      insuredWithOtherInsuranceCo: [''],
      insuranceCompanyName: [''],
      insuranceCompanyDetails: [''],
      insuredWithOtherInsuranceCoDeclined: [''],
      insuranceCompanyDeclinedDetails: [''],
      residenceOfficeShops: [''],
      industrialManufacturingRisk: [''],
      storageOutsideIndustrialRisk: [''],
      tankGasHolder: [''],
      utilities: [''],
      usedAsShop: [''],
      handledAsPerList: [''],
      stockValue: [''],
      usedAsWarehouse: [''],
      goodsStoredList: [''],
      usedAsIndustrialManufacturingUnit: [''],
      manufacturedProducts: [''],
      factoryState: [''],
      fireProtectionDeviceInstalled: [''],
      basicProposedForInsurance: [''],
      marketValueBasis: [''],
      reinstatementValueBasis: [''],
      materialUsedForWall: [''],
      materialUsedForFloor: [''],
      materialUsedForRoof: [''],
      heightOfBuilding: [''],
      ageOfBuilding: [''],
      floaterBasis: [''],
      amountFloaterBasis: [''],
      declarationBasis: [''],
      amountDeclarationBasis: [''],
      floaterDeclarationBasis: [''],
      amountFloaterDeclarationBasis: [''],
      stocksStoredInOpen: [''],
      locationOfStockInOpen: [''],
      amountStocksStoredInopen: [''],
      trePremium: [''],
      sumInsured: [''],
      district: [''],
      taluka: [''],
      village: [''],
      adharNo: [''],
      mobileNo: [''],
      typeofbuildingUse: [''],
      wall: [''],
      cellinf: [''],
      rate: [''],
      term: [''],
      insurance: [''],
      paymentMode: [''],
      dateCheque: [''],
      ddZNo: [''],
      banName: [''],
      bankBranch: ['']
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
  ontoken(index) {
    if (index.value === '3') {
      this.isTokentable = true;
      this.standardFirePolicyForm.patchValue({
        challanNo: '1856',
        challanDate: new Date('07/18/2020'),
        challaAmount: '10000.00'
      });
    } else {
      this.isTokentable = false;
    }
    if (index.value === '2' || index.value === '1') {
      this.isTokentableOPEN = true;
      this.standardFirePolicyForm.patchValue({
        receiptNo: '11246254',
        receiptDate: new Date('07/17/2020'),
      });

    } else {
      this.isTokentableOPEN = false;
    }
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



  total = (sumInsured, ratePercent): Number => { return (sumInsured * ratePercent / 100) }
  setFieldVal() {
    
  }
}
