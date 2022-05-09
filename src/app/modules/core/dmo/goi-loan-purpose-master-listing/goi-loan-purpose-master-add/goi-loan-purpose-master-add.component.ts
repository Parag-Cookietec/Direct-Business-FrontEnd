import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonList } from 'src/app/modules/core/common/model/common-listing';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/dmo/dmo-msg.constants';
import { setGoiLoanPurposeMasterObject, updateGoiLoanPurposeMasterObject } from '../../model/masters.data-model';
import { MastersService } from '../../services/masters.service';
import { ToastMsgService } from '../../services/toast.service';



@Component({
  selector: 'app-goi-loan-purpose-master-add',
  templateUrl: './goi-loan-purpose-master-add.component.html',
  styleUrls: ['./goi-loan-purpose-master-add.component.css']
})
export class GoiLoanPurposeMasterComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() childMessage: string;
  
  todayDate = new Date();
  goiLoanPurposeMasterForm: FormGroup;
  errorMessages = dmoMessage;
  MasterDPObj: any;
  MasterRowObj: any;
  MasterIdObj: any;
  loanPurpose:string;
  planSchemeName:string;
  isShown: boolean = true; 

  constructor(private fb: FormBuilder
    , private router: Router
    , private _MasterAddService: MastersService
    , private _toast: ToastMsgService
    , private dialog: MatDialog) { }

  ngOnInit() {
    this.MasterDPObj = this._MasterAddService.getDPObj();
    this.MasterRowObj = this._MasterAddService.getRowData();
    this.MasterIdObj= this._MasterAddService.getId();
   
    if(this.MasterRowObj != "add"){
    this.loanPurpose =this.MasterDPObj.loanPurpose;
    this.planSchemeName =this.MasterDPObj.planSchemeName;
    }
    if(this.MasterRowObj== "view"){
      this.isShown = ! this.isShown;
    }
    this.initForm();
    // On Value change premium amount would changed
    //this.adviceMasterAddForm.get('adviceCode').patchValue(this.MasterDPObj.adviceCode);
   // this.adviceMasterAddForm.get('adviceBy').patchValue(this.MasterDPObj.adviceBy);
  
  }

  ngOnDestroy() {
    this._MasterAddService.setDPData(null);
  }

  initForm() {
    this.goiLoanPurposeMasterForm = this.fb.group({
      loanPurpose: ['', Validators.required],
      planSchemeName: ['', Validators.required],
    });
  }

  getLoanPurposeDetails() {
    const reqObj = {};
    this._MasterAddService.fetchGoiLoanPurposeMasterList(reqObj).subscribe(res => {
      if (res && res['result'] && res['status'] === 200) {}
    })
  }

  onSubmit() {
    console.log(this.MasterRowObj);
    if(this.MasterRowObj== "update"){

      if(this.goiLoanPurposeMasterForm.valid) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '360px',
          data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'yes') {        
                console.log(this.goiLoanPurposeMasterForm.getRawValue());
                const reqObj = updateGoiLoanPurposeMasterObject(this.goiLoanPurposeMasterForm.getRawValue(), this.MasterIdObj);
                console.log('reqObj ==>', reqObj);
                this._MasterAddService.saveGoiLoanPurposeMasterList(reqObj).subscribe(res => {
                  console.log('res ==>', res);
                  if (res && res['result'] && res['status'] === 200) {
                    this._toast.success('Data updated successfully.');
                    this.router.navigate(['dashboard/dmo/goi-loan-purpose-master-listing']);
                  }
                }, error => {
                  this._toast.error('Something went wrong.');
                });
              }
            });
          
        
      } else {
        this.goiLoanPurposeMasterForm.markAllAsTouched();
      }
      

    }
    else{

    if(this.goiLoanPurposeMasterForm.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '360px',
        data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {        
              console.log(this.goiLoanPurposeMasterForm.getRawValue());
              const reqObj = setGoiLoanPurposeMasterObject(this.goiLoanPurposeMasterForm.getRawValue(), this.MasterDPObj);
              console.log('reqObj ==>', reqObj);
              this._MasterAddService.saveGoiLoanPurposeMasterList(reqObj).subscribe(res => {
                console.log('res ==>', res);
                if (res && res['result'] && res['status'] === 200) {
                  this._toast.success('Data submitted successfully.');
                  this.router.navigate(['dashboard/dmo/goi-loan-purpose-master-listing']);
                }
              }, error => {
                this._toast.error('Something went wrong.');
              });
            }
          });
        
      
    } else {
      this.goiLoanPurposeMasterForm.markAllAsTouched();
    }
  }

  }

  goToListing() {
    this.router.navigate(['./dashboard/dmo/goi-loan-purpose-master-listing']);
}

  onClose() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '360px',
      data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.router.navigate(['dashboard/dmo/goi-loan-purpose-master-listing']);
      }
    })
  }
}
