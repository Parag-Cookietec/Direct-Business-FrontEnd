import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';

@Component({
  selector: 'app-add-det-or-lon-mgmt',
  templateUrl: './add-det-or-lon-mgmt.component.html',
  styleUrls: ['./add-det-or-lon-mgmt.component.css']
})
export class AddDetOrLonMgmtComponent implements OnInit {
  errorMessages = dmoMessage;

  addForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
 formObj:any;

  constructor(private fb: FormBuilder, private router: Router,private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
      this.formObj = navigation.extras;
   }

  ngOnInit() {
    this.addForm = this.fb.group({
      deptName: [this.formObj.element.deptName],
      insName: [this.formObj.formBuilder.instituteName],
      lettNo: [this.formObj.formBuilder.letterNo],
      lettDate: [this.formObj.formBuilder.letterDate],
      loanAmount: [this.formObj.formBuilder.totalAmountRel],
      loanTenure: [''],
      rateOfInterest: [''],
      accNo: [this.formObj.element.accNo],
      tranche: [this.formObj.element.transche],
      startDate: [''],
      penalInt: [''],
      moratoriumPeriod: [''],
      percentPrinc: [''],
      principalInstalmentsInYear: [''],
      principalTotalNoOfInstalments: [''],
      firstInsDate: [''],
      interestInstalmentsInYear: [''],
      firstInsDate2: [''],
    });
  }
  Submit(){
    this.institutionalloandetailsService.getMemoGenerationDetails().subscribe((res) => {
     if (res && res['status'] === 200 && res['result'] !== '') {
    //   this.DepartmentNames = res['result'];
       console.log(res['result']);
     }
   },
     (err) => {
       this.toaster.error(err);
     });

this.institutionalloandetailsService.addDetailsLoanManagement().subscribe((res) => {
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
