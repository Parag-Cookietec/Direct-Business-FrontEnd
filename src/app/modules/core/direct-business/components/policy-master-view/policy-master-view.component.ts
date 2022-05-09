import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonListing } from 'src/app/model/common-listing';
import { PolicyOfferView, PaymentDetails } from '../../models/doiModel';

@Component({
  selector: 'app-policy-master-view',
  templateUrl: './policy-master-view.component.html',
  styleUrls: ['./policy-master-view.component.css']
})
export class PolicyMasterViewComponent implements OnInit {

  // date
  todayDate = new Date();
  //  variables
  policyNo = 786548;
  totalAmount = null;
  discountValue = null;
  taxes = null;
  grandTotalValue = null;

  // form group
  masterPolicyForm: FormGroup;
  paymentDetailsForm: FormGroup;

  // form control
  referenceNoCtrl: FormControl = new FormControl();

  // lists start
  referenceNoList: CommonListing[] = [
    { value: '1', viewValue: 'DOI/DB/19-20/E0091' },
    { value: '2', viewValue: 'DOI/DB/19-20/E0098' },
    { value: '3', viewValue: 'DOI/DB/19-20/E0102' },
    { value: '4', viewValue: 'DOI/DB/19-20/E0110' },
  ];
  // lists end

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
  dataSource = new MatTableDataSource<PolicyOfferView>(this.elementData);
  // table data end

  // table data start( payment details)
  displayedColumnsPayment: string[] = [
    'position',
    'paymentType',
    'paymentDate',
    'bankName',
    'chequeDdDate',
    'chequeDdNo',
  ];
  elementData1: PaymentDetails[] = [
    {
      paymentType: 'Cheque',
      paymentDate: new Date('05/10/2019'),
      bankName: 'State Bank Of India',
      chequeDdDate: new Date('05/10/2019'),
      chequeDdNo: '76890',
    }
  ];
  dataSourcePayment = new MatTableDataSource<PaymentDetails>(this.elementData1);
  // table data start( payment details) end

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // constrictor
  constructor(private fb: FormBuilder, private dialog: MatDialog, private router: Router, private decimalPipe: DecimalPipe) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.totalAmount = Number(this.calculatePremiumAmountAddOn()) + Number(this.calculatePremiumAmount());
    this.discountValue = 0;
    this.taxes = ((Number(this.totalAmount) - Number(this.discountValue)) * 18) / 100;
    this.grandTotalValue = this.decimalPipe.transform((Number(this.totalAmount) + Number(this.taxes)), '1.2-2');
    this.masterPolicyForm = this.fb.group({
      referenceNo: [{ value: '1', disabled: true }],
      referenceDate: [{ value: new Date('05/01/2019'), disabled: true }],
      policyNo: [{ value: this.policyNo, disabled: true }],
      instituteType: [{ value: 'Govt. Department', disabled: true }],
      instituteName: [{ value: 'Civil Department', disabled: true }],
      district: [{ value: 'Bharuch', disabled: true }],
      taluka: [{ value: 'Dahej', disabled: true }],
      address: [{ value: 'Dahej GIDC,Plot 20,Dahej', disabled: true }],
      contactNo: [{ value: '9876543210', disabled: true }],
      emailId: [{ value: 'example@domain.com', disabled: true }],
      startDate: [{ value: new Date('04/01/2019'), disabled: true }],
      endDate: [{ value: new Date('04/01/2039'), disabled: true }],
      premiumAmount: [{ value: '200,000.00', disabled: true }],
    });

    this.masterPolicyForm.valueChanges.subscribe(() => {
      this.policyNo = Number(this.policyNo) + 1;
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
  }

  // calculate premium amount of add on
  calculatePremiumAmountAddOn() {
    let amount = 0;
    this.dataSource.data.forEach(
      (element) => {
        amount = element.premiumAmountAddOn + amount;
      }
    );
    return amount;
  }

  // calculate premium amount of policy
  calculatePremiumAmount() {
    let amount = 0;
    this.dataSource.data.forEach(
      (element) => {
        amount = element.premiumAmountPolicy + amount;
      }
    );
    return amount;
  }

  // on click on listing
  goToListing() {
    this.router.navigate(['doi/db/policy-master-listing']);
  }

}
