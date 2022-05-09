import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonList } from 'src/app/modules/core/common/model/common-listing';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/dmo/dmo-msg.constants';
import { setAdviceMasterObject, updateAdviceMasterObject } from '../../model/masters.data-model';
import { MastersService } from '../../services/masters.service';
import { ToastMsgService } from '../../services/toast.service';

// import { setAdviceMasterObject, updateAdviceMasterObject } from '../../../model/masters.data-model';
// import { MastersService } from '../../../services/masters.service';
// import { ToastMsgService } from '../../../services/toast.service';


@Component({
  selector: 'app-advice-master-add',
  templateUrl: './advice-master-add.component.html',
  styleUrls: ['./advice-master-add.component.css']
})
export class AdviceMasterAddComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() childMessage: string;
  
  todayDate = new Date();
  adviceMasterAddForm: FormGroup;
  errorMessages = dmoMessage;
  adviceMasterDPObj: any;
  MasterDPObj: any;
  MasterRowObj: any;
  MasterIdObj: any;
  adviceCode1: string;
  adviceBy1: string;
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
    this.adviceCode1 =this.MasterDPObj.adviceCode;
    this.adviceBy1 =this.MasterDPObj.adviceBy;
    }
    console.log(this.MasterRowObj);
    if(this.MasterRowObj== "view"){
      this.isShown = ! this.isShown;
    }
    this.initForm();
    // On Value change premium amount would changed
    //this.adviceMasterAddForm.get('adviceCode').patchValue(this.adviceMasterDPObj.adviceCode);
   // this.adviceMasterAddForm.get('adviceBy').patchValue(this.adviceMasterDPObj.adviceBy);
  
  }

  ngOnDestroy() {
    this._MasterAddService.setDPData(null);
  }

  initForm() {
    this.adviceMasterAddForm = this.fb.group({
      adviceCode: ['', Validators.required],
      adviceBy: ['', Validators.required],
    });
  }

  getAdviceMasterDetails() {
    const reqObj = {};
    this._MasterAddService.fetchAdvicemasterList(reqObj).subscribe(res => {
      if (res && res['result'] && res['status'] === 200) {}
    })
  }

  onSubmit() {

    console.log(this.MasterRowObj);
    if(this.MasterRowObj== "update"){

    if(this.adviceMasterAddForm.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '360px',
        data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          console.log(this.childMessage);
              console.log(this.adviceMasterAddForm.getRawValue());
              const reqObj = updateAdviceMasterObject(this.adviceMasterAddForm.getRawValue(), this.MasterIdObj);
              console.log('reqObj ==>', reqObj);
              this._MasterAddService.saveAdvicemaster(reqObj).subscribe(res => {
                console.log('res ==>', res);
                if (res && res['result'] && res['status'] === 200) {
                  this._toast.success('Data update successfully.');
                  this.router.navigate(['dashboard/dmo/advice-master']);
                }
              }, error => {
                this._toast.error('Something went wrong.');
              });
            }
          });
        
      
    } else {
      this.adviceMasterAddForm.markAllAsTouched();
    }
  }

  else{
    if(this.adviceMasterAddForm.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '360px',
        data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          console.log(this.childMessage);
              console.log(this.adviceMasterAddForm.getRawValue());
              const reqObj = setAdviceMasterObject(this.adviceMasterAddForm.getRawValue(), this.adviceMasterDPObj);
              console.log('reqObj ==>', reqObj);
              this._MasterAddService.saveAdvicemaster(reqObj).subscribe(res => {
                console.log('res ==>', res);
                if (res && res['result'] && res['status'] === 200) {
                  this._toast.success('Data submitted successfully.');
                  this.router.navigate(['dashboard/dmo/advice-master']);
                }
              }, error => {
                this._toast.error('Something went wrong.');
              });
            }
          });
        
      
    } else {
      this.adviceMasterAddForm.markAllAsTouched();
    }

  }

  }

  goToListing() {
    this.router.navigate(['./dashboard/dmo/advice-master']);
}

  onClose() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '360px',
      data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.router.navigate(['dashboard/dmo/advice-master']);
      }
    })
  }
}
