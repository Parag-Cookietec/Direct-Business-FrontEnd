import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';
import { instituteLetterDetails, instLoanRecievedModel } from '../../model/institutional-loan';

@Component({
  selector: 'app-inst-loan-receved-add',
  templateUrl: './inst-loan-receved-add.component.html',
  styleUrls: ['./inst-loan-receved-add.component.css']
})
export class InstLoanRecevedAddComponent implements OnInit {

  element:instLoanRecievedModel;
  insName_List: CommonListing[] = [
    { value: '1', viewValue: 'NABARD' },
    { value: '2', viewValue: 'NCDC' },
    { value: '3', viewValue: 'OBC' },
    { value: '4', viewValue: 'SBI' },
    { value: '5', viewValue: 'Other' },
  ];

  appDesig_List: CommonListing[] = [
    { value: '1', viewValue: 'Accounts Officer' },
  ];

  dept_List: CommonListing[] = [
    { value: '1', viewValue: 'Finance Department' },
    { value: '2', viewValue: 'Agriculture Department' },
  ];
  letterForm: FormGroup;
  loanReceivedForm: FormGroup;
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
  InstituteName;
  DepartmentName;

  // table data
  Element_Data: any[] = [
    {
      deptName: '',
      refNo: '',
      refDate: '',
      transche: '',
      scheme: '',
      purpose: '',
      amt: null,
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

  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private datePipe: DatePipe,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) {
      const navigation = this.router.getCurrentNavigation();
      this.element = navigation.extras as instLoanRecievedModel;
     }

    ngOnInit() {
      this.letterForm = this.fb.group({
        instituteId: [null, Validators.required],
        totalAmountRel: [null, Validators.required],
        letterNo: ['', Validators.required],
        letterDate: ['', Validators.required],
        loanROI: [null, Validators.required],
        approvalAuth: ['', Validators.required],
        authDesignationId: [null, Validators.required],
        departmentId: [null, Validators.required],
        loanAmount: [null, Validators.required],
        loanPurpose: ['', Validators.required],
        planSchemeName: ['', Validators.required],
        refrenceDate: ['', Validators.required],
        refrenceNo: ['', Validators.required],
        transactionDesc: ['', Validators.required],
        sanctionOrderDate:[this.element.adviceDate],
        adviceBy:[this.element.adviceBy],
        adviceDate:[this.element.adviceDate, Validators.required],
        adviceNo:[this.element.adviceNo, Validators.required],
        departmentName:[this.DepartmentName],
        dpSheetId:[this.element.parentDpSheetId],
        dpSheetRecDate:[this.element.dpSheetReciveDate],
        // sanctionOrderDate:[],
        // adviceBy:[],
        // adviceDate:['', Validators.required],
        // adviceNo:['', Validators.required],
        // departmentName:[],
        // dpSheetId:[],
        // dpSheetRecDate:[],
        instituteName:[this.InstituteName],
        isLoanOlder:[0],
        
      });
     this.getAllDesignationNames();
     this.getAllInstituteNames();
     this.getAllDepartmentNames();
    }

  getDetails() {
    this.isDetails = true;
  }
  setInstituteName(selectedInstitueName :MatSelectChange) {
    debugger;
    this.InstituteName = selectedInstitueName.source.triggerValue;
  }

  setDepartmentName(selectedDepartmentName :MatSelectChange) {
    debugger;
    this.DepartmentName = selectedDepartmentName.source.triggerValue;
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
    this.letterForm.value.refrenceDate = this.letterForm.value.refrenceDate.toISOString();//this.datePipe.transform(this.letterForm.value.refrenceDate, 'yyyy-MM-dd');
    
    this.letterForm.value.sanctionOrderDate = this.letterForm.value.refrenceDate;
    this.letterForm.value.letterDate = this.datePipe.transform(this.letterForm.value.letterDate, 'yyyy-MM-dd');
    this.letterForm.value.departmentName = this.DepartmentName;
    this.letterForm.value.instituteName = this.InstituteName;

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
     this.institutionalloandetailsService.saveOrUpdateInstitutionalLoan(JSON.stringify(this.letterForm.value)).subscribe((res) => {
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
