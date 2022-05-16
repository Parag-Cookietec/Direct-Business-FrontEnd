import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-listing';
import { FireService } from 'src/app/modules/services/doi/fire.service';
import { APIConst } from 'src/app/shared/constants/doi/doi-api.constants';
import { ProposerDetails, PartThreePolicyDetails, BuildingWiseValue, TotalSumInsured } from '../../models/doiModel';

@Component({
  selector: 'app-standard-fire-policy',
  templateUrl: './standard-fire-policy.component.html',
  styleUrls: ['./standard-fire-policy.component.css']
})
export class StandardFirePolicyComponent implements OnInit {
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
  treasuryName_list: ListValue[] = [
    { value: '1', viewValue: 'District Treasury Office, Gandhinagar' }
  ];

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
  dataSource = new MatTableDataSource<ProposerDetails>(this.elementData);
  directiveObj = new CommonDirective();

  displayedColumnsPolicy: string[] = [
    'srNo',
    'premiumStartDate',
    'premiumEndDate',
    'premium',
    'claims',
  ];
  partThreePolicyDetails: PartThreePolicyDetails[] = [
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
  dataSourcePolicy = new MatTableDataSource<PartThreePolicyDetails>(this.partThreePolicyDetails);

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
  elementData3: TotalSumInsured[] = [];
  dataSourceTotalSumInsured = new MatTableDataSource<TotalSumInsured>(this.elementData3);

  sumAssuredFormControlNames = [
    { name: 'coverPlinthFoundation', type: 'dd' },
    { name: 'architectsConsulting', type: 'dd' },
    { name: 'debrisRemoval', type: 'dd' },
    { name: 'detoriationOfStocks', type: 'field' },
    { name: 'forestFire', type: 'field' },
    { name: 'vehicleDamageImpact', type: 'field'},
    { name: 'spontaneousCombustion', type: 'field'},
    { name: 'omission', type: 'field' },
    { name: 'earthquake', type: 'dd' },
    { name: ['floaterBasis','amountFloaterBasis'], type: 'ddf' },
    { name: ['declarationBasis', 'amountDeclarationBasis'], type: 'ddf' },
    { name: ['floaterDeclarationBasis', 'amountFloaterDeclarationBasis'], type: 'ddf' },
    { name: ['stocksStoredInOpen', 'amountStocksStoredInopen'], type: 'ddf' }
  ];

  constructor(private fb: FormBuilder, public fireService: FireService) {
  }

  ngOnInit() {
    this.standardFirePolicyForm = this.fb.group({
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
      terrorDet: [''],
      district: [''],
      taluka: [''],
      village: [''],
      adharNo: [''],
      mobileNo: [''],
      typeofbuildingUse: [''],
      wall: [''],
      cellinf: [''],
      term: [''],
      paymentMode: [''],
      dateCheque: [''],
      ddZNo: [''],
      banName: [''],
      bankBranch: [''],
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
      // rate: [''],
      // discpPerc: [''],
      // loadCha: [''],
      // loadAmt: [''],
      // totAddPre: [''],
      // totPre: [''],
      // gstPerc: [''],
      // payPre: [''],
      // discAmt: [''],
      // gstAmt: [''],
      // sumInsured: [''],
      // term: [''],
      // insurance: [''],
      paymentMode: [''],
      dateCheque: [''],
      ddZNo: [''],
      banName: [''],
      treasuryName: [''],
      bankBranch: [''],
      challanDate1: [''],
      challanNo: [{ value: '12345', disabled: true }],
      chaAmount: [{ value: '12345.00', disabled: true }],
      challanDate: [{ value: new Date('05/11/2019'), disabled: true }],
      paymentDate: [{ value: new Date('05/10/2019'), disabled: true }],
    });

    this.generateSumAssured();

  }
  
  generateSumAssured() {
      this.sumAssuredFormControlNames.forEach(control => {
        switch(control.type) {
          case 'dd':
            this.standardFirePolicyForm.get(control.name).valueChanges.subscribe(value => {
              if(value === "1") {
                this.elementData3 = this.dataSourceTotalSumInsured.data;
                this.elementData3.push({
                  particulars: this.getParticulars(control.name.toString()),
                  clausePerilCode: '',
                  riskCode: '',
                  rateCode: '',
                  rate: '',
                  sumInsured: '',
                  premium: '',
                  riskCode1: '',
                  rateCode1: '',
                  code: control.name.toString()
                });
              } else {
                this.elementData3 = this.dataSourceTotalSumInsured.data;
                this.elementData3.splice(this.elementData3.findIndex(data => data.code === control.name),1)
              }
              this.dataSourceTotalSumInsured.data = this.elementData3;
            });
            break;
          case 'field':
            this.standardFirePolicyForm.get(control.name).valueChanges.subscribe(value => {
              if(value) {
                this.elementData3 = this.dataSourceTotalSumInsured.data;
                const index = this.elementData3.findIndex(elem => elem.particulars === this.getParticulars(control.name.toString()))
                if(index >= 0) {
                  this.elementData3[index].sumInsured = this.standardFirePolicyForm.get(control.name).value;
                } else {
                  this.elementData3.push({
                    particulars: this.getParticulars(control.name.toString()),
                    clausePerilCode: '',
                    riskCode: '',
                    rateCode: '',
                    rate: '',
                    sumInsured: this.standardFirePolicyForm.get(control.name).value,
                    premium: '',
                    riskCode1: '',
                    rateCode1: '',
                    code: control.name.toString()
                  });
                }
              } else {
                this.elementData3 = this.dataSourceTotalSumInsured.data;
                this.elementData3.splice(this.elementData3.findIndex(data => data.code === control.name),1)
              }
              this.dataSourceTotalSumInsured.data = this.elementData3;
            });
            break;
          case 'ddf':
            this.standardFirePolicyForm.get(control.name[1]).valueChanges.subscribe(value => {
              if(value && this.standardFirePolicyForm.get(control.name[0]).value === "1") {
                this.elementData3 = this.dataSourceTotalSumInsured.data;
                const index = this.elementData3.findIndex(elem => elem.particulars === this.getParticulars(control.name[0]))
                if(index >= 0) {
                  this.elementData3[index].sumInsured = this.standardFirePolicyForm.get(control.name[1]).value;
                } else {
                  this.elementData3.push({
                    particulars: this.getParticulars(control.name[0]),
                    clausePerilCode: '',
                    riskCode: '',
                    rateCode: '',
                    rate: '',
                    sumInsured: this.standardFirePolicyForm.get(control.name[1]).value,
                    premium: '',
                    riskCode1: '',
                    rateCode1: '',
                    code: control.name[0]
                  });
                }
              } else {
                this.elementData3 = this.dataSourceTotalSumInsured.data;
                this.elementData3.splice(this.elementData3.findIndex(data => data.code === control.name[0]),1)
              }
              this.dataSourceTotalSumInsured.data = this.elementData3;
            });
            break;
        }
      });
  }


  getParticulars(code: string) {
    return APIConst.DOI.DIRECT_BUSINESS.FIRE[code].particulars;
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

  setFieldVal() {
    
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

  total(sumInsured, rate, index): Number { 
    this.dataSourceTotalSumInsured.data[index].premium = (sumInsured * rate / 1000).toString();
    return (sumInsured * rate / 1000) 
  }

  getTotalSumInsured(){
    let sum = 0
    this.dataSourceTotalSumInsured.data.forEach(element => sum += isNaN(parseFloat(element.sumInsured))? 0 : parseFloat(element.sumInsured));
    return sum;
  }

  getTotalPremium() {
    let sum = 0
    this.dataSourceTotalSumInsured.data.forEach(element => sum += isNaN(parseFloat(element.premium))? 0 : parseFloat(element.premium));
    return sum;
  }

  getBuildingWiseTotal(index: number) {
    return (isNaN(parseFloat(this.dataSourceBuildingWise.data[index].buildingIncludingPath))? 0 : parseFloat(this.dataSourceBuildingWise.data[index].buildingIncludingPath)) +
    (isNaN(parseFloat(this.dataSourceBuildingWise.data[index].ma))? 0 : parseFloat(this.dataSourceBuildingWise.data[index].ma)) +
    (isNaN(parseFloat(this.dataSourceBuildingWise.data[index].ffOtherEquipment))? 0 : parseFloat(this.dataSourceBuildingWise.data[index].ffOtherEquipment)) +
    (isNaN(parseFloat(this.dataSourceBuildingWise.data[index].ssp))? 0 : parseFloat(this.dataSourceBuildingWise.data[index].ssp)) +
    (isNaN(parseFloat(this.dataSourceBuildingWise.data[index].propertyInsuredSeparately))? 0 : parseFloat(this.dataSourceBuildingWise.data[index].propertyInsuredSeparately))
  }

  getBuildingWiseGrandTotal(field?: string) {
    let sum = 0;
    if(!field) {
      this.dataSourceBuildingWise.data.forEach((element,index) => {
        sum += this.getBuildingWiseTotal(index);
      });
    } else {
      this.dataSourceBuildingWise.data.forEach((element,index) => {
        sum += isNaN(parseFloat(element[field]))? 0 : parseFloat(element[field]);
      });
    }

    if(!field && sum > 0) {
      const index = this.dataSourceTotalSumInsured.data.findIndex(elem => elem.particulars === 'Building wise values');
      this.elementData3 = this.dataSourceTotalSumInsured.data;
      if(index >= 0) {
        this.elementData3[index].sumInsured = sum.toString();
      } else {
        this.elementData3.push({
          particulars: 'Building wise values',
          clausePerilCode: '',
          riskCode: '',
          rateCode: '',
          rate: '',
          sumInsured: sum.toString(),
          premium: '',
          riskCode1: '',
          rateCode1: '',
          code: 'totalAmt'
        });
      }
      this.dataSourceTotalSumInsured.data = this.elementData3;
    }

    return sum;
  }


  getFireRiskLocations() {
    const result = [];
    this.dataSource.data.forEach(loc => {
      result.push({
        "riskLocation": loc.riskLocation,
        "locationAddress": loc.address,
        "pincode": loc.pinCode
      });
    })
  }

  getPolicyDet() {
    this.dataSourcePolicy.data.forEach((pol,index) => {
      pol['policySrno'] = index;
      pol['policyNo'] = 'POL'+index;
    })
    return this.dataSourcePolicy.data;
  }


  getBuildingWiseData() {
    const result = [];
    this.dataSourceBuildingWise.data.forEach(building => {
      result.push({
        "blockDesc": building.descriptionOfBlock1,
        "buildingPathAmt": building.buildingIncludingPath,
        "mAndAAmt": building.ma,
        "fAndFAmt": building.ffOtherEquipment,
        "sspAmt": building.ssp,
        "insurPropAmt": building.propertyInsuredSeparately,
        "totalAmt": building.total,
        "buildingAgeYrs": building.age,
        "buildingHeight": building.height,
        "construction": building.construction
      })
    });
    return result;
  }


  getTotalSumInsuredData() {
    const result = [];
    this.dataSourceTotalSumInsured.data.forEach(insured => {
      result.push({
        "riskCoverId": insured.code,
        "perilCauseId": insured.clausePerilCode,
        "riskCode": insured.rateCode,
        "riskRateCode": insured.rateCode,
        "riskRate": insured.rate,
        "sumInsured": insured.sumInsured,
        "premiumAmt": insured.premium,
        "prmRiskCode": insured.riskCode1,
        "prmRiskRateCode": insured.rateCode1
      });
    });
    return result;
  }


  getRIDetails() {
    const result = [];
    this.dataSourceRi.data.forEach(ri => {
      result.push({
        "riCompName": ri.riCompName,
        "riBrnchOffice": ri.riOff,
        "riSharePerc": ri.riShare,
        "riAmount": ri.riAmt
      })
    });
    return result;
  }

  getTotalRIAmount() {
    let total = 0;
    this.dataSourceRi.data.forEach(ri => {
      total+=parseFloat(ri.riAmt);
    });
    return total;
  }

  submit() {
    const dataToSubmit = {
      propslPoliciesId: 0,
      tdoiDbProposal: {
        "proposerTypeId": 1,
        "proposerName": this.standardFirePolicyForm.get('proposerName').value,
        "proposerAddress": this.standardFirePolicyForm.get('address').value,
        "contactNum": this.standardFirePolicyForm.get('phoneNo').value,
        "emailAddress": this.standardFirePolicyForm.get('emailId').value,
        "sumInsured": this.getTotalSumInsured(),
        "insurPremium": this.getTotalPremium()
      },
      "proposerBusiness": this.standardFirePolicyForm.get('businessOfProposer').value,
      "firmCapitalPaid": this.standardFirePolicyForm.get('firmCapitalPaidUp').value,
      "issuedInFavor": this.standardFirePolicyForm.get('issuedPolicy').value,
      "insurStartDt": this.standardFirePolicyForm.get('insuranceFromDate').value,
      "insurEndDt": this.standardFirePolicyForm.get('insuranceToDate').value,
      "tdoiDbFireRiskLocs": this.getFireRiskLocations(),
      "coversIncluded": this.standardFirePolicyForm.get('coverIncluded').value,
      "isCoverPinth": this.standardFirePolicyForm.get('coverPlinthFoundation').value,
      "isArchitectFeesAdd": this.standardFirePolicyForm.get('architectsConsulting').value,
      "architectFees": this.standardFirePolicyForm.get('architectsConsulting').value,
      "isDebrisRemvAdd": this.standardFirePolicyForm.get('debrisRemoval').value,
      "debrisRemvlAmt": this.standardFirePolicyForm.get('debrisRemoval').value,//
      "coldStrgDetor": this.standardFirePolicyForm.get('detoriationOfStocks').value,
      "forestFire": this.standardFirePolicyForm.get('forestFire').value,
      "vehicleDamage": this.standardFirePolicyForm.get('vehicleDamageImpact').value,
      "spontCombustion": this.standardFirePolicyForm.get('spontaneousCombustion').value,
      "ommissionAddtn": this.standardFirePolicyForm.get('omission').value,
      "isEarthquakeCov": this.standardFirePolicyForm.get('earthquake').value,
      "isOthrCompIns": this.standardFirePolicyForm.get('insuredWithOtherInsuranceCo').value,
      "othrCompnyName": this.standardFirePolicyForm.get('insuranceCompanyName').value,
      "insrnceDetails": this.standardFirePolicyForm.get('insuranceCompanyDetails').value,
      "isInsrDeclined": this.standardFirePolicyForm.get('insuredWithOtherInsuranceCoDeclined').value,
      "declineDetails": this.standardFirePolicyForm.get('insuranceCompanyDeclinedDetails').value,
      "terrorismDtls": this.standardFirePolicyForm.get('terrorDet').value,
      "tdoiDbFirePastPolicies": this.getPolicyDet(),
      "isResiOffcShop": this.standardFirePolicyForm.get('residenceOfficeShops').value,
      "anyIndustryRisk": this.standardFirePolicyForm.get('industrialManufacturingRisk').value,
      "outStorgRisk": this.standardFirePolicyForm.get('storageOutsideIndustrialRisk').value,
      "outGasTanksRisk": this.standardFirePolicyForm.get('tankGasHolder').value,
      "utilitiesOutRisk": this.standardFirePolicyForm.get('utilities').value,
      "isUsedAsShop": this.standardFirePolicyForm.get('usedAsShop').value,
      "goodsAsPerList": this.standardFirePolicyForm.get('handledAsPerList').value,
      "stockValExceed": this.standardFirePolicyForm.get('stockValue').value,
      "usedWarehouseGodwn": this.standardFirePolicyForm.get('usedAsWarehouse').value,
      "goodsStoredList": this.standardFirePolicyForm.get('goodsStoredList').value,
      "usedAsIndustry": this.standardFirePolicyForm.get('usedAsIndustrialManufacturingUnit').value,
      "manufProductList": this.standardFirePolicyForm.get('manufacturedProducts').value,
      "factoryStatus": this.standardFirePolicyForm.get('factoryState').value,
      "fireProtectDevice": this.standardFirePolicyForm.get('fireProtectionDeviceInstalled').value,
      "basisPropInsur": this.standardFirePolicyForm.get('basicProposedForInsurance').value,
      "marketValBasis": this.standardFirePolicyForm.get('marketValueBasis').value,
      "reinstatValBasis": this.standardFirePolicyForm.get('reinstatementValueBasis').value,
      "wallMaterialUsed": this.standardFirePolicyForm.get('materialUsedForWall').value,
      "floorMaterialUsed":  this.standardFirePolicyForm.get('materialUsedForFloor').value,
      "roofMaterialUsed": this.standardFirePolicyForm.get('materialUsedForRoof').value,
      "buildingHeight": this.standardFirePolicyForm.get('heightOfBuilding').value,
      "buildingAgeId": this.standardFirePolicyForm.get('ageOfBuilding').value,
      "tdoiDbFireBuildingVals": this.getBuildingWiseData(),
      "isFloaterBasis": this.standardFirePolicyForm.get('floaterBasis').value,
      "floaterBasisAmt": this.standardFirePolicyForm.get('amountFloaterBasis').value,
      "isDeclaraeBasis": this.standardFirePolicyForm.get('declarationBasis').value,
      "declareBasisAmt": this.standardFirePolicyForm.get('amountDeclarationBasis').value,
      "isFloatDecBasis": this.standardFirePolicyForm.get('floaterDeclarationBasis').value,
      "floatDecBasisAmt": this.standardFirePolicyForm.get('amountFloaterDeclarationBasis').value,
      "isStockStorOpen": this.standardFirePolicyForm.get('stocksStoredInOpen').value,
      "openStorLoc": this.standardFirePolicyForm.get('locationOfStockInOpen').value,
      "openStocksAmt": this.standardFirePolicyForm.get('amountStocksStoredInopen').value,
      "tdoiDbFireSumInsureds": this.getTotalSumInsuredData(),
      "sumInsured":  this.standardFirePolicyForm.get('sumInsured').value,
      "rateOfIntrst": this.standardFirePolicyForm.get('rate').value,
      "insrncPremium": this.standardFirePolicyForm.get('insurance').value,
      "premDiscPc": this.standardFirePolicyForm.get('discpPerc').value,
      "premDiscAmt": this.standardFirePolicyForm.get('discAmt').value,
      "totAddonPrem": this.standardFirePolicyForm.get('totAddPre').value,
      "totalPremium": this.standardFirePolicyForm.get('totPre').value,
      "premGstPc": this.standardFirePolicyForm.get('gstPerc').value,
      "premGstAmt": this.standardFirePolicyForm.get('gstAmt').value,
      "payablePremAmt": this.standardFirePolicyForm.get('payPre').value,
      "isRiReqd": this.standardFirePolicyForm.get('riReq').value,
      "tdoiDbPropFireRiDtls": this.getRIDetails(),
      "tdoiDbPropslFireWfs": null,
      "totRiAmt": this.getTotalRIAmount(),
      "paymentModeId": this.standardFirePolicyForm.get('paymentMode').value,
      "chequeDdDt": this.standardFirePolicyForm.get('dateCheque').value,
      "bankId":  this.standardFirePolicyForm.get('banName').value,
      "branchId": this.standardFirePolicyForm.get('bankBranch').value,
      "chequeDdNo": this.standardFirePolicyForm.get('ddZNo').value,
      "bankName": this.standardFirePolicyForm.get('banName').value,
      "branchName": this.standardFirePolicyForm.get('bankBranch').value,
      "challanNo": this.standardFirePolicyForm.get('challanNo').value,
      "challanDt": this.standardFirePolicyForm.get('challanDate').value,
      "challanAmount": this.standardFirePolicyForm.get('chaAmount').value,
      "paymentDate": this.standardFirePolicyForm.get('paymentDate').value,
    }

    this.fireService.createData(dataToSubmit, 'proposal');
  }
}
