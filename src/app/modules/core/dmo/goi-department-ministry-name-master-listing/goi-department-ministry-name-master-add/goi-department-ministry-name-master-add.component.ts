import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonList } from 'src/app/modules/core/common/model/common-listing';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/dmo/dmo-msg.constants';
import { setGoiDepartmentMinistryNameMasterObject, updateGoiDepartmentMinistryNameMasterObject } from '../../model/masters.data-model';


import { MastersService } from '../../services/masters.service';
import { ToastMsgService } from '../../services/toast.service';


@Component({
  selector: 'app-goi-department-ministry-name-master-add',
  templateUrl: './goi-department-ministry-name-master-add.component.html',
  styleUrls: ['./goi-department-ministry-name-master-add.component.css']
})
export class GOIDepartmentMinistryNameMasterAddComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() childMessage: string;
  
  todayDate = new Date();
  goiDepartmentMinistryNameMasterForm: FormGroup;
  errorMessages = dmoMessage;
  MasterDPObj: any;
  MasterRowObj: any;
  MasterIdObj: any;
  departmentMinistryName1:string;
  
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
    this.departmentMinistryName1 =this.MasterDPObj.departmentMinistryName;
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
    this.goiDepartmentMinistryNameMasterForm = this.fb.group({
      departmentMinistryName: ['', Validators.required],
    });
  }

  getAdviceMasterDetails() {
    const reqObj = {};
    this._MasterAddService.fetchGoiDepartmentMinistryNameMasterList(reqObj).subscribe(res => {
      if (res && res['result'] && res['status'] === 200) {}
    })
  }

  onSubmit() {
    console.log(this.MasterRowObj);
    if(this.MasterRowObj== "update"){
    
      if(this.goiDepartmentMinistryNameMasterForm.valid) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '360px',
          data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'yes') {
            console.log(this.childMessage);
                console.log(this.goiDepartmentMinistryNameMasterForm.getRawValue());
                const reqObj = updateGoiDepartmentMinistryNameMasterObject(this.goiDepartmentMinistryNameMasterForm.getRawValue(), this.MasterIdObj);
                console.log('reqObj ==>', reqObj);
                this._MasterAddService.saveGoiDepartmentMinistryNameMaster(reqObj).subscribe(res => {
                  console.log('res ==>', res);
                  if (res && res['result'] && res['status'] === 200) {
                    this._toast.success('Data updated successfully.');
                    this.router.navigate(['dashboard/dmo/goi-department-ministry-name-master-listing']);
                  }
                }, error => {
                  this._toast.error('Something went wrong.');
                });
              }
            });
          
        
      } else {
        this.goiDepartmentMinistryNameMasterForm.markAllAsTouched();
      }
    
    }
    else{

    if(this.goiDepartmentMinistryNameMasterForm.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '360px',
        data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          console.log(this.childMessage);
              console.log(this.goiDepartmentMinistryNameMasterForm.getRawValue());
              const reqObj = setGoiDepartmentMinistryNameMasterObject(this.goiDepartmentMinistryNameMasterForm.getRawValue(), this.MasterDPObj);
              console.log('reqObj ==>', reqObj);
              this._MasterAddService.saveGoiDepartmentMinistryNameMaster(reqObj).subscribe(res => {
                console.log('res ==>', res);
                if (res && res['result'] && res['status'] === 200) {
                  this._toast.success('Data submitted successfully.');
                  this.router.navigate(['dashboard/dmo/goi-department-ministry-name-master-listing']);
                }
              }, error => {
                this._toast.error('Something went wrong.');
              });
            }
          });
        
      
    } else {
      this.goiDepartmentMinistryNameMasterForm.markAllAsTouched();
    }
  }

  }

  goToListing() {
    this.router.navigate(['./dashboard/dmo/goi-department-ministry-name-master-listing']);
}

  onClose() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '360px',
      data: msgConst.CONFIRMATION_DIALOG.CONFIRMATION
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.router.navigate(['dashboard/dmo/goi-department-ministry-name-master-listing']);
      }
    })
  }
}
