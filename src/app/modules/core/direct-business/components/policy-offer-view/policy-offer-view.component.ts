import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/common/data.service';
import { PolicyOfferView } from '../../models/doiModel';

@Component({
  selector: 'app-policy-offer-view',
  templateUrl: './policy-offer-view.component.html',
  styleUrls: ['./policy-offer-view.component.css']
})
export class PolicyOfferViewComponent implements OnInit {

  // variables
  totalAmount = null;
  discountValue = null;
  taxes = null;
  grandTotalValue = null;
  premiumAmountPolicyValue = null;
  premiumAmountAddOnValue = null;
  isView = false;
  isViewPayment = false;
  // date
  todayDate = new Date();
  // form group
  policyProposalLetterForm: FormGroup;

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

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // constructor
  constructor(private fb: FormBuilder, private dialog: MatDialog, private decimalPipe: DecimalPipe,
    private dataService: DataService, private router: Router) {

    if (dataService.getOption()['policy-proposal-offer'] === 'isView') {
      this.isView = true;
      dataService.setOption('policy-proposal-offer', '');
    } else if (dataService.getOption()['policy-payment'] === 'isViewPayment') {
      this.isViewPayment = true;
      dataService.setOption('policy-payment', '');
    } else {
      this.isView = false;
      this.isViewPayment = false;
    }
  }

  ngOnInit() {
    this.totalAmount = Number(this.calculatePremiumAmountAddOn()) + Number(this.calculatePremiumAmount());
    this.discountValue = 0;
    this.taxes = ((Number(this.totalAmount) - Number(this.discountValue)) * 18) / 100;
    this.grandTotalValue = this.decimalPipe.transform((Number(this.totalAmount) + Number(this.taxes)), '1.2-2');
    this.dataSource.paginator = this.paginator;
    this.policyProposalLetterForm = this.fb.group({
      proposerType: [{ value: 'Govt Department', disabled: true }],
      proposerName: [{ value: 'Civil Department', disabled: true }],
      district: [{ value: 'Bharuch', disabled: true }],
      taluka: [{ value: 'Dahej', disabled: true }],
      address: [{ value: 'Dahej GIDC, Plot 20, Dahej', disabled: true }],
      contactNo: [{ value: '9876543210', disabled: true }],
      email: [{ value: 'example@domain.com', disabled: true }],
    });
  }

  // calculate premium amount add on
  calculatePremiumAmountAddOn() {
    let amount = 0;
    this.dataSource.data.forEach(
      (element) => {
        amount = element.premiumAmountAddOn + amount;
      }
    );
    this.premiumAmountAddOnValue = amount;
    return amount;
  }

  // calculate premium amount
  calculatePremiumAmount() {
    let amount = 0;
    this.dataSource.data.forEach(
      (element) => {
        amount = element.premiumAmountPolicy + amount;
      }
    );
    this.premiumAmountPolicyValue = amount;
    return amount;
  }

  // on click on payment button
  onPaymentClick() {
    this.router.navigate(['doi/db/policy-payment-screen']);
  }

  // if discount amount is entered
  onEnteringDiscount() {
    this.taxes = ((Number(this.totalAmount) - Number(this.discountValue)) * 18) / 100;
    this.grandTotalValue = this.decimalPipe.transform((Number(this.totalAmount) + Number(this.taxes)), '1.2-2');
  }

  // on click on close button
  onClose() {
    this.router.navigate(['doi/db/policy-payment']);
  }


}
