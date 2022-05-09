import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doiMessage, hbaMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { DoiDirectives } from '../../directives/doi';
import { TalukaList, PolicyProposalLettter } from '../../models/doiModel';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-policy-proposal-submission',
  templateUrl: 'policy-proposal-submission.html',

})
// tslint:disable-next-line: component-class-suffix
export class PolicyProposalSubmissionComponent {

  referenceNo = 'DOI/DB/19-20/E0091';
  referenceDate = new Date();
  constructor(public dialogRef: MatDialogRef<PolicyProposalSubmissionComponent>) { }

  // on click on Ok close pop-up
  onOk() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-policy-proposal-letter',
  templateUrl: './policy-proposal-letter.component.html',
  styleUrls: ['./policy-proposal-letter.component.css']
})
export class PolicyProposalLetterComponent implements OnInit {

  // date
  todayDate = new Date();
  // variables
  showTable = false;
  errorMessage = doiMessage;
  errorMessages = hbaMessage;
  isTokentable = false;
  isTokentableOPEN = false;
  directiveObj = new DoiDirectives(this.router, this.dialog);
  // form group
  policyProposalLetterForm: FormGroup;
  paymentDetailsForm: FormGroup;
  premiumDetailsForm: FormGroup;
  // form control
  proposerTypeCtrl: FormControl = new FormControl();
  districtCtrl: FormControl = new FormControl();
  talukaCtrl: FormControl = new FormControl();
  policyTypeCtrl: FormControl = new FormControl();
  buildingTypeCtrl: FormControl = new FormControl();
  assestsTypeCtrl: FormControl = new FormControl();
  unitCtrl: FormControl = new FormControl();
  paymentTypeCtrl: FormControl = new FormControl();
  bankCtrl: FormControl = new FormControl();
  paymentModetrl: FormControl = new FormControl();
  bankbranchCtrl: FormControl = new FormControl();

  // lists start
  proposerTypeList: CommonListing[] = [
    { value: '1', viewValue: 'Govt. Department' },
    { value: '2', viewValue: 'Govt. Board' },
    { value: '3', viewValue: 'Govt. Company' },
  ];

  districtList: CommonListing[] = [
    { value: '00', viewValue: 'Ahmedabad' },
    { value: '01', viewValue: 'Amreli' },
    { value: '02', viewValue: 'Anand' },
    { value: '03', viewValue: 'Aravalli' },
    { value: '04', viewValue: 'Banaskantha' },
    { value: '05', viewValue: 'Bharuch' },
    { value: '06', viewValue: 'Bhavnagar' },
  ];
  talukaList: TalukaList[] = [
    { value: '01', district: '00', viewValue: 'City East' },
    { value: '02', district: '00', viewValue: 'City West' },
    { value: '03', district: '00', viewValue: 'Bavla' },
    { value: '04', district: '00', viewValue: 'Daskroi' },
    { value: '05', district: '00', viewValue: 'Detroj-Rampura' },
    { value: '06', district: '00', viewValue: 'Dhandhuka' },
    { value: '07', district: '00', viewValue: 'Dholera' },
    { value: '08', district: '00', viewValue: 'Dholka' },
    { value: '09', district: '00', viewValue: 'Mandal' },
    { value: '10', district: '00', viewValue: 'Sanand' },
    { value: '11', district: '00', viewValue: 'Viramgam' },
    { value: '01', district: '01', viewValue: 'Amreli' },
    { value: '02', district: '01', viewValue: 'Babra' },
    { value: '03', district: '01', viewValue: 'Bagasara' },
    { value: '04', district: '01', viewValue: 'Dhari' },
    { value: '05', district: '01', viewValue: 'Jafrabad' },
    { value: '06', district: '01', viewValue: 'Khambha' },
    { value: '07', district: '01', viewValue: 'Kunkavav vadia' },
    { value: '08', district: '01', viewValue: 'Lathi' },
    { value: '09', district: '01', viewValue: 'Lilia' },
    { value: '10', district: '01', viewValue: 'Rajula' },
    { value: '11', district: '01', viewValue: 'Savarkundla' },
    { value: '01', district: '02', viewValue: 'Anand' },
    { value: '02', district: '02', viewValue: 'Anklav' },
    { value: '03', district: '02', viewValue: 'Borsad' },
    { value: '04', district: '02', viewValue: 'Khambhat' },
    { value: '05', district: '02', viewValue: 'Petlad' },
    { value: '06', district: '02', viewValue: 'Sojitra' },
    { value: '07', district: '02', viewValue: 'Tarapur' },
    { value: '08', district: '02', viewValue: 'Umreth' },
    { value: '01', district: '03', viewValue: 'Bayad' },
    { value: '02', district: '03', viewValue: 'Bhiloda' },
    { value: '03', district: '03', viewValue: 'Dhansura' },
    { value: '04', district: '03', viewValue: 'Malpur' },
    { value: '05', district: '03', viewValue: 'Meghraj' },
    { value: '06', district: '03', viewValue: 'Modasa' },
    { value: '01', district: '04', viewValue: 'Amirgadh' },
    { value: '02', district: '04', viewValue: 'Bhabhar' },
    { value: '03', district: '04', viewValue: 'Danta' },
    { value: '04', district: '04', viewValue: 'Dantiwada' },
    { value: '05', district: '04', viewValue: 'Deesa' },
    { value: '06', district: '04', viewValue: 'Deodar' },
    { value: '07', district: '05', viewValue: 'Dhanera' },
    { value: '08', district: '04', viewValue: 'Kankrej' },
    { value: '09', district: '06', viewValue: 'Lakhani' },
    { value: '10', district: '04', viewValue: 'Palanpur' },


  ];
  talukaNameList: CommonListing[];

  policyTypeList: CommonListing[] = [
    { value: '0', viewValue: 'Standard Fire & Special Perils Policy Schedule' },
    { value: '1', viewValue: 'Burglary & Housebreaking Policy' },
    { value: '2', viewValue: 'Electronics Equipment/Material Damage Schedule' },
    { value: '3', viewValue: 'Case-In-Transit Insurance' },
    { value: '4', viewValue: 'Terrorism Pool Insurance' }
  ];
  buildingTypeList: CommonListing[] = [
    { value: '0', viewValue: 'Building' },
    { value: '1', viewValue: 'Office' },
    { value: '2', viewValue: 'Assets' }
  ];
  assestsTypeNameList: CommonListing[] = [
    { value: '0', viewValue: 'Laptops' },
    { value: '1', viewValue: 'Computers' },
    { value: '2', viewValue: 'Paperworks & Document' },
    { value: '3', viewValue: 'Cabinets' }
  ];
  unitList: CommonListing[] = [
    { value: '0', viewValue: 'sq. mtr' },
    { value: '1', viewValue: 'Pcs' }
  ];

  paymentTypeList: CommonListing[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' }
  ];

  paymentMode_list: CommonListing[] = [
    { value: '1', viewValue: 'Cheque' },
    { value: '2', viewValue: 'Demand Draft' },
    { value: '3', viewValue: 'Treasury' },
  ];

  bank_list: CommonListing[] = [
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

  bankbranch_list: CommonListing[] = [
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

  // lists end

  // table data start
  displayedColumns: string[] = [
    'position',
    'policyType',
    'sumInsured',
    'types',
    'coverage',
    'unit',
  ];
  elementData: PolicyProposalLettter[] = [];
  dataSource = new MatTableDataSource<PolicyProposalLettter>(this.elementData);
  // table data end

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // constructor
  constructor(private fb: FormBuilder, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.policyProposalLetterForm = this.fb.group({
      proposerType: [''],
      proposerName: [''],
      district: [''],
      taluka: [''],
      address: [''],
      contactNo: [''],
      email: ['', Validators.email],
      policyType: [''],
      sumInsured: [''],
      buildingType: [''],
      assestsType: [''],
      coverage: [''],
      unit: [''],
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
      sumInsured: [''],
      rate: [''],
      loanAmount: [''],
      loan: [''],
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
    });
  }

  // on click on add
  addRecord() {
    if (this.policyProposalLetterForm.controls.policyType.value !== ''
      || this.policyProposalLetterForm.controls.sumInsured.value !== '') {
      this.showTable = true;
      this.elementData.push({
        policyType: this.policyTypeList[this.policyProposalLetterForm.controls.policyType.value].viewValue,
        sumInsured: this.policyProposalLetterForm.controls.sumInsured.value,
        types: '',
        coverage: null,
        unit: ''
      });
      this.dataSource = new MatTableDataSource<PolicyProposalLettter>(this.elementData);
    } else {
      this.showTable = false;
    }
  }

  // on click on add on policy-add on
  addRecordAddOn() {
    if (this.policyProposalLetterForm.controls.policyType.value !== ''
      || this.policyProposalLetterForm.controls.sumInsured.value !== ''
      || this.policyProposalLetterForm.controls.buildingType.value !== ''
      || this.policyProposalLetterForm.controls.assestsType.value !== ''
      || this.policyProposalLetterForm.controls.coverage.value !== ''
      || this.policyProposalLetterForm.controls.unit.value !== '') {

      const length = this.dataSource.data.length;
      const type = this.policyProposalLetterForm.controls.buildingType.value;
      this.showTable = true;
      let typeValue;
      let isCaseInTransitInsurance;

      if (type === '0' || type === '1') {
        typeValue = this.buildingTypeList[type].viewValue;
      } else {
        typeValue = this.assestsTypeNameList[this.policyProposalLetterForm.controls.assestsType.value].viewValue;
      }

      if (length !== 0) {
        if (this.dataSource.data[length - 1].policyType === 'Case-In-Transit Insurance') {
          if (this.policyProposalLetterForm.controls.policyType.value === '3') {
            isCaseInTransitInsurance = true;
          }
        } else {
          isCaseInTransitInsurance = false;
        }

      }


      if (isCaseInTransitInsurance) {
        this.elementData.push({
          policyType: this.policyTypeList[this.policyProposalLetterForm.controls.policyType.value].viewValue,
          sumInsured: '',
          types: typeValue,
          coverage: Number(this.policyProposalLetterForm.controls.coverage.value),
          unit: this.unitList[this.policyProposalLetterForm.controls.unit.value].viewValue,
        });
        this.dataSource = new MatTableDataSource<PolicyProposalLettter>(this.elementData);
      } else {
        this.elementData.push({
          policyType: this.policyTypeList[this.policyProposalLetterForm.controls.policyType.value].viewValue,
          sumInsured: this.policyProposalLetterForm.controls.sumInsured.value,
          types: typeValue,
          coverage: Number(this.policyProposalLetterForm.controls.coverage.value),
          unit: this.unitList[this.policyProposalLetterForm.controls.unit.value].viewValue,
        });
        this.dataSource = new MatTableDataSource<PolicyProposalLettter>(this.elementData);
      }

    } else {
      this.showTable = false;
    }
  }

  // select taluka on basis of district
  selectDistrict() {
    const district = this.policyProposalLetterForm.value.district;
    if (district !== '' && district != null) {
      this.talukaNameList = this.talukaList.filter(
        searchBy => searchBy.district.toLowerCase() === district.toLowerCase());
    }
  }

  // reset policy details value
  resetPolicyDetails() {
    this.policyProposalLetterForm.patchValue({
      policyType: [''],
      sumInsured: [''],
    });
  }

  // reset policy add-on-form
  resetPolicyAddOnDetails() {
    this.policyProposalLetterForm.patchValue({
      buildingType: [''],
      assestsType: [''],
      coverage: [''],
      unit: [''],
    });
  }

  // on click on submit
  onSubmit() {
    const dialogRef = this.dialog.open(PolicyProposalSubmissionComponent,
      { width: '550px', height: '180px' }
    );
  }

  // reset form
  resetForm() {
    this.policyProposalLetterForm.reset();
  }


  // On selection
  ontoken(index) {
    if (index.value === '3') {
      this.isTokentable = true;
      this.premiumDetailsForm.patchValue({
        challanNo: '1856',
        challanDate: new Date('07/18/2020'),
        challaAmount: '10000.00'
      });
    } else {
      this.isTokentable = false;
    }
    if (index.value === '2' || index.value === '1') {
      this.isTokentableOPEN = true;
      this.premiumDetailsForm.patchValue({
        receiptNo: '11246254',
        receiptDate: new Date('07/17/2020'),
      });

    } else {
      this.isTokentableOPEN = false;
    }
  }

  onSelect(value) {
    if (value) {
      this.router.navigate(['./doi/policy-type']);
    }
  }
}
