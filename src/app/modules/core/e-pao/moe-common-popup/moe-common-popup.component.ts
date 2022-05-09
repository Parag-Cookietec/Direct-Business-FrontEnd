import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DatePipe } from '@angular/common';
import { DataConst } from 'src/app/shared/constants/common/common-data.constants';
import { CommonService } from 'src/app/modules/services/common.service';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';
import { ToastrService } from 'ngx-toastr';
import { CommonWfMsg, DataConstant, ModuleNames } from '../../common/constant/common-workflow.constants';
import { MESSAGES } from 'src/app/shared/constants/letter-of-credit/message-constants';
import { BehaviorSubject } from 'rxjs';
import { DateLocaleAndFormat } from 'src/app/shared/constants/constants/common/common-data.constants';
import { LcCommonWorkflowService } from '../../letter-of-credit/lc-common-workflow-service/lc-common-workflow.service';
import { LcCommonWorkflowComponent } from '../../letter-of-credit/lc-common-workflow/lc-common-workflow.component';
declare function SetGujarati();
declare function SetEnglish();

@Component({
  selector: 'app-moe-common-popup',
  templateUrl: './moe-common-popup.component.html',
  styleUrls: ['./moe-common-popup.component.css']
})
export class MoeCommonPopupComponent implements OnInit {

  currentLang = 'Eng';
  //    currentLang = new BehaviorSubject<string>('Eng');
      isLangChange = false;
      hasFocusSet: number;
      public showData: boolean = true;
      showWorkFlowAction: boolean = true;
  
      fileBrowseIndex: number;
      date: any = new Date();
      brwoseData: any[] = [{
          name: undefined,
          file: undefined,
          uploadedBy: undefined
      }];
      @ViewChild('attachment') attachment: ElementRef;
      maxAttachment: number;
      isUploadDisable: boolean = false;
      displayData: boolean = false;
      page: number = 1;
      totalPages: number;
      isLoaded: boolean = false;
      sampleFlag: boolean;
      tabDisable: Boolean = true;
      selectedIndex: number;
  
      workflowForm: FormGroup;
      errorMessages = CommonWfMsg;
  
      historyData: any[] = [];
      actionList: any[] = [];
      userList: any[] = [];
  
      attachmentTypeList: any[] = [];
  
      actionCtrl: FormControl = new FormControl();
      userCodeCtrl: FormControl = new FormControl();
      branchCodeCtrl: FormControl = new FormControl();
      officeCodeCtrl: FormControl = new FormControl();
      departmentCodeCtrl: FormControl = new FormControl();
      workflowRoleCodeCtrl: FormControl = new FormControl();
      hodCodeCtrl: FormControl = new FormControl();
      coCodeCtrl: FormControl = new FormControl();
      attachmentTypeCodeCtrl: FormControl = new FormControl();
      linkMenuId: any;
      postId: any;
      wfRoleCode: any;
      wfRoleIds: any;
      menuId: any;
      userId: any;
      lkPoOffUserId: any;
      actionResponse: any;
      remarksRequired: boolean;
      officeId: any;
      isUserVisible: boolean;
      isBranchVisible: boolean;
      branchList: any[];
      isDepartmentVisible: boolean;
      departmentList: any[];
      isWorkflowRoleVisible: boolean;
      workflowRoleList: any[];
      isHodVisible: boolean;
      hodList: any[];
      isCoVisible: boolean;
      coList: any[];
      isOfficeVisible: boolean;
      officeList: any[];
      userResponse: any[];
      attachData = [];
      uploadDirectoryPath: string;
      totalAttachmentSize: number = 0;
      allowedFileType: any;
      isSubmitted: boolean;
      apiErrorMessageList = [];
      parentOffice: any;
      userSelTwoObj: any;
      selectedAction: any;
      sendBackFlag: boolean;
      selectedFilePreviewPdf: string;
      selectedFilePreviewImageBase64: string;
      selectedFileBase64: string;
      isLocationTypeBranch: boolean;
      ministerList = [];
      dummyBranchList = [];
      isChildOffice: boolean;
      fdGroupData = null;
      isOnlyDummyEntry: boolean;
      commentHistoryOfficeName: string;
      isParentOffice: boolean;
      isTobranch: boolean;
      isToOffice: boolean;
      isSameOfficeSameBranch: boolean;  // added by shailesh
      isParentOfficeSameBranch: any;
      loggedInDepartmentId: number = null;
      isGrantCoSelection: boolean;
      isOtherOffice: boolean;
      districtId: number;
      wfRequestNo: any;
      trnIds: string[] = []
      constructor(private elem: ElementRef,
          private toastr: ToastrService,
          private router: Router,
          private fb: FormBuilder,
          public dialog: MatDialog,
          private commonService: CommonService,
          public dialogRef: MatDialogRef<LcCommonWorkflowComponent>,
          @Inject(MAT_DIALOG_DATA) public data,
          private el: ElementRef,
          private commonWorkflowService: LcCommonWorkflowService
      ) { }
  
      ngOnInit() {
          this.maxAttachment = DataConstant.MAX_ATTACHMENT;
          this.createForm();
  
          // To get the logged in user info and menu info
          this.commonWorkflowService.getCurrentUserDetail().then(res => {
              if (res) {
                  this.wfRoleIds = res['wfRoleId'];
                  this.wfRoleCode = res['wfRoleCode'];
                  this.menuId = res['menuId'];
                  this.linkMenuId = res['linkMenuId'] ? res['linkMenuId'] : this.menuId;
                  this.postId = res['postId'];
                  this.userId = res['userId'];
                  this.lkPoOffUserId = res['lkPoOffUserId'];
                  this.officeId = res['officeDetail']['officeId'];
                  this.districtId = res['officeDetail']['districtId'];
                  this.commentHistoryOfficeName = res['officeDetail']['officeName'];
                  this.loggedInDepartmentId = res['officeDetail']['departmentId'];
                  console.log('---------->', res);
                  this.getParentOffice();
                  this.trnIds[0] = this.data.trnId
              }
          });
      }
  
      /**
       * @description to create workflow form
       */
      createForm() {
          this.workflowForm = this.fb.group({
              workflowAction: ['', Validators.required],
              remarks: ['', Validators.required]
          });
      }
  
      /**
       * @description To get Parent Office
       */
      getParentOffice() {
          try {
              const param = {
                  'id': this.officeId
              };
              this.commonWorkflowService.getParentOffice(param).subscribe((data) => {
                  if (data && data['status'] === 200 && data['result']) {
                      this.parentOffice = data['result'];
                  }
                  this.getActionList();
              }, (err) => {
                  this.toastr.error(err);
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description get the action list
       */
      getActionList() {
          console.log(this.data.trnId)
          try {
              if (this.linkMenuId && this.wfRoleIds && this.postId && this.userId && this.data.trnId) {
                  const params = {
                      id: this.linkMenuId,
                  };
                  if (this.data.branchId) {
                      params['branchId'] = this.data.branchId;
                  }
                //   let passdata={
                    
                //       "menuId": this.linkMenuId ,
                //       "officeId": this.officeId,
                //       "postId": this.postId,
                //       "trnId": this.data.trnId,
                //       "userId": this.userId,
                //       "wfRoleIds": this.wfRoleIds,
                //       "lkPOUId": this.lkPoOffUserId
                  
                //   }
                //   console.log(passdata, 'work flow actions parameters')
                  this.commonWorkflowService.getWorkFlowActionV3(params).subscribe((data) => {
                      if (data && data['result'] && data['result'].length > 0) {
                          this.popErrorMessage('action');
                          this.actionResponse = data['result'];
                          if (data['result'].length === 1) {
                              this.actionList.push(
                                  {
                                      'workflowActionId': data['result'][0]['workflowActionId'],
                                      'wfActionName': data['result'][0]['wfActionName']
                                  }
                              );
                              this.workflowForm.get('workflowAction').setValue(data['result'][0]['workflowActionId']);
                              this.onActionChange();
                          } else {
                              data['result'].forEach(element => {
                                  this.actionList.push(
                                      {
                                          'workflowActionId': element['workflowActionId'],
                                          'wfActionName': element['wfActionName']
                                      }
                                  );
                              });
                          }
                      } else {
                          this.pushErrorMessage(data['message'], 'action');
                          this.toastr.error(data['message']);
                      }
                  }, (err) => {
                      this.pushErrorMessage(err, 'action');
                      this.toastr.error(err);
                  });
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To reset variable on action change
       */
      resetActionChangeVariable() {
          try {
              this.isLocationTypeBranch = false;
              this.isUserVisible = false;
              this.isDepartmentVisible = false;
              this.isWorkflowRoleVisible = false;
              this.isHodVisible = false;
              this.isCoVisible = false;
              this.isOfficeVisible = false;
              this.isChildOffice = false;
              this.isParentOffice = false;
              this.isOnlyDummyEntry = false;
              this.isToOffice = false;
              this.isTobranch = false;
              this.isSameOfficeSameBranch = false;  // added by shailesh
              this.isParentOfficeSameBranch = false;
              this.isGrantCoSelection = false;
              this.userSelTwoObj = null;
              this.fdGroupData = null;
              this.userList = [];
              this.officeList = [];
              this.departmentList = [];
              this.hodList = [];
              this.coList = [];
              this.apiErrorMessageList = [];
              this.userResponse = [];
              if (this.workflowForm.controls.hasOwnProperty('user')) {
                  this.workflowForm.removeControl('user');
  
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
      /**
       * @description On Action selection change get the user or branch or office List
       */
      onActionChange() {
          try {
              if (this.actionResponse) {
                  const selectedAction = this.actionResponse.filter(actionObj => {
                      return actionObj.workflowActionId === this.workflowForm.get('workflowAction').value;
                  })[0];
                  if (selectedAction) {
                      this.selectedAction = _.cloneDeep(selectedAction);
                      this.resetActionChangeVariable();
                      let configDtoList = [];
  
                      if (selectedAction.wfActionConfigDtoList && selectedAction.wfActionConfigDtoList.length > 0) {
                          this.userSelTwoObj = selectedAction.wfActionConfigDtoList.filter(actionObj => {
                              return actionObj.isToUserSelReq === 2;
                          })[0];
                          if (this.userSelTwoObj && this.userSelTwoObj['toBranchTypeId']) {
                              this.getBranchForDummyEntryByBranchType(this.userSelTwoObj['toBranchTypeId']);
                          }
                      }
                      if (selectedAction.wfActionConfigDtoList && selectedAction.wfActionConfigDtoList.length > 0) {
                          configDtoList = selectedAction.wfActionConfigDtoList.filter(actionObj => {
                              return actionObj.isToUserSelReq !== 2;
                          });
                      }
                      if (configDtoList && configDtoList.length > 0) {
                          if (configDtoList.length > 1) {
                              this.checkCondition(configDtoList).then((correctCondition) => {
                                  if (correctCondition) {
                                      this.selectedAction = configDtoList.filter(actionObj => {
                                          return actionObj.condition === correctCondition;
                                      })[0];
                                      this.selectedActionCheck(_.cloneDeep(this.selectedAction), true);
                                  }
                              }).catch(err => {
                                  this.toastr.error(err);
                              });
                          } else if (configDtoList.length === 1) {
                              if (configDtoList[0]['condition']) {
                                  this.checkCondition(configDtoList).then((correctConditionObj) => {
                                      if (correctConditionObj) {
                                          this.selectedAction = configDtoList.filter(actionObj => {
                                              return actionObj.condition === correctConditionObj;
                                          })[0];
                                          this.selectedActionCheck(_.cloneDeep(this.selectedAction), true);
                                      }
                                  }).catch(err => {
                                      this.toastr.error(err);
                                  });
                              } else {
                                  this.selectedAction = _.cloneDeep(configDtoList[0]);
                                  this.selectedActionCheck(_.cloneDeep(this.selectedAction), true);
                              }
                          }
                      } else {
                          if (selectedAction['condition']) {
                              configDtoList.push(selectedAction);
                              this.checkCondition(configDtoList).then((correctConditionObj1) => {
                                  if (correctConditionObj1) {
                                      this.selectedAction = configDtoList.filter(actionObj => {
                                          return actionObj.condition === correctConditionObj1;
                                      })[0];
                                      this.selectedActionCheck(_.cloneDeep(this.selectedAction), true);
                                  }
                              }).catch(err => {
                                  this.toastr.error(err);
                              });
                          } else {
                              this.selectedAction = _.cloneDeep(selectedAction);
                              this.selectedActionCheck(_.cloneDeep(this.selectedAction), false);
                          }
                      }
                  }
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * To perform all the condition check for selected action
       * @param selectedAction Selected Action Object
       * @param fromConfigDto If selected action from configDto then it's true other wise it should be false
       */
      selectedActionCheck(selectedAction, fromConfigDto) {
          try {
              if (selectedAction.locationTypeName) {
                  if (selectedAction.locationTypeName === DataConstant.CUSTOM_LOCATION_TYPE) {
                      if (this.data.menuModuleName === ModuleNames.LetterOFCredit) {
                          if (selectedAction.locationValue === DataConstant.HOD_SELECTION) {
                              this.hodSelection(fromConfigDto);
                          } else if (selectedAction.locationValue === DataConstant.CO_SELECTION) {
                              this.coSelection(fromConfigDto);
                          }
                      }
                  } else if (selectedAction.locationTypeName === DataConstant.SAME_OFFICE_OTHER_BRANCH_TYPE) {
                      this.isBranchSelection().then((sameOffOtherBranchRes) => {
                          if (sameOffOtherBranchRes) {
                              this.isTobranch = true;
                          }
                          this.isUserSelection(fromConfigDto);
                      });
                  } else if (selectedAction.locationTypeName === DataConstant.PARENT_OFFICE) {
                      this.isParentOffice = true;
                      this.setParentOffice().then((parentOfficeRes) => {
                          if (parentOfficeRes) {
                              this.isToOffice = true;
                          }
                          this.isUserSelection(fromConfigDto);
                      });
                  } else if (selectedAction.locationTypeName === DataConstant.PARENT_OFFICE_OTHER_BRANCH_TYPE) {
                      this.setParentOffice().then((parentOffOtherBranchOfficeRes) => {
                          if (parentOffOtherBranchOfficeRes) {
                              this.isToOffice = true;
                          }
                          this.isBranchSelection().then((parentOffOtherBranchRes) => {
                              if (parentOffOtherBranchRes) {
                                  this.isTobranch = true;
                              }
                              this.isUserSelection(fromConfigDto);
                          });
                      });
                  } else if (selectedAction.locationTypeName === DataConstant.PARENT_OFFICE_SAME_BRANCH) {
                      this.isParentOfficeSameBranch = true;
                      this.setParentOffice().then((parentOffSameBranchOfficeRes) => {
                          if (parentOffSameBranchOfficeRes) {
                              this.isToOffice = true;
                          }
                          this.isBranchSelection().then((parentOffSameBranchRes) => {
                              if (parentOffSameBranchRes) {
                                  this.isTobranch = true;
                              }
                              this.isUserSelection(fromConfigDto);
                          });
                      });
                  } else if (selectedAction.locationTypeName === DataConstant.CHILD_OFFICE) {
                      this.isChildOffice = true;
                      this.isOfficeSelection().then((childOfficeRes) => {
                          if (childOfficeRes) {
                              this.isToOffice = true;
                          }
                          this.isBranchSelection().then((childOffBranchRes) => {
                              if (childOffBranchRes) {
                                  this.isTobranch = true;
                              }
                              this.isUserSelection(fromConfigDto);
                          });
                      });
                  } else if (selectedAction.locationTypeName === DataConstant.SAME_OFFICE_SAME_BRANCH) {
                      this.isSameOfficeSameBranch = true;  // added by shailesh
                      this.isBranchSelection().then((sameOffSameBranchRes) => {
                          if (sameOffSameBranchRes) {
                              this.isTobranch = true;
                          }
                          this.isUserSelection(fromConfigDto);
                      });
                  } else if (selectedAction.locationTypeName === DataConstant.SAME_OFFICE) {
                      this.isBranchSelection().then((sameOfficeBranchRes) => {
                          if (sameOfficeBranchRes) {
                              this.isTobranch = true;
                          }
                          this.isUserSelection(fromConfigDto);
                      });
                  
                  } else {
                      this.isOfficeSelection().then((officeRes) => {
                          if (officeRes) {
                              this.isToOffice = true;
                          }
                          this.isBranchSelection().then((branchRes) => {
                              if (branchRes) {
                                  this.isTobranch = true;
                              }
                              this.isUserSelection(fromConfigDto);
                          });
                      });
                  }
  
              } else {
                  this.toastr.error(this.errorMessages.CONF_WITHOUT_LOCATIONTYPE);
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To get the AD office List for Contract Menu
       */
      getContractAdOffice() {
          try {
              return new Promise((officeResolve) => {
                  if (this.selectedAction.isToOfficeSelReq === 1 || this.selectedAction.isToOfficeSelReq === -1) {
                      this.isOfficeVisible = true;
                      this.workflowForm.addControl('office', new FormControl(Validators.required));
                      this.workflowForm.controls.office.setValue('');
                  }
                  this.commonWorkflowService.getAdOffice({}).subscribe((data) => {
                      if (data && data['status'] === 200 && data['result']) {
                          if (data['result'].length > 0) {
                              this.popErrorMessage('adoffice');
                              const adOfficeList = data['result'];
                              this.officeList = adOfficeList.filter(deptObj => {
                                  return deptObj.departmentId === this.loggedInDepartmentId;
                              });
                              if (this.officeList && this.officeList.length > 0) {
                                  if (this.isOfficeVisible) {
                                      if (this.officeList.length > 1) {
                                          this.officeList = this.officeList.filter(temp => temp.isFd === 2);
                                      }
                                      this.workflowForm.get('office').setValue(this.officeList[0]['officeId']);
                                  }
                              }
                              officeResolve(true);
                          } else {
                              this.officeList = [];
                              this.pushErrorMessage(this.errorMessages.WF_OFFICE_LIST_EMPTY, 'adoffice');
                              this.toastr.error(this.errorMessages.WF_OFFICE_LIST_EMPTY);
                              officeResolve(false);
                          }
                      } else {
                          this.officeList = [];
                          this.pushErrorMessage(data['message'], 'adoffice');
                          this.toastr.error(data['message']);
                          officeResolve(false);
                      }
                  }, (err) => {
                      this.officeList = [];
                      this.pushErrorMessage(err, 'adoffice');
                      this.toastr.error(err);
                      officeResolve(false);
                  });
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To set the parent office list for PARANT_OFFICE_aliase
       */
      setParentOffice() {
          try {
              return new Promise((officeResolve) => {
                  if (this.parentOffice) {
                      this.officeList = [];
                      this.officeList.push(this.parentOffice);
                      if (this.selectedAction.isToOfficeSelReq === 1 || this.selectedAction.isToOfficeSelReq === -1) {
                          this.isOfficeVisible = true;
                          this.workflowForm.addControl('office', new FormControl(Validators.required));
                          this.workflowForm.controls.office.setValue('');
                          if (this.parentOffice.officeId) {
                              this.workflowForm.controls.office.setValue(this.parentOffice.officeId);
                          }
                      }
                      officeResolve(true);
                  } else {
                      officeResolve(false);
                  }
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To check the Office selection is required or not and get the Office List Data
       */
      isOfficeSelection() {
          try {
              return new Promise((officeResolve) => {
                  if ((!(this.selectedAction.locationTypeName === DataConstant.CUSTOM_LOCATION_TYPE &&
                      (this.selectedAction.locationValue === DataConstant.HOD_SELECTION ||
                          this.selectedAction.locationValue === DataConstant.CO_SELECTION)))
                      && !this.isChildOffice && !this.isParentOfficeSameBranch) {
                      this.isOfficeVisible = false;
                      this.officeList = [];
                      // for office dropdown
                      if (this.selectedAction.isToOfficeSelReq === 1 || this.selectedAction.isToOfficeSelReq === -1) {
                          this.isOfficeVisible = true;
                          this.workflowForm.addControl('office', new FormControl(Validators.required));
                          this.workflowForm.controls.office.setValue('');
                          this.getOfficeByOfficeTypeAndSubType().then((officeType) => {
                              if (officeType) {
                                  officeResolve(true);
                              } else {
                                  officeResolve(false);
                              }
                          });
                      } else {
                          officeResolve(false);
                      }
                  } else if (this.isChildOffice) {
                      if (this.selectedAction.isToOfficeSelReq === 1 || this.selectedAction.isToOfficeSelReq === -1) {
                          this.isOfficeVisible = true;
                          this.workflowForm.addControl('office', new FormControl(Validators.required));
                          this.workflowForm.controls.office.setValue('');
                      }
                      this.getChildOfficeList().then((childOffice) => {
                          if (childOffice) {
                              officeResolve(true);
                          } else {
                              officeResolve(false);
                          }
                      });
                  } else if (this.isParentOfficeSameBranch) {
                      this.isOfficeVisible = false;
                      this.officeList = [];
                      if (this.selectedAction.isToOfficeSelReq === 1 || this.selectedAction.isToOfficeSelReq === -1) {
                          this.isOfficeVisible = true;
                          this.workflowForm.addControl('office', new FormControl(Validators.required));
                      }
                      if (this.workflowForm.controls.hasOwnProperty('office')) {
                          this.workflowForm.controls.office.setValue('');
                      }
                  } else if (this.isOtherOffice) {
                      if (this.selectedAction.isToOfficeSelReq === 1 || this.selectedAction.isToOfficeSelReq === -1) {
                          this.isOfficeVisible = true;
                          this.workflowForm.addControl('office', new FormControl(Validators.required));
                          this.workflowForm.controls.office.setValue('');
                      }
                      this.getOfficeByOfficeTypeAndSubType().then((otherOffice) => {
                          if (otherOffice) {
                              officeResolve(true);
                          } else {
                              officeResolve(false);
                          }
                      });
                  } else {
                      officeResolve(false);
                  }
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To check the Branch selection is required or not and get the Branch List Data
       */
      isBranchSelection() {
          try {
              return new Promise((branchRes) => {
                  this.isBranchVisible = false;
                  this.branchList = [];
  
                  if (this.selectedAction.isToBranchSelReq != null ||
                      this.selectedAction.isToBranchSelReq !== undefined) {
                      // for branch dropdown
                      if (this.selectedAction.isToBranchSelReq === 1 || this.selectedAction.isToBranchSelReq === -1) {
                          this.isBranchVisible = true;
                          this.workflowForm.addControl('branch', new FormControl(Validators.required));
                          this.workflowForm.controls.branch.setValue('');
                          if (this.selectedAction['toBranchTypeId']) {
                              this.getBranchByBranchType().then(res => {
                                  if (res) {
                                      branchRes(true);
                                  } else {
                                      branchRes(false);
                                  }
                              });
                          } else {
                              branchRes(false);
                          }
                      } else {
                          if (this.selectedAction['toBranchTypeId']) {
                              this.getBranchByBranchType().then(branchTypeRes => {
                                  if (branchTypeRes) {
                                      branchRes(true);
                                  } else {
                                      branchRes(false);
                                  }
                              });
                          } else {
                              branchRes(false);
                          }
                      }
                  } else {
                      branchRes(false);
                  }
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To check the User selection is required or not and get the User List Data
       */
      isUserSelection(fromConfigDto) {
          try {
              if (this.selectedAction.condition === DataConstant.MINISTER_CONDITION) {
                  this.ministerSelection();
              } else {
                  if (this.isToOffice) {
                      if (this.selectedAction.toIsFd === 1 &&
                          (!(this.selectedAction.isToUserSelReq === 2 && !fromConfigDto))) {
                          if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                              this.isUserVisible = true;
                              this.workflowForm.addControl('user', new FormControl(Validators.required));
                              this.workflowForm.controls.user.setValue('');
                          }
                          this.getFdOfficeByOfficeType();
                      } else {
                          if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                              this.isUserVisible = true;
                              this.workflowForm.addControl('user', new FormControl(Validators.required));
                              this.workflowForm.controls.user.setValue('');
                              if (this.workflowForm.get('office').value) {
                                  this.getWorkflowUsers(this.workflowForm.get('office').value);
                              }
                          } else if (this.selectedAction.isToUserSelReq === 2 && !fromConfigDto) {
                              // for user selection two
                              this.isOnlyDummyEntry = true;
                              this.userSelTwoObj = _.cloneDeep(this.selectedAction);
                              if (this.userSelTwoObj['toBranchTypeId']) {
                                  this.getBranchForDummyEntryByBranchType(this.userSelTwoObj['toBranchTypeId']);
                              }
                          }
                      }
                  } else {
                      if (this.selectedAction.toIsFd === 1 &&
                          (!(this.selectedAction.isToUserSelReq === 2 && !fromConfigDto))) {
                          if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                              this.isUserVisible = true;
                              this.workflowForm.addControl('user', new FormControl(Validators.required));
                              this.workflowForm.controls.user.setValue('');
                          }
                          this.getFdOfficeByOfficeType();
                      } else {
                          if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                              this.isUserVisible = true;
                              this.workflowForm.addControl('user', new FormControl(Validators.required));
                              this.workflowForm.controls.user.setValue('');
                              this.getWorkflowUsers(this.officeId);
                          } else if (this.selectedAction.isToUserSelReq === 2 && !fromConfigDto) {
                              // for user selection two
                              this.isOnlyDummyEntry = true;
                              this.userSelTwoObj = _.cloneDeep(this.selectedAction);
                              if (this.userSelTwoObj['toBranchTypeId']) {
                                  this.getBranchForDummyEntryByBranchType(this.userSelTwoObj['toBranchTypeId']);
                              }
                          }
                      }
                  }
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To load the User list based on office selection change
       */
      officeSelectionChange() {
          try {
              if (this.workflowForm.get('office').value) {
                  if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                      this.getWorkflowUsers(this.workflowForm.get('office').value);
                  }
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To display the HOD selection fields and get the dropdown data
       */
      hodSelection(fromConfigDto) {
          try {
              this.isHodVisible = true;
              this.isCoVisible = false;
              this.isOfficeVisible = false;
              this.workflowForm.addControl('hod', new FormControl(Validators.required));
              this.workflowForm.controls.hod.setValue('');
              this.getHodList(fromConfigDto);
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To display the CO selection fields and get the dropdown data
       */
      coSelection(fromConfigDto) {
          try {
              this.isOfficeVisible = false;
              this.isCoVisible = true;
              this.workflowForm.addControl('co', new FormControl(Validators.required));
              this.workflowForm.controls.co.setValue('');
              this.getCoOffice(fromConfigDto);
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      toSelection(fromConfigDto) {
          try {
              this.isOfficeVisible = true;
              this.workflowForm.addControl('office', new FormControl(Validators.required));
              this.workflowForm.controls.office.setValue('');
              this.getToOffice(fromConfigDto);
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To display the CO selection fields and get the dropdown data
       */
      ministerSelection() {
          try {
              this.isUserVisible = true;
              this.workflowForm.addControl('user', new FormControl(Validators.required));
              this.workflowForm.controls.user.setValue('');
              this.getMinisterInCharge();
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To get list of Minister
       */
      getMinisterInCharge() {
          try {
              const param = {
                  'officeId': this.officeId,
                  'menuId': this.linkMenuId,
                  'ministerId': this.data.ministerId
              };
              this.commonWorkflowService.getMinisterInCharge(param).subscribe((data) => {
                  if (data && data['status'] === 200 && data['result']) {
                      this.popErrorMessage('minister');
                      this.userResponse = data['result'];
                      if (data['result'].length === 1) {
                          this.userList.push(
                              {
                                  'userId': data['result'][0]['userId'],
                                  'userName': data['result'][0]['postName'] ?
                                      data['result'][0]['userName'] + ' (' + data['result'][0]['postName'] + ')'
                                      : data['result'][0]['userName'],
                                  'pouId': data['result'][0]['pouId'],
                              }
                          );
                          this.workflowForm.get('user').setValue(data['result'][0]['userId']);
                      } else {
                          data['result'].forEach(userElement => {
                              this.userList.push(
                                  {
                                      'userId': userElement['userId'],
                                      'userName': userElement['postName'] ?
                                          userElement['userName'] + ' (' + userElement['postName'] + ')'
                                          : userElement['userName'],
                                      'pouId': userElement['pouId'],
                                  }
                              );
                          });
                          if (this.selectedAction.isToUserSelReq === -1 && data['result'].length > 1) {
                              this.workflowForm.get('user').setValue(data['result'][0]['userId']);
                          }
                      }
                  } else {
                      this.pushErrorMessage(data['message'], 'minister');
                      this.toastr.error(data['message']);
                  }
              }, (err) => {
                  this.pushErrorMessage(err, 'minister');
                  this.toastr.error(err);
              });
          } catch (error) {
              this.toastr.error(error);
          }
      }
  
      /**
       * To check, which condition is true for the selected action
       * @param conditionList condition array (wfActionConfigDtoList key of action list)
       */
      checkCondition(conditionList) {
          try {
              return new Promise((conditionResolve) => {
                  if (conditionList && conditionList.length > 0) {
                      const conditionArray = [];
                      conditionList.forEach(condObj => {
                          if (condObj.condition) {
                              conditionArray.push(condObj.condition);
                          }
                      });
                      const actionName = this.actionList.find(x => {
                          return x.workflowActionId === this.workflowForm.get('workflowAction').value;
                      }).wfActionName;
                      if (conditionArray) {
                          const param = {
                              'trnId': this.data.trnId,
                              'defaultCondition': conditionArray[0],
                              'condition': conditionArray
                          };
                          if (this.data.menuModuleName === ModuleNames.EDP) {
                              param['menuId'] = this.linkMenuId;
                              param['action'] = actionName;
                          }
  
                          this.commonWorkflowService.postSubmitApi('POST', this.data.conditionUrl, param)
                              .subscribe((data) => {
                                  if (data && data['status'] === 200 && data['result']) {
                                      this.popErrorMessage('condition');
                                      conditionResolve(data['result']);
                                  } else {
                                      this.pushErrorMessage(data['message'], 'condition');
                                      this.toastr.error(data['message']);
                                      conditionResolve('');
                                  }
                              }, (err) => {
                                  this.pushErrorMessage(err, 'condition');
                                  this.toastr.error(err);
                                  conditionResolve('');
                              });
                      } else {
                          conditionResolve('');
                      }
                  } else {
                      conditionResolve('');
                  }
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description to get the user list
       */
      getWorkflowUsers(officeId) {
          try {
              if (this.selectedAction) {
                  const params = {
                      "branchId": 0,
                      'menuId': this.linkMenuId,
                      'officeId': officeId,
                      'wfActionConfigId': this.selectedAction['actionConfigId']
                  };
                  if (this.data.brachId) {
                      params['branchId'] = this.data.brachId;
                  }
                  console.log(params, 'workflow users params')
                  this.commonWorkflowService.getWorkFlowconfigV2(params).subscribe((data) => {
                      if (data && data['status'] === 200 && data['result']) {
                          if (data['result'].length > 0) {
                              this.popErrorMessage('user');
                              this.userResponse = data['result'];
                              if (data['result'].length === 1) {
                                  this.userList.push(
                                      {
                                          'userId': data['result'][0]['userId'],
                                          'userName': data['result'][0]['wfRoleName'] ?
                                              data['result'][0]['userName'] + ' (' + data['result'][0]['wfRoleName'] + ')'
                                              : data['result'][0]['userName'],
                                          'pouId': data['result'][0]['pouId'],
                                      }
                                  );
                                  if (this.data.menuModuleName === ModuleNames.GRANT &&
                                      this.selectedAction.locationValue === DataConstant.GRANT_SELECT_SPECIFIC_APPROVER &&
                                      this.data && this.data.moduleInfo &&
                                      this.data.moduleInfo.selectedUserPouId) {
                                      // this condition is for grant to set selected user from transaction in user field
                                      const user = this.userList.filter(userData => {
                                          return userData.pouId === this.data.moduleInfo.selectedUserPouId;
                                      })[0];
                                      if (user && user['userId']) {
                                          this.workflowForm.get('user').setValue(user['userId']);
                                      }
                                  } else {
                                      this.workflowForm.get('user').setValue(data['result'][0]['userId']);
                                  }
                              } else {
                                  data['result'].forEach(userEle => {
                                      this.userList.push(
                                          {
                                              'userId': userEle['userId'],
                                              'userName': userEle['wfRoleName'] ?
                                                  userEle['userName'] + ' (' + userEle['wfRoleName'] + ')'
                                                  : userEle['userName'],
                                              'pouId': userEle['pouId'],
                                          }
                                      );
                                  });
                                  if (this.selectedAction.isToUserSelReq === -1 && data['result'].length > 1) {
                                      this.workflowForm.get('user').setValue(data['result'][0]['userId']);
                                  }
                                  // this condition is for grant to set selected user from transaction in user field
                                  if (this.data.menuModuleName === ModuleNames.GRANT &&
                                      this.selectedAction.locationValue === DataConstant.GRANT_SELECT_SPECIFIC_APPROVER &&
                                      this.data && this.data.moduleInfo &&
                                      this.data.moduleInfo.selectedUserPouId) {
                                      const user = this.userList.filter(userData => {
                                          return userData.pouId === this.data.moduleInfo.selectedUserPouId;
                                      })[0];
                                      if (user && user['userId']) {
                                          this.workflowForm.get('user').setValue(user['userId']);
                                      }
                                  }
                              }
                          } else {
                              this.userList = [];
                              this.pushErrorMessage(this.errorMessages.WF_USER_LIST_EMPTY, 'user');
                              this.toastr.error(this.errorMessages.WF_USER_LIST_EMPTY);
                          }
                      } else {
                          this.userList = [];
                          this.pushErrorMessage(data['message'], 'user');
                          this.toastr.error(data['message']);
                      }
                  }, (err) => {
                      this.userList = [];
                      this.pushErrorMessage(err, 'user');
                      this.toastr.error(err);
                  });
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description to get the user list Grant CO_SELECTION Alias
       */
      getGrantWorkflowUsers(officeId, wfRoleId?) {
          try {
              if (this.selectedAction) {
                  const params = {
                      'menuId': this.linkMenuId,
                      'officeId': officeId,
                      'toWfRoleId': this.workflowForm.get('workflowRole').value
                  };
                  this.commonWorkflowService.getGrantWorkFlowUsers(params).subscribe((data) => {
                      if (data && data['status'] === 200 && data['result']) {
                          if (data['result'].length > 0) {
                              this.popErrorMessage('user');
                              this.userResponse = data['result'];
                              if (data['result'].length === 1) {
                                  this.userList.push(
                                      {
                                          'userId': data['result'][0]['userId'],
                                          'userName': data['result'][0]['postName'] ?
                                              data['result'][0]['userName'] + ' (' + data['result'][0]['postName'] + ')'
                                              : data['result'][0]['userName'],
                                          'pouId': data['result'][0]['pouId'],
                                      }
                                  );
                                  if (this.data && this.data.moduleInfo &&
                                      this.data.moduleInfo.selectedUserPouId) {
                                      // this condition is for grant to set selected user from transaction in user field
                                      const user = this.userList.filter(userData => {
                                          return userData.pouId === this.data.moduleInfo.selectedUserPouId;
                                      })[0];
                                      if (user && user['userId']) {
                                          this.workflowForm.get('user').setValue(user['userId']);
                                      }
                                  } else {
                                      this.workflowForm.get('user').setValue(data['result'][0]['userId']);
                                  }
                              } else {
                                  data['result'].forEach(userEle => {
                                      this.userList.push(
                                          {
                                              'userId': userEle['userId'],
                                              'userName': userEle['postName'] ?
                                                  userEle['userName'] + ' (' + userEle['postName'] + ')'
                                                  : userEle['userName'],
                                              'pouId': userEle['pouId'],
                                          }
                                      );
                                  });
                                  if (this.selectedAction.isToUserSelReq === -1 && data['result'].length > 1) {
                                      this.workflowForm.get('user').setValue(data['result'][0]['userId']);
                                  }
                                  // this condition is for grant to set selected user from transaction in user field
                                  if (this.data && this.data.moduleInfo &&
                                      this.data.moduleInfo.selectedUserPouId) {
                                      const user = this.userList.filter(userData => {
                                          return userData.pouId === this.data.moduleInfo.selectedUserPouId;
                                      })[0];
                                      if (user && user['userId']) {
                                          this.workflowForm.get('user').setValue(user['userId']);
                                      }
                                  }
                              }
                          } else {
                              this.userList = [];
                              this.pushErrorMessage(this.errorMessages.WF_USER_LIST_EMPTY, 'user');
                              this.toastr.error(this.errorMessages.WF_USER_LIST_EMPTY);
                          }
                      } else {
                          this.userList = [];
                          this.pushErrorMessage(data['message'], 'user');
                          this.toastr.error(data['message']);
                      }
                  }, (grantWfErr) => {
                      this.userList = [];
                      this.pushErrorMessage(grantWfErr, 'user');
                      this.toastr.error(grantWfErr);
                  });
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description to get the branch list by branch type id
       */
      getBranchByBranchType() {
          try {
              return new Promise((branchResolve) => {
                  if (this.selectedAction && this.selectedAction['toBranchTypeId']) {
                      this.branchList = [];
                      const params = {
                          'id': this.selectedAction['toBranchTypeId'],
                      };
                      this.commonWorkflowService.getBranchByBranchType(params).subscribe((data) => {
                          if (data && data['status'] === 200 && data['result']) {
                              if (data['result'].length > 0) {
                                  this.popErrorMessage('branchType');
                                  this.branchList = data['result'];
                                  if ((data['result'].length === 1 && this.isBranchVisible)
                                      || (this.selectedAction.isToBranchSelReq === -1 && data['result'].length > 1)) {
                                      this.workflowForm.get('branch').setValue(data['result'][0]['branchId']);
                                  }
                                  branchResolve(true);
                              } else {
                                  this.pushErrorMessage(this.errorMessages.WF_BRANCH_LIST_EMPTY, 'branchType');
                                  this.toastr.error(this.errorMessages.WF_BRANCH_LIST_EMPTY);
                                  branchResolve(false);
                              }
                          } else {
                              this.pushErrorMessage(data['message'], 'branchType');
                              this.toastr.error(data['message']);
                              branchResolve(false);
                          }
                      }, (err) => {
                          this.pushErrorMessage(err, 'branchType');
                          this.toastr.error(err);
                          branchResolve(false);
                      });
                  } else {
                      branchResolve(false);
                  }
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description to get the branch list for Dummy entry by branch type id
       */
      getBranchForDummyEntryByBranchType(branchTypeId) {
          try {
              if (branchTypeId) {
                  this.dummyBranchList = [];
                  const params = {
                      'id': branchTypeId,
                  };
                  this.commonWorkflowService.getBranchByBranchType(params).subscribe((data) => {
                      if (data && data['status'] === 200 && data['result']) {
                          if (data['result'].length > 0) {
                              this.popErrorMessage('dummyBranchType');
                              this.dummyBranchList = data['result'];
                          } else {
                              this.pushErrorMessage(this.errorMessages.WF_BRANCH_LIST_EMPTY, 'dummyBranchType');
                              this.toastr.error(this.errorMessages.WF_BRANCH_LIST_EMPTY);
                          }
                      } else {
                          this.pushErrorMessage(data['message'], 'dummyBranchType');
                          this.toastr.error(data['message']);
                      }
                  }, (err) => {
                      this.pushErrorMessage(err, 'dummyBranchType');
                      this.toastr.error(err);
                  });
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To get office list by office type id
       */
      getOfficeByOfficeType() {
          try {
              return new Promise((officeResolve) => {
                  if (this.selectedAction && this.selectedAction['toOfficeTypeId']) {
                      this.officeList = [];
                      const params = {
                          'id': this.selectedAction['toOfficeTypeId'],
                      };
                      this.commonWorkflowService.getOfficeByOfficeType(params).subscribe((data) => {
                          if (data && data['status'] === 200 && data['result']) {
                              if (data['result'].length > 0) {
                                  this.popErrorMessage('officeType');
                                  this.officeList = data['result'];
                                  if (this.isOfficeVisible) {
                                      if (data['result'].length === 1) {
                                          this.workflowForm.get('office').setValue(data['result'][0]['officeId']);
                                      } else {
                                          if (this.parentOffice.officeId) {
                                              this.workflowForm.get('office').setValue(this.parentOffice.officeId);
                                          } else if (this.selectedAction.isToOfficeSelReq === -1) {
                                              this.workflowForm.get('office').setValue(data['result'][0]['officeId']);
                                          }
                                      }
                                  }
                                  officeResolve(true);
                              } else {
                                  this.pushErrorMessage(this.errorMessages.WF_OFFICE_LIST_EMPTY, 'officeType');
                                  this.toastr.error(this.errorMessages.WF_OFFICE_LIST_EMPTY);
                                  officeResolve(false);
                              }
                          } else {
                              this.pushErrorMessage(data['message'], 'officeType');
                              this.toastr.error(data['message']);
                              officeResolve(false);
                          }
                      }, (err) => {
                          this.pushErrorMessage(err, 'officeType');
                          this.toastr.error(err);
                          officeResolve(false);
                      });
                  } else {
                      officeResolve(false);
                  }
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      getOfficeByOfficeTypeAndSubType() {
          try {
              return new Promise((officeResolve) => {
                  if (this.selectedAction && this.selectedAction['toOfficeTypeId']) {
                      this.officeList = [];
                      const params = {
                          'officeTypeId': this.selectedAction['toOfficeTypeId'],
                          'officeSubTypeId': this.selectedAction['toOfficeSubTypeId']
                      };
                      this.commonWorkflowService.getOfficeByOfficeTypeAndSubType(params).subscribe((data) => {
                          if (data && data['status'] === 200 && data['result']) {
                              if (data['result'].length > 0) {
                                  //this.popErrorMessage('officeType');
                                  this.officeList = data['result'];
                                  console.log(this.officeList);
                                  if (this.isOfficeVisible) {
                                      this.workflowForm.get('office').setValue(data['result'][0]['officeId']);
                                  }
                                  officeResolve(true);
                              } else {
                                  this.pushErrorMessage(this.errorMessages.WF_OFFICE_LIST_EMPTY, 'officeType');
                                  this.toastr.error(this.errorMessages.WF_OFFICE_LIST_EMPTY);
                                  officeResolve(false);
                              }
                          } else {
                              this.pushErrorMessage(data['message'], 'officeType');
                              this.toastr.error(data['message']);
                              officeResolve(false);
                          }
                      }, (err) => {
                          this.pushErrorMessage(err, 'officeType');
                          this.toastr.error(err);
                          officeResolve(false);
                      });
                  } else {
                      officeResolve(false);
                  }
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To get FD office list by office type id
       */
      getFdOfficeByOfficeType() {
          try {
              this.officeList = [];
              this.commonWorkflowService.getFdOffice({}).subscribe((data) => {
                  if (data && data['status'] === 200 && data['result']) {
                      this.popErrorMessage('fdOffice');
                      if (data['result'].length > 0) {
                          this.officeList = data['result'];
                          if (this.isUserVisible) {
                              this.getWorkflowUsers(data['result'][0]['officeId']);
                          }
                      }
                  } else {
                      this.pushErrorMessage(data['message'], 'fdOffice');
                      this.toastr.error(data['message']);
                  }
              }, (err) => {
                  this.pushErrorMessage(err, 'fdOffice');
                  this.toastr.error(err);
              });
          } catch (error) {
              this.toastr.error(error);
          }
      }
  
      /**
       * @description To get Child office list by office type id
       */
      getChildOfficeList() {
          try {
              return new Promise((childOffResolve) => {
                  this.officeList = [];
                  const param = {
                      'menuId': this.linkMenuId,
                      'trnId': this.data.trnId,
                      'officeId': this.officeId
                  };
                  this.commonWorkflowService.getChildOffice(param).subscribe((data) => {
                      if (data && data['status'] === 200 && data['result']) {
                          this.popErrorMessage('childOffice');
                          this.officeList.push(data['result']);
                          if (this.isOfficeVisible) {
                              this.workflowForm.get('office').setValue(this.officeList[0]['officeId']);
                          }
                          childOffResolve(true);
                      } else {
                          this.pushErrorMessage(data['message'], 'childOffice');
                          this.toastr.error(data['message']);
                      }
                  }, (err) => {
                      this.pushErrorMessage(err, 'childOffice');
                      this.toastr.error(err);
                      childOffResolve(false);
                  });
              });
          } catch (error) {
              this.toastr.error(error);
          }
      }
  
      /**
       * @description To get TO/PAO office by office type id
       * As Discussed with Shailesh Dobariya i am added Aliyas API function into this file.
       */
      getTOPAOOffice() {
          try {
              return new Promise((toPaoOffice) => {
                  this.officeList = [];
                  const param = {
                      'alias': this.selectedAction.locationValue,
                      'districtId': this.data.moduleInfo.districtId
                  };
                  this.commonWorkflowService.getTOPAOOffice(param).subscribe((data) => {
                      if (data && data['status'] === 200 && data['result']) {
                          this.popErrorMessage('TaPaoOffice');
                          this.officeList.push(data['result']);
                          // tslint:disable-next-line: max-line-length
                          if (this.selectedAction.isToOfficeSelReq === 1 || this.selectedAction.isToOfficeSelReq === -1) {
                              this.isOfficeVisible = true;
  
                              this.workflowForm.addControl('office', new FormControl(Validators.required));
                              this.workflowForm.controls.office.setValue('');
                              this.workflowForm.get('office').setValue(this.officeList[0]['officeId']);
                          }
                          toPaoOffice(true);
                      } else {
                          this.pushErrorMessage(data['message'], 'TaPaoOffice');
                          this.toastr.error(data['message']);
                      }
                  }, (err) => {
                      this.pushErrorMessage(err, 'TaPaoOffice');
                      this.toastr.error(err);
                      toPaoOffice(false);
                  });
              });
          } catch (error) {
              this.toastr.error(error);
          }
      }
  
      getFdGroup() {
          try {
              const param = {
                  'id': this.data.trnId,
              };
              // discussed with shailesh, added fd group url for module specific.
              this.commonWorkflowService.postSubmitApi('POST', this.data.fdGroupUrl, param).subscribe((data) => {
                  if (data && data['status'] === 200 && data['result']) {
                      this.popErrorMessage('fdGroup');
                      this.fdGroupData = data['result'];
                  } else {
                      this.pushErrorMessage(data['message'], 'fdGroup');
                      this.toastr.error(data['message']);
                  }
              }, (err) => {
                  this.pushErrorMessage(err, 'fdGroup');
                  this.toastr.error(err);
              });
          } catch (error) {
              this.toastr.error(error);
          }
      }
  
      /**
       * @description To get HOD List
       */
      getHodList(fromConfigDto) {
          const param = {
              'id': this.loggedInDepartmentId
          };
          this.commonWorkflowService.getHodList(param).subscribe((data) => {
              if (data && data['status'] === 200 && data['result']) {
                  if (data['result'].length > 0) {
                      this.popErrorMessage('hod');
                      this.hodList = data['result'];
                      const hod = this.hodList.filter(hodObj => {
                          return hodObj.hodId === this.parentOffice.hodId;
                      });
                      if (hod && hod.length > 0) {
                          if (this.parentOffice.hodId && this.isHodVisible && !this.isWorkflowRoleVisible) {
                              this.workflowForm.get('hod').setValue(this.parentOffice.hodId);
                          }
                      }
                      if (data['result'].length === 1 && this.isHodVisible && !this.isWorkflowRoleVisible) {
                          this.workflowForm.get('hod').setValue(data['result'][0]['officeId']);
                          this.isUserSelection(fromConfigDto);
                      }
                  } else {
                      this.hodList = [];
                      if (!this.isWorkflowRoleVisible) {
                          this.pushErrorMessage(this.errorMessages.WF_HOD_LIST_EMPTY, 'hod');
                      }
                      this.toastr.error(this.errorMessages.WF_HOD_LIST_EMPTY);
                  }
              } else {
                  this.hodList = [];
                  if (!this.isWorkflowRoleVisible) {
                      this.pushErrorMessage(data['message'], 'hod');
                  }
                  this.toastr.error(data['message']);
              }
          }, (err) => {
              this.hodList = [];
              if (!this.isWorkflowRoleVisible) {
                  this.pushErrorMessage(err, 'hod');
              }
              this.toastr.error(err);
          });
  
      }
  
      /**
       * @description on HOD selection change
       */
      onHodChange() {
          try {
              if (this.isGrantCoSelection) {
                  this.userList = [];
                  this.userResponse = [];
                  if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                      this.isUserVisible = true;
                      if (!this.workflowForm.controls.hasOwnProperty('user')) {
                          this.workflowForm.addControl('user', new FormControl(Validators.required));
                      }
                      this.workflowForm.controls.user.setValue('');
                      if (this.workflowForm.get('hod').value && this.workflowForm.get('workflowRole').value) {
                          // tslint:disable-next-line:max-line-length
                          this.getGrantWorkflowUsers(this.workflowForm.get('hod').value, this.workflowForm.get('workflowRole').value);
                      }
                  }
              }
              if (this.isCoVisible && this.workflowForm.get('hod').value) {
                  this.coList = [];
                  if (this.workflowForm.controls.hasOwnProperty('co')) {
                      this.workflowForm.get('co').setValue('');
                  }
                  this.getCoList();
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To get CO List
       */
      getCoList() {
          try {
              const param = {
                  'id': this.workflowForm.get('hod').value
              };
              this.commonWorkflowService.getCoList(param).subscribe((data) => {
                  if (data && data['status'] === 200 && data['result']) {
                      if (data['result'].length > 0) {
                          this.popErrorMessage('co');
                          this.coList = data['result'];
                          if (data['result'].length === 1 && this.isCoVisible && !this.isWorkflowRoleVisible) {
                              this.workflowForm.get('co').setValue(data['result'][0]['officeId']);
                          }
                      } else {
                          this.coList = [];
                          if (!this.isWorkflowRoleVisible) {
                              this.pushErrorMessage(this.errorMessages.WF_CO_LIST_EMPTY, 'co');
                          }
                          this.toastr.error(this.errorMessages.WF_CO_LIST_EMPTY);
                      }
                  } else {
                      this.coList = [];
                      if (!this.isWorkflowRoleVisible) {
                          this.pushErrorMessage(data['message'], 'co');
                      }
                      this.toastr.error(data['message']);
                  }
              }, (err) => {
                  this.coList = [];
                  if (!this.isWorkflowRoleVisible) {
                      this.pushErrorMessage(err, 'co');
                  }
                  this.toastr.error(err);
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To get CO Office for loc
       */
      getCoOffice(fromConfigDto) {
          try {
              const param = {
                  'id': this.loggedInDepartmentId
              };
              this.commonWorkflowService.getCoOffice(param).subscribe((data) => {
                  if (data && data['status'] === 200 && data['result']) {
                      if (data['result'].length > 0) {
                          this.popErrorMessage('co');
                          this.coList = data['result'];
                          if (data['result'].length === 1 && this.isCoVisible && !this.isWorkflowRoleVisible) {
                              this.workflowForm.get('co').setValue(data['result'][0]['officeId']);
                              this.isUserSelection(fromConfigDto);
                          }
                      } else {
                          this.coList = [];
                          if (!this.isWorkflowRoleVisible) {
                              this.pushErrorMessage(this.errorMessages.WF_CO_LIST_EMPTY, 'co');
                          }
                          this.toastr.error(this.errorMessages.WF_CO_LIST_EMPTY);
                      }
                  } else {
                      this.coList = [];
                      if (!this.isWorkflowRoleVisible) {
                          this.pushErrorMessage(data['message'], 'co');
                      }
                      this.toastr.error(data['message']);
                  }
              }, (err) => {
                  this.coList = [];
                  if (!this.isWorkflowRoleVisible) {
                      this.pushErrorMessage(err, 'co');
                  }
                  this.toastr.error(err);
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      getToOffice(fromConfigDto) {
          try {
              const param = {
                  'id': this.districtId
              };
              this.commonWorkflowService.getToOffice(param).subscribe((data) => {
                  if (data && data['status'] === 200 && data['result']) {
                      if (data['result'].length > 0) {
                          this.popErrorMessage('office');
                          this.officeList = data['result'];
                          if (this.isOfficeVisible) {
                              this.workflowForm.get('office').setValue(data['result'][0]['officeId']);
                              if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                                  this.isUserVisible = true;
                                  this.workflowForm.addControl('user', new FormControl(Validators.required));
                                  this.workflowForm.controls.user.setValue('');
                                  if (this.workflowForm.get('office').value) {
                                      this.getWorkflowUsers(this.workflowForm.get('office').value);
                                  }
                              }
                          }
                      } else {
                          this.officeList = [];
                          if (!this.isWorkflowRoleVisible) {
                              this.pushErrorMessage(this.errorMessages.WF_OFFICE_LIST_EMPTY, 'office');
                          }
                          this.toastr.error(this.errorMessages.WF_OFFICE_LIST_EMPTY);
                      }
                  } else {
                      this.officeList = [];
                      if (!this.isWorkflowRoleVisible) {
                          this.pushErrorMessage(data['message'], 'office');
                      }
                      this.toastr.error(data['message']);
                  }
              }, (err) => {
                  this.officeList = [];
                  if (!this.isWorkflowRoleVisible) {
                      this.pushErrorMessage(err, 'office');
                  }
                  this.toastr.error(err);
              });
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      onCoChange() {
          try {
              if (this.isGrantCoSelection) {
                  this.userList = [];
                  this.userResponse = [];
                  if (this.selectedAction.isToUserSelReq === 1 || this.selectedAction.isToUserSelReq === -1) {
                      this.isUserVisible = true;
                      if (!this.workflowForm.controls.hasOwnProperty('user')) {
                          this.workflowForm.addControl('user', new FormControl(Validators.required));
                      }
                      this.workflowForm.controls.user.setValue('');
                      if (this.workflowForm.get('co').value && this.workflowForm.get('workflowRole').value) {
                          // tslint:disable-next-line:max-line-length
                          this.getGrantWorkflowUsers(this.workflowForm.get('co').value, this.workflowForm.get('workflowRole').value);
                      }
                  }
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      /**
       * @description To push the specific error message (if not exist) in error message list
       * @param val error message
       */
      pushErrorMessage(val, type) {
          const hasMessage = this.apiErrorMessageList.filter(obj => {
              return obj['key'] === type;
          });
          if (hasMessage.length === 0) {
              this.apiErrorMessageList.push({ 'key': type, 'message': val });
          }
      }
  
      /**
       * @description To pop the specific error message from error message list
       * @param val error message
       */
      popErrorMessage(type) {
          const messageList = this.apiErrorMessageList.filter(obj => {
              return obj['key'] !== type;
          });
          this.apiErrorMessageList = _.cloneDeep(messageList);
      }
  
      gotoListing() {
          this.router.navigate(['']);
      }
  
      uploadAttachment() {
          this.tabDisable = false;
          this.selectedIndex = 2;
      }
  
      /**
       * @description to close the dialog box
       */
      closeDialog(): void {
          this.dialogRef.close('no');
      }
  
      /**
           * Request Number Generation
           */
      public async reqNumGen(): Promise<void> {
          const param = {
              menuId: this.linkMenuId,
              typeId: 0,
              wfRequestId: 0,
              wfRequestNo: "string"
  
  
          };
          await this.commonWorkflowService.getWorkFlowGenRequestV3(param).subscribe((res: any) => {
              if (res && res['status'] === 200) {
                  this.wfRequestNo = res['result'];
                  this.submitWorkflow();
                  return;
              }
              // this.toastr.error(res['message']);
          }, err => {
              this.toastr.error(err);
          });
      }
      /**
       * @description Submit the work flow.
       */
      submitWorkflow() {
          try {
              const result = this.checkFileUploadPending();
              if (!result) {
                  if (this.workflowForm.invalid) {
                      _.each(this.workflowForm.controls, function (control) {
                          if (control.status === 'INVALID') {
                              control.markAsTouched({ onlySelf: true });
                          }
                      });
                  }
                  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                      width: '360px',
                      data: this.errorMessages.SUBMIT_CONF_MSG
                  });
                  dialogRef.afterClosed().subscribe(res => {
                      if (res === 'yes') {
                          if (this.workflowForm.valid && !this.isSubmitted && this.apiErrorMessageList.length === 0) {
                              this.isSubmitted = true;
                              let selectedUser;
                              if (!this.selectedAction || (this.selectedAction && this.selectedAction.length === 0)) {
                                  this.isSubmitted = false;
                                  return;
                              }
                              if (this.userResponse) {
                                  selectedUser = this.userResponse.filter(userObj => {
                                      return userObj.userId === this.workflowForm.get('user').value;
                                  })[0];
                              }
                              const params = {
                                  wfRequestNo: this.wfRequestNo.wfRequestNo,
                                  actionConfigId: this.selectedAction.actionConfigId,
                                  menuId: this.linkMenuId,
                                  assignType: "SINGLE_USER",
                                  remarks: this.workflowForm.get('remarks').value,
                                  trnIds: this.trnIds[0],
                                  assignTo: {
                                      // pouId: this.lkPoOffUserId,
                                      pouId: selectedUser && selectedUser.pouId ? selectedUser.pouId : null,
  
                                  }
                              }
  
                              console.log(params, 'params for submit workflowwwwwwww')
                              this.commonWorkflowService.submitWorkFlowV3(params).subscribe((data) => {
                                  if (data && data['status'] === 202) {
                                      this.toastr.success(data['message']);
                                      const info = {
                                          'commonModelStatus': true,
                                          data // API response information
                                      };
                                      if (this.data.menuModuleName === ModuleNames.CONTRACT) {
                                          info['level'] = data['result'][0]['level'];
                                      }
                                      this.dialogRef.close(info);
                                  } else {
                                      this.isSubmitted = false;
                                      this.toastr.error(data['message']);
                                  }
                              }, (err) => {
                                  this.isSubmitted = false;
                                  this.toastr.error(err);
                              });
                          }
                      }
                  });
              } else {
                  this.toastr.error(this.errorMessages.WF_ATTACHMENT_PENDING_MSG);
                  this.selectedIndex = 1;
              }
          } catch (err) {
              this.toastr.error(err);
          }
      }
  
      checkFileUploadPending() {
          return false
      }
  
      nextPage() {
          this.page += 1;
          if (this.page > this.totalPages) {
              this.page = this.totalPages;
          }
      }
  
      previousPage() {
          this.page -= 1;
          if (this.page < 1) {
              this.page = 1;
          }
      }
  
      afterLoadComplete(pdfData: any) {
          this.totalPages = pdfData.numPages;
      }
  
      onError(error: any) {
          console.log(`#### Error #### ${error}`);
      }
  
      setEnglishOnFocusOut() {
          SetEnglish();
      }
      setLang() {
          if (this.currentLang === 'Guj') {
            SetEnglish();
          } else {
            SetGujarati();
          }
        }
      
        public toggleLanguage(): void {
          if (this.currentLang === 'Eng') {
            this.currentLang = 'Guj';
            return;
          }
          this.currentLang = 'Eng';
        }
  
      changeViewToWorkFlowAction() {
          this.showWorkFlowAction = true;
      }
  
      /**
       * @description To patch the remarks to remarks field
       * @param remarksValue remarks
       */
      setRemarksOnBlur(remarksValue) {
          this.workflowForm.patchValue({
              remarks: remarksValue
          });
      }
  }

