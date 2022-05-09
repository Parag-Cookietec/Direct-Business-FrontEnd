import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';
import { instituteLetterDetails } from '../model/institutional-loan';

@Component({
  selector: 'app-institute-letter-details',
  templateUrl: './institute-letter-details.component.html',
  styleUrls: ['./institute-letter-details.component.css']
})
export class InstituteLetterDetailsComponent implements OnInit {
  insName_List: CommonListing[] = [
    { value: '1', viewValue: 'Name 1' },
    { value: '2', viewValue: 'Name 2' },
  ];

  appDesig_List: CommonListing[] = [
    { value: '1', viewValue: 'Designation' },
  ];

  dept_List: CommonListing[] = [
    { value: '1', viewValue: 'Finance Department' },
    { value: '2', viewValue: 'Agriculture Department' },
  ];

  letterForm: FormGroup;
  isDetails = false;
  maxDate = new Date();
  todayDate = Date.now();
  insNameCtrl: FormControl = new FormControl;
  appDesigCtrl: FormControl = new FormControl;
  errorMessages = dmoMessage;
  DesignationNames: CommonListing[];
  InstituteNames: CommonListing[];
  DepartmentNames: CommonListing[];
  InstituteLetDetails:instituteLetterDetails;


  // table data
  Element_Data: any[] = [
    {
      deptName: '',
      refNo: '',
      refDate: '',
      transche: '',
      scheme: '',
      purpose: '',
      amt: '',
    },

  ];

  dataSource = new MatTableDataSource<any>(this.Element_Data);
  displayedColumns: any[] = [
    'position',
    'deptName',
    'refNo',
    'refDate',
    'transche',
    'scheme',
    'purpose',
    'amt',
    'action',
  ];

  constructor(private fb: FormBuilder, private router: Router,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.letterForm = this.fb.group({
      instituteId: ['', Validators.required],
      totalAmountRel: ['', Validators.required],
      letterNo: ['', Validators.required],
      letterDate: ['', Validators.required],
      loanROI: ['', Validators.required],
      approvalAuth: ['', Validators.required],
      authDesignationId: ['', Validators.required],
      departmentId: ['', Validators.required],
      loanAmount: ['', Validators.required],
      loanPurpose: ['', Validators.required],
      planSchemeName: ['', Validators.required],
      refrenceDate: ['', Validators.required],
      refrenceNo: ['', Validators.required],
      transactionDesc: ['', Validators.required],
      sanctionOrderDate:['test'],
      adviceBy:[],
      adviceDate:[],
      adviceNo:[],
      departmentName:[],
      dpSheetId:[],
      dpSheetRecDate:[],
      instituteName:[],
      isLoanOlder:[0]      
    });
   this.getAllDesignationNames();
   this.getAllInstituteNames();
   this.getAllDepartmentNames();
  }

  getDetails() {
    this.isDetails = true;
  }

  OnSubmit() {
    // this.InstituteLetDetails.approvalAuth=this.letterForm.value.authName;
    // this.InstituteLetDetails.authDesignationId=this.letterForm.value.appDesig;
    // this.InstituteLetDetails.departmentId =this.Element_Data[0].deptName;
    // this.InstituteLetDetails.instituteId=this.letterForm.value.insName;
    // this.InstituteLetDetails.letterDate=this.letterForm.value.lettDate;
    // this.InstituteLetDetails.letterNo=this.letterForm.value.lettDate;
    // this.InstituteLetDetails.loanAmount=this.Element_Data[0].amt;
    // this.InstituteLetDetails.loanPurpose=this.Element_Data[0].purpose;
    // this.InstituteLetDetails.loanROI=this.letterForm.value.interestRate;
    // this.InstituteLetDetails.planSchemeName=this.Element_Data[0].scheme;
    // this.InstituteLetDetails.refrenceDate=this.Element_Data[0].refDate;
    // this.InstituteLetDetails.refrenceNo=this.Element_Data[0].refNo;
    // this.InstituteLetDetails.totalAmountRel=this.letterForm.value.amtReleased;
    // this.InstituteLetDetails.transactionDesc=this.Element_Data[0].transche;
    debugger;

    this.saveOrUpdateInstitutionalLoan();
  }

  getAllDesignationNames() {
    this.institutionalloandetailsService.getAllDesignationNames().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.DesignationNames = res['result'];
        console.log(this.DesignationNames);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  getAllInstituteNames() {
    this.institutionalloandetailsService.getAllInstituteNames().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.InstituteNames = res['result'];
        console.log(this.InstituteNames);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  getAllDepartmentNames() {
    this.institutionalloandetailsService.getAllDepartmentNames().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.DepartmentNames = res['result'];
        console.log(this.DepartmentNames);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }
  saveOrUpdateInstitutionalLoan(){
     this.institutionalloandetailsService.saveOrUpdateInstitutionalLoan(this.letterForm.getRawValue()).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
     //   this.DepartmentNames = res['result'];
        console.log(res['result']);
      }
    },
      (err) => {
        this.toaster.error(err);
      });

  }
}
