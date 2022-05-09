import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonList } from 'src/app/modules/core/common/model/common-listing';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/dmo/dmo-msg.constants';
import { setInstituteMasterObject, updateInstituteMasterObject } from '../../model/masters.data-model';
import { MastersService } from '../../services/masters.service';
import { ToastMsgService } from '../../services/toast.service';



@Component({
  selector: 'app-institute-master-listing-add',
  templateUrl: './institute-master-listing-add.component.html',
  styleUrls: ['./institute-master-listing-add.component.css']
})
export class InstituteMasterComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() childMessage: string;
  
  todayDate = new Date();
  instituteNameMasterForm: FormGroup;
  errorMessages = dmoMessage;
  nameOfinstitute:string;
  MasterDPObj: any;
  MasterRowObj:any;
  MasterIdObj:any;
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
   
    this.nameOfinstitute =this.MasterDPObj;

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
    this.instituteNameMasterForm = this.fb.group({
      nameOfinstitute: ['', Validators.required],
    });
  }

  getInstituteMasterDetails() {
    const reqObj = {};
    this._MasterAddService.fetchInstituteMasterList(reqObj).subscribe(res => {
      if (res && res['result'] && res['status'] === 200) {}
    })
  }

  onSubmit() {

    console.log(this.MasterRowObj);
    if(this.MasterRowObj== "update"){

      if(this.instituteNameMasterForm.valid) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '360px',
          data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'yes') {
           
                console.log(this.instituteNameMasterForm.getRawValue());
                const reqObj = updateInstituteMasterObject(this.instituteNameMasterForm.getRawValue(), this.MasterIdObj);
                console.log('reqObj ==>', reqObj);
                this._MasterAddService.saveInstituteMaster(reqObj).subscribe(res => {
                  console.log('res ==>', res);
                  if (res && res['result'] && res['status'] === 200) {
                    this._toast.success('Data Updated successfully.');
                    this.router.navigate(['dashboard/dmo/institute-master-listing']);
                  }
                }, error => {
                  this._toast.error('Something went wrong.');
                });
              }
            });
          
        
      } else {
        this.instituteNameMasterForm.markAllAsTouched();
      }

    }
    else{

    if(this.instituteNameMasterForm.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '360px',
        data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
         
              console.log(this.instituteNameMasterForm.getRawValue());
              const reqObj = setInstituteMasterObject(this.instituteNameMasterForm.getRawValue(), this.MasterDPObj);
              console.log('reqObj ==>', reqObj);
              this._MasterAddService.saveInstituteMaster(reqObj).subscribe(res => {
                console.log('res ==>', res);
                if (res && res['result'] && res['status'] === 200) {
                  this._toast.success('Data submitted successfully.');
                  this.router.navigate(['dashboard/dmo/institute-master-listing']);
                }
              }, error => {
                this._toast.error('Something went wrong.');
              });
            }
          });
        
      
    } else {
      this.instituteNameMasterForm.markAllAsTouched();
    }
  }

  }

  goToListing() {
    this.router.navigate(['./dashboard/dmo/institute-master-listing']);
}

  onClose() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '360px',
      data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.router.navigate(['dashboard/dmo/institute-master-listing']);
      }
    })
  }
}
