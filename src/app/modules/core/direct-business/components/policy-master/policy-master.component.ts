import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doiMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { PolicyOfferView } from '../../models/doiModel';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-generate-policy-no',
  templateUrl: 'generate-policy-no.html',

})
// tslint:disable-next-line: component-class-suffix
export class GeneratePolicyNoComponent {

  constructor(public dialogRef: MatDialogRef<GeneratePolicyNoComponent>) { }

  // on click on Ok close pop-up
  onOk() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-policy-master',
  templateUrl: './policy-master.component.html',
  styleUrls: ['./policy-master.component.css']
})
export class PolicyMasterComponent implements OnInit {
  isTokentable = false;
  isTokentableOPEN = false;
  referenceNoToken = false;
  riShare = '5'
  isTokentableone = false;
  isTokentabletwo = false
  // date
  todayDate = new Date();
  // variables
  errorMessage = doiMessage;
  policyNo = 786548;
  totalAmount = null;
  discountValue = null;
  taxes = null;
  grandTotalValue = null;
  // form group
  masterPolicyForm: FormGroup;
  paymentDetailsForm: FormGroup;
  // form control
  paymentReceivedThroughCtrl: FormControl = new FormControl();
  riRequiredCtrl: FormControl = new FormControl();
  premiumDetailsForm: FormGroup;
  bankbranchCtrl: FormControl = new FormControl();
  bankCtrl: FormControl = new FormControl();
  paymentModetrl: FormControl = new FormControl();
  referenceNoCtrl: FormControl = new FormControl();
  challanNo: FormControl = new FormControl();
  challanDate: FormControl = new FormControl();
  policyTypeCtrl: FormControl = new FormControl();
  riskTypeCtrl: FormControl = new FormControl();
  letterProposalCttrl: FormControl = new FormControl();
  paymentTypeCtrl: FormControl = new FormControl();
  // lists start
  riRequiredList: any[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '2', viewValue: 'No' },
  ];
  referenceNoList: CommonListing[] = [
    { value: '1', viewValue: 'DOI/DB/19-20/E0091' },
    { value: '2', viewValue: 'DOI/DB/19-20/E0098' },
    { value: '3', viewValue: 'DOI/DB/19-20/E0102' },
    { value: '4', viewValue: 'DOI/DB/19-20/E0110' },
  ];
  // lists end
  riskType_list: any[] = [
    {
      value: '1',
      viewValue: 'Fire'
    }
  ];
  paymentReceivedThroughList: any[] = [
    { value: '1', viewValue: 'Cash' },
    { value: '2', viewValue: 'Cheque' },
  ];

  bankbranch_list: any[] = [
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
  bank_list: any[] = [
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
  paymentMode_list: any[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' },
    { value: '3', viewValue: 'Treasury' },
  ];
  paymentTypeList: any[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' }
  ];
  letterProposalList: any[] = [
    { value: '1', viewValue: '19-20/DOI/12345' },
    { value: '2', viewValue: '19-20/DOI/6783' },
  ];
  policyTypeList: CommonListing[] = [
    { value: '1', viewValue: 'New' },
    { value: '2', viewValue: 'Renewal' },
    { value: '3', viewValue: 'Endrosment' },
  ];
  // table data start
  displayedColumns: string[] = [
    'position',
    'policyType',
    'sumInsured',
    'premiumAmountPolicy',
    'types',
    'coverage',
    'unit',
    'premiumAmountAddOn'
  ];
  displayedColumns1: string[] = [
    'riName',
    'riAddress',
    'riShare',
    'premiumAmount',
    'resPayment',
    'paymentReceivedOn',
    'paymentReceivedThrough',
    'challanNo',
    'challanDate',
    'action',
  ];
  elementData: PolicyOfferView[] = [
    {
      policyType: 'Fire',
      sumInsured: '20,00,000',
      premiumAmountPolicy: 200000,
      types: 'Building',
      coverage: 2500,
      unit: 'sq. mtr.',
      premiumAmountAddOn: 135000,
    },
    {
      policyType: 'Fire & Burglary',
      sumInsured: '20,00,000',
      premiumAmountPolicy: 300000,
      types: 'Office',
      coverage: 1250,
      unit: 'sq. mtr.',
      premiumAmountAddOn: 100000,
    },
    {
      policyType: 'Electronics Equipment/Material Damage',
      sumInsured: '20,00,000',
      premiumAmountPolicy: 200000,
      types: 'Laptops',
      coverage: 150,
      unit: 'Pcs',
      premiumAmountAddOn: 100000,
    },
    {
      policyType: 'Case-In-Transit',
      sumInsured: '10,00,000',
      premiumAmountPolicy: 100000,
      types: 'Computers',
      coverage: 90,
      unit: 'Pcs',
      premiumAmountAddOn: 100000,
    },
    {
      policyType: 'Case-In-Transit',
      sumInsured: '',
      premiumAmountPolicy: null,
      types: 'Paperworks & Document',
      coverage: 95,
      unit: 'Pcs',
      premiumAmountAddOn: 165000,
    },
    {
      policyType: 'Case-In-Transit',
      sumInsured: '',
      premiumAmountPolicy: null,
      types: 'Cabinets',
      coverage: 100,
      unit: 'Pcs',
      premiumAmountAddOn: 100000,
    },
  ];
  elementDta: PolicyOfferView[] = [
    {
      policyType: 'Fire',
      sumInsured: '20,00,000',
      premiumAmountPolicy: 200000,
      types: 'Building',
      coverage: 2500,
      unit: 'sq. mtr.',
      premiumAmountAddOn: 135000,
    },

  ];
  dataSource = new MatTableDataSource<PolicyOfferView>(this.elementData);
  dataSource1 = new MatTableDataSource<PolicyOfferView>(this.elementDta);

  // table data end


  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // constructor
  constructor(private fb: FormBuilder, private dialog: MatDialog, private router: Router, private decimalPipe: DecimalPipe) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.totalAmount = Number(this.calculatePremiumAmountAddOn()) + Number(this.calculatePremiumAmount());
    this.discountValue = 0;
    this.taxes = ((Number(this.totalAmount) - Number(this.discountValue)) * 18) / 100;
    this.grandTotalValue = this.decimalPipe.transform((Number(this.totalAmount) + Number(this.taxes)), '1.2-2');
    this.masterPolicyForm = this.fb.group({
      referenceNo: [''],
      policyType: [''],
      referenceDate: [{ value: '', disabled: true }],
      policyNo: [this.policyNo],
      instituteType: [{ value: '', disabled: true }],
      instituteName: [{ value: '', disabled: true }],
      district: [{ value: '', disabled: true }],
      taluka: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      contactNo: [{ value: '', disabled: true }],
      emailId: [{ value: '', disabled: true }],
      startDate: [''],
      endDate: [''],
      endorsementNo: [''],
      premiumAmount: [{ value: '', disabled: true }],
      riskType: [''],
      letterProposal: [''],
      riRequired: ['']
    });

    this.masterPolicyForm.valueChanges.subscribe(() => {
      this.policyNo = Number(this.policyNo) + 1;
    });

    // this.paymentDetailsForm = this.fb.group({
    //   challanNo: [{ value: '12345', disabled: true }],
    //   challanDate: [{ value: new Date('05/11/2019'), disabled: true }],
    //   premiumAmount: [{ value: '17,70,000', disabled: true }],
    //   bankName: [{ value: 'State Bank Of India', disabled: true }],
    //   chequeDate: [{ value: new Date('05/10/2019'), disabled: true }],
    //   chequeNo: [{ value: '76890', disabled: true }],
    //   paymentType: [{ value: 'Cheque', disabled: true }],
    //   paymentDate: [{ value: new Date('05/10/2019'), disabled: true }],

    // });

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
      bankBranch: ['']
    });
  }
  calculateOurSharePremium() {
    let value = 0;
    value = (Number(this.masterPolicyForm.value.premium) / 100) * (Number(this.masterPolicyForm.value.ourShare));
    return value;
  }
  setFieldVal() {
    
  }
  calculateRiPremiumAmount(element) {
    if (element.riName === 'GIC') {
      let value = 0;
      value = (Number(this.riShare) / 100) * Number(this.calculateOurSharePremium());
      return value;
    } else {
      let value = 0;
      value = (Number(element.riShare) / 100) * Number(this.masterPolicyForm.controls['premium'].value);
      return value;
    }
  }
  // select reference no
  selectReferenceNo(event, index) {
    if (event) {
      this.masterPolicyForm.patchValue({
        referenceDate: new Date('05/01/2019'),
        instituteType: 'Govt. Department',
        instituteName: 'Civil Department',
        district: 'Bharuch',
        taluka: 'Dahej',
        address: 'Dahej GIDC,Plot 20,Dahej',
        contactNo: '9876543210',
        emailId: 'example@domain.com',
        premiumAmount: '200,000.00'
      });

    }


    this.referenceNoToken = true;


  }

  // calculate premium amount of add-on
  calculatePremiumAmountAddOn() {
    let amount = 0;
    this.dataSource.data.forEach(
      (element) => {
        amount = element.premiumAmountAddOn + amount;
      }
    );
    return amount;
  }

  onRiNameEnter(element) {
    if (element.riName === 'GIC') {
      return element.riShare = '5%'
    }
  }
  // claculate premium amount of policy
  calculatePremiumAmount() {
    let amount = 0;
    this.dataSource.data.forEach(
      (element) => {
        amount = element.premiumAmountPolicy + amount;
      }
    );
    return amount;
  }

  // on click on submit
  onSubmit() {
    const dialogRef = this.dialog.open(GeneratePolicyNoComponent,
      { width: '455px', height: '150px' });

  }

  // on click on submit
  onReset() {
    this.masterPolicyForm.reset();
    this.masterPolicyForm.patchValue({
      policyNo: this.policyNo
    });
  }

  // on click on close
  onClose() { }

  // on click on listing button
  goToListing() {
    this.router.navigate(['doi/db/policy-master-listing']);
  }
  ontoken(index) {
    if (index.value === '3') {
      this.isTokentable = true;
      this.referenceNoToken = false;
    } else {
      this.isTokentable = false;

    }
    if (index.value === '2') {
      this.isTokentableone = true;
      this.referenceNoToken = false;
    } else {
      this.isTokentableone = false;
    }
    if (index.value === '1') {
      this.isTokentabletwo = true;

    } else {
      this.isTokentabletwo = false;
    }

  }

  ontoken2(index) {
    if (index.value === '3') {
      this.isTokentable = true;
      this.masterPolicyForm.patchValue({
        challanNo: '1856',
        challanDate: new Date('07/18/2020'),
        challaAmount: '10000.00'
      });
    } else {
      this.isTokentable = false;
    }
    if (index.value === '2' || index.value === '1') {
      this.isTokentableOPEN = true;
      this.masterPolicyForm.patchValue({
        receiptNo: '11246254',
        receiptDate: new Date('07/17/2020'),
      });

    } else {
      this.isTokentableOPEN = false;
    }
  }
}

