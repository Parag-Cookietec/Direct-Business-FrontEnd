import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';

@Component({
  selector: 'app-update-inst-let-det',
  templateUrl: './update-inst-let-det.component.html',
  styleUrls: ['./update-inst-let-det.component.css']
})
export class UpdateInstLetDetComponent implements OnInit {

  letterForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  errorMessages = dmoMessage;
  loanMemo: any;
  InstituteNames;
  ReferenceNumbers;
  nameOfInstituteCtrl: FormControl = new FormControl;
  refrenceNoCtrl: FormControl = new FormControl;

  constructor(private fb: FormBuilder, private router: Router,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.letterForm = this.fb.group({
      nameOfInstitute: [''],
      refrenceNo: [''],
      amtReleased: [''],
      lettNo: [''],
      lettDate: [''],
    });
    this.getAllInstituteNames();
  }

  getInstitutionalLoanMemo() {
    this.institutionalloandetailsService.getInstitutionalLoanMemo().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.loanMemo = res['result'];
        console.log(this.loanMemo);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  getAllInstituteNames() {
    debugger;
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

  GetReferenceByInstitute(insId) {
    debugger;
    this.institutionalloandetailsService.GetReferenceByInstitute(insId.value).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.ReferenceNumbers = res['result'];
        console.log(this.ReferenceNumbers);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }
}
