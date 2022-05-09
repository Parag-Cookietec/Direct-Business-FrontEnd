import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';
import { instituteLetterDetails } from '../model/institutional-loan';


@Component({
  selector: 'app-chk-de-recevdfrm-inst',
  templateUrl: './chk-de-recevdfrm-inst.component.html',
  styleUrls: ['./chk-de-recevdfrm-inst.component.css']
})
export class ChkDeRecevdfrmInstComponent implements OnInit {

  // Entry Field Details
  chNo_List: CommonListing[] = [ ];

  detailsForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  chNoCtrl: FormControl = new FormControl;
  errorMessages = dmoMessage;
  loanDetails:any;
  InstituteLetDetails:instituteLetterDetails;

  // table data
  Element_Data: any[] = [];

  dataSource = new MatTableDataSource<any>(this.Element_Data);
  displayedColumns: any[] = [
    'position',
    'deptName',
    'refNo',
    'refDate',
    'transche',
    'accNo',
    'purpose',
    'amt',
    'action',
  ];

  constructor(private fb: FormBuilder, private router: Router,
   private institutionalloandetailsService:InstitutionalloandetailsService,
   private toaster: ToastrService) { 
    // this.getChequeDetailsRecived();
   }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      chNo: [''],
      refrenceDate: [''],
      instituteName: [''],
      totalAmountRel: [''],
      letterNo: [''],
      letterDate: [''],
      refrenceNo: [''],
      // refrenceDate: [''],
      chequeNo: [''],
      chequeDate: [''],
      utrNo: [''],
      utrDate: [''],
      departmentName:[''],
      transactionDesc:[''],
      loanAccNumber:[''],
      loanPurpose:[''],
      loanAmount:['']
    });
    this.getAllRef();
  }

  saveOrUpdateInstitutionalLoan() {
    this.institutionalloandetailsService.saveOrUpdateInstitutionalLoan(this.InstituteLetDetails).subscribe((res) => {
        if (res && res['status'] === 200 && res['result'] !== '') {
            this.loanDetails = res['result'];
            console.log(this.loanDetails);
        }
    },
        (err) => {
            this.toaster.error(err);
        });
        
        
}

getByRef(refNo) {
  this.institutionalloandetailsService.getByRef(refNo.value).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
          this.loanDetails = res['result'];
          console.log(this.loanDetails);
          this.detailsForm.patchValue(res['result']);

this.Element_Data =[{
      deptName: this.detailsForm.value.departmentName,
      refNo: this.detailsForm.value.refrenceNo,
      refDate: this.detailsForm.value.refrenceDate,
      transche:this.detailsForm.value.transactionDesc,
      accNo:this.detailsForm.value.loanAccNumber,
      purpose:this.detailsForm.value.loanPurpose,
      amt:this.detailsForm.value.loanAmount
    },
  ];
  this.dataSource = new MatTableDataSource<any>(this.Element_Data);

      }
  },
      (err) => {
          this.toaster.error(err);
      });
}

  getAllRef() {
    this.institutionalloandetailsService.getAllRef().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.chNo_List = res['result'];
        console.log(this.chNo_List);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
    }

    onAddDetails(row) {
      var formObj:any = {
        element : row,
        formBuilder : this.detailsForm.value
      }
      this.router.navigate(['./dashboard/dmo/institutional-loan/cheque-details-received-institute/add'], formObj);
    }
}
