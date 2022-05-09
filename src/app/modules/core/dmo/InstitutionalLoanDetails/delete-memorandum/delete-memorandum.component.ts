import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';


@Component({
  selector: 'app-delete-memorandum',
  templateUrl: './delete-memorandum.component.html',
  styleUrls: ['./delete-memorandum.component.css']
})
export class DeleteMemorandumComponent implements OnInit {

  // Entry Field Details
  memoNo_List: CommonListing[] = [];
 
  deleteForm: FormGroup;
  memoNoCtrl: FormControl = new FormControl;
  maxDate = new Date();
  todayDate = Date.now();
  errorMessages = dmoMessage;
  memoNo;

  constructor(private fb: FormBuilder, private router: Router,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.deleteForm = this.fb.group({
      memoNo: [''],
    });
    this.GetAllMemo();
  }
  deleteMemo() {
    this.institutionalloandetailsService.DeleteMemorandum(this.memoNo).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        //this.loanMemo = res['result'];
        console.log("sucessfully deleted");
        this.GetAllMemo();
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetAllMemo() {
    this.institutionalloandetailsService.getAllMemos().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.memoNo_List = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  selectedId(memoNo){
    this.memoNo=memoNo.value;
  }
}
