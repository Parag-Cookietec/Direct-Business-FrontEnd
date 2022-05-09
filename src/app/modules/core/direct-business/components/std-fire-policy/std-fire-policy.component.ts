import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-listing';
import { FireService } from 'src/app/modules/services/doi/fire.service';
import { ProposerDetails, PartThreePolicyDetails, BuildingWiseValue } from '../../models/doiModel';

@Component({
  selector: 'app-std-fire-policy',
  templateUrl: './std-fire-policy.component.html',
  styleUrls: ['./std-fire-policy.component.css']
})
export class StdFirePolicyComponent implements OnInit {
  errorMessage = doiMessage;
  isTokentable = false;
  isTokentableOPEN = false;
  todayDate = new Date();
  handledAsPerListValue = false;
  architectsConsultingRemark = 'In excess of 3% claim amount';
  debrisRemovalRemark = 'In excess of 1% claim amount';
  usedAsWarehouseRemark = 'Not Located in a manufacturing unit';
  floaterBasisRemark = 'Stocks at various locations (warehouses/godowns and/or open etc,) can be covered on floater basis for a single Sum lnsured';
  declarationBasisRemark = 'Stock which fluctuate in value can be covered on (monthly) declaration basis' + '1. Minimum Sum Insured is Rs.1 Crore, and policy not issued on short period basis' + ' 2. Stocks in process & stocks stored at Railway siding are not covered';
  floaterDeclarationBasisRemark = 'Stock which fluctuate in value as well as stored in various locations can be covered on (monthly) floater declaration basis' + '1. Minimum Sum Insured is Rs.2 Crore' + ' 2. Stocks in process & stocks stored at Railway siding are not covered';
  stocksStoredInOpenRemark = 'Stock in open (located outside the factory compound)';
  stockValueRemark =
    '1. Celluloid goods, 2. Coir Loose, 3. Crackers & Fire works, 4. Explosives of any kind, 5. Hay/Straw' +
    ' 6. Hemp, 7.Jute Loose, 8.Matches, 9. Methylated Spirit, 10. Nitro-Cellulose Plastics, 11' +
    'Oils/Ether/Industrial Solvents and other inflammable liquids flashing at and lelow 32 Deg. C' +
    ' (Closed Cup test), 12 Paints with imflammable havihg Flash point belonr 32 Deg. C. (Closed' +
    'Cup test) - Other tnan in sealed tins on drums; 13. Varnishes having a Flash point below 32 Deg.' +
    'C. (Ctosed Cup test) - -Other than in sealed tins or drums, 14. Disinfectant liquids and liquid' +
    'insecticides - Other than in sealed tins or drums, 15. Vegelable fibres of any kind including Rayon' +
    'Fibre.';
  standardFirePolicyForm: FormGroup;
  paymentDetailsForm: FormGroup;
  premiumDetailsForm: FormGroup;
  bankbranchCtrl: FormControl = new FormControl();
  bankCtrl: FormControl = new FormControl();
  paymentModetrl: FormControl = new FormControl();
  coverIncludedCtrl: FormControl = new FormControl();
  coverPlinthFoundationCtrl: FormControl = new FormControl();
  architectsConsultingCtrl: FormControl = new FormControl();
  debrisRemovalCtrl: FormControl = new FormControl();
  earthquakeCtrl: FormControl = new FormControl();
  paymentTypeCtrl: FormControl = new FormControl();

  insuredWithOtherInsuranceCoCtrl: FormControl = new FormControl();
  insuredWithOtherInsuranceCoDeclinedCtrl: FormControl = new FormControl();
  residenceOfficeShopsCtrl: FormControl = new FormControl();
  industrialManufacturingRiskCtrl: FormControl = new FormControl();
  storageOutsideIndustrialRiskCtrl: FormControl = new FormControl();
  tankGasHolderCtrl: FormControl = new FormControl();
  utilitiesCtrl: FormControl = new FormControl();
  usedAsShopCtrl: FormControl = new FormControl();
  handledAsPerListCtrl: FormControl = new FormControl();
  stockValueCtrl: FormControl = new FormControl();
  usedAsWarehouseCtrl: FormControl = new FormControl();
  usedAsIndustrialManufacturingUnitCrl: FormControl = new FormControl();
  factoryStateCtrl: FormControl = new FormControl();
  fireProtectionDeviceInstalledCtrl: FormControl = new FormControl();
  basicProposedForInsuranceCtrl: FormControl = new FormControl();
  marketValueBasisCtrl: FormControl = new FormControl();
  reinstatementValueBasisCtrl: FormControl = new FormControl();
  ageOfBuildingCtrl: FormControl = new FormControl();
  floaterBasisCtrl: FormControl = new FormControl();
  declarationBasisCtrl: FormControl = new FormControl();
  floaterDeclarationBasisCtrl: FormControl = new FormControl();
  stocksStoredInOpenCtrl: FormControl = new FormControl();
  riReqCtrl: FormControl = new FormControl();
  directiveObj = new CommonDirective();


  policyTypeCtrl: FormControl = new FormControl();
  letterProposalCttrl: FormControl = new FormControl();
  treasuryNameCtrl: FormControl = new FormControl();

  displayedColumns: string[] = [
    'riskLocation',
    'address',
    'pinCode',
    'action',
  ];
  elementData: ProposerDetails[] = [
    {
      riskLocation: '',
      address: '',
      pinCode: '',
    }
  ];
  dataSource = new MatTableDataSource<ProposerDetails>(this.elementData);

  displayedColumnsPolicy: string[] = [
    'srNo',
    'premiumStartDate',
    'premiumEndDate',
    'premium',
    'claims',
  ];
  elementData1: PartThreePolicyDetails[] = [
    {
      premiumStartDate: '',
      premiumEndDate: '',
      premium: '',
      claims: '',
    },
    {
      premiumStartDate: '',
      premiumEndDate: '',
      premium: '',
      claims: '',
    },
    {
      premiumStartDate: '',
      premiumEndDate: '',
      premium: '',
      claims: '',
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
  dataSourcePolicy = new MatTableDataSource<PartThreePolicyDetails>(this.elementData1);

  header1: string[] = [
    'descriptionOfBlock',
    'amountInRs',
    'blank',
    'action'
  ];
  displayedColumns2: string[] = [
    'descriptionOfBlock1',
    'buildingIncludingPath',
    'ma',
    'ffOtherEquipment',
    'ssp',
    'propertyInsuredSeparately',
    'total',
    'age',
    'height',
    'construction',
    'action1'
  ];
  elementData2: BuildingWiseValue[] = [
    {
      descriptionOfBlock1: '',
      buildingIncludingPath: '',
      ma: '',
      ffOtherEquipment: '',
      ssp: '',
      propertyInsuredSeparately: '',
      total: '',
      age: '',
      height: '',
      construction: '',
    },
    {
      descriptionOfBlock1: '',
      buildingIncludingPath: '',
      ma: '',
      ffOtherEquipment: '',
      ssp: '',
      propertyInsuredSeparately: '',
      total: '',
      age: '',
      height: '',
      construction: '',
    },
    {
      descriptionOfBlock1: '',
      buildingIncludingPath: '',
      ma: '',
      ffOtherEquipment: '',
      ssp: '',
      propertyInsuredSeparately: '',
      total: '',
      age: '',
      height: '',
      construction: '',
    }
  ];
  dataSourceBuildingWise = new MatTableDataSource<BuildingWiseValue>(this.elementData2);


  displayedColumns3: string[] = [
    'particulars',
    'clausePerilCode',
    'riskCode',
    'rateCode',
    'rate',
    'sumInsured',
    'premium',
    'riskCode1',
    'rateCode1',

  ];
  elementData3: any[] = [
    {
      particulars: 'Plinth & Foundation',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Architects consulting & Engineers fee',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Debris Removal',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Detoriation of Stocks in cold storage premises on account failure due to insured peril',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Forest Fire',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Impact damage due to Insured own vehicle',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Spontaneous Combustion',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Omission to Insure aditions alteration extension',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Earthquake',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Building wise values',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Stocks Floater Basis',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Stocks Declaration Basis',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    }, {
      particulars: 'Stocks Floater Declaration Basis',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },
    {
      particulars: 'Stocks in Open-outside factory compound',
      clausePerilCode: '',
      riskCode: '',
      rateCode: '',
      rate: '',
      sumInsured: '',
      premium: '',
      riskCode1: '',
      rateCode1: '',
    },

  ];
  dataSourceTotalSumInsured = new MatTableDataSource<any>(this.elementData3);

  constructor(private fb: FormBuilder, public fireService: FireService) { }

  ngOnInit() {
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
      riReq: [''],
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

  addColumn() {
    const data = this.dataSource.data;
    data.push({
      riskLocation: '',
      address: '',
      pinCode: '',
    });
    this.dataSource.data = data;
  }

  deleteColumn(dataSource, index) {
    dataSource.data.splice(index, 1);
    dataSource.data = dataSource.data;
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


  addColumnBuildingWise() {
    const data = this.dataSourceBuildingWise.data;
    data.push({
      descriptionOfBlock1: '',
      buildingIncludingPath: '',
      ma: '',
      ffOtherEquipment: '',
      ssp: '',
      propertyInsuredSeparately: '',
      total: '',
      age: '',
      height: '',
      construction: '',
    }
    );

    this.dataSourceBuildingWise.data = data;
  }

  onSelectingGoodsHandled(event) {
    if (event.value == '1') {
      this.handledAsPerListValue = true;
    } else {
      this.handledAsPerListValue = false;
    }
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

  total = (sumInsured, rate): Number => { return (sumInsured * rate / 1000) }

  setFieldVal() {
    
  }

  onSubmit() {
    
  }
}
