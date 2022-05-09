import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { CommonListing } from 'src/app/model/common-listing';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RemoveLoan } from 'src/app/model/dmo';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveLoanService } from 'src/app/modules/services/dmo/remove-loan.service';
import { ToastrService } from 'ngx-toastr';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/edp/edp-msg.constants';


@Component({
  selector: 'app-remove-loan',
  templateUrl: './remove-loan.component.html',
  styleUrls: ['./remove-loan.component.css']
})
export class RemoveLoanComponent implements OnInit {

  removeLoanForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  typeOfLoanCtrl = new FormControl();
  sanctionNoCtrl = new FormControl();
  loanDescriptionCtrl = new FormControl();
  nameOfInstituteCtrl = new FormControl();
  trancheCtrl = new FormControl();
  nameOfMinistryDepartmentCtrl = new FormControl();
  loanPurposeCtrl = new FormControl();
  planSchemeNameCtrl = new FormControl();
  selectedTypeOLoan;
  ShowDetails: boolean = false;
  typeOfLoan_list: CommonListing[] = [];

  sanctionNo_list: CommonListing[] = [];

  loanDescription_list: CommonListing[] = [];

  nameOfInstitute_list: CommonListing[] = [];

  tranche_list: CommonListing[] = [];

  nameOfMinistryDepartment_list: CommonListing[] = [];

  // loanPurpose_list: CommonListing[] = [];
  loanPurpose_list = [];

  planSchemeName_list: CommonListing[] = [];

  Element_Data: RemoveLoan[] = [];

  dataSource = new MatTableDataSource<RemoveLoan>(this.Element_Data);

  displayedColumns: any[] = [
    'position',
    'sanctionNo',
    'loanReceiptDate',
    'loanMaturityDate',
    'loanAmount',
    'loanTenure',
    'loanROI',
    'select',
  ];

  directiveObj = new CommonDirective();
  constructor(private fb: FormBuilder, private router: Router, private removeLoanService: RemoveLoanService,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService,
    public dialog: MatDialog,) { }

  ngOnInit() {
    this.removeLoanForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      typeOfLoan: [''],
      sanctionNo: [''],
      loanDescription: [''],
      nameOfInstitute: [''],
      tranche: [''],
      nameOfMinistryDepartment: [''],
      loanPurpose: [''],
      planSchemeName: [''],
    });

    this.GetTypeOfLoan();
    this.GetAllLoanPurposes();
    this.GetSanctionNumber();
    this.GetLoanDescription();
    this.GetInstitutes();
    this.GetPlanSchemaNames();
    this.getAllDepartmentNames();
    this.GetTranche();
  }

  SelectedTypeOfLoan(id) {
    this.selectedTypeOLoan = id.value;
  }

  loanPurposeSelected(event){
    console.log(event)

    this.loanPurpose_list.filter(item =>{
        if(item.id == event.value){
            console.log('hiii',item.schemeName)
            // this.goiLoanReceivedAddDetailsForm.value.planSchemeName = item.schemeName
            this.removeLoanForm.controls.planSchemeName.setValue(item.schemeName);
            
        }
    })
}

  GetTypeOfLoan() {
    this.removeLoanService.GetTypeOfLoan().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.typeOfLoan_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetAllLoanPurposes() {
    this.removeLoanService.GetAllLoanPurposes().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.loanPurpose_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }
  
  clearForm() {
    this.removeLoanForm.reset();
    this.selectedTypeOLoan =null;
  }

  GetSanctionNumber() {
    this.removeLoanService.GetSanctionNumber().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.sanctionNo_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetLoanDescription() {
    this.removeLoanService.GetLoanDescription().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.loanDescription_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetInstitutes() {
    this.removeLoanService.GetInstitutes().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.nameOfInstitute_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetPlanSchemaNames() {
    this.removeLoanService.GetPlanSchemaNames().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.planSchemeName_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  getAllDepartmentNames() {
    this.institutionalloandetailsService.getAllDepartmentNames().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.nameOfMinistryDepartment_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetRemoveLoanSearch() {
    var obj = {};
    if (this.selectedTypeOLoan == 1973) {
      obj =
      {
        "typeOfLoan": "GOI",
        "ministryId": this.removeLoanForm.value.nameOfMinistryDepartment,
        "loanPurpose": this.removeLoanForm.value.loanPurpose,
        "schemeId": this.removeLoanForm.value.planSchemeName,
        "fromDate": this.removeLoanForm.value.fromDate ? this.removeLoanForm.value.fromDate : null,
        "toDate": this.removeLoanForm.value.toDate ? this.removeLoanForm.value.toDate : null
      }

    } else if (this.selectedTypeOLoan == 1974) {
      obj = {
        "typeOfLoan": "NSSF",
        "sanctionNo": this.removeLoanForm.value.sanctionNo,
        "fromDate": this.removeLoanForm.value.fromDate ? this.removeLoanForm.value.fromDate : null,
        "toDate": this.removeLoanForm.value.toDate ? this.removeLoanForm.value.toDate : null
      };
    } else if (this.selectedTypeOLoan == 1975) {
      obj = {
        "typeOfLoan": "Market",
        "transDesc": this.removeLoanForm.value.loanDescription,
        "fromDate": this.removeLoanForm.value.fromDate ? this.removeLoanForm.value.fromDate : null,
        "toDate": this.removeLoanForm.value.toDate ? this.removeLoanForm.value.toDate : null
      };
    } else if (this.selectedTypeOLoan == 1976) {
      obj = {
        "typeOfLoan": "Institution",
        "instituteId": this.removeLoanForm.value.nameOfInstitute,
        "fromDate": this.removeLoanForm.value.fromDate ? this.removeLoanForm.value.fromDate : null,
        "toDate": this.removeLoanForm.value.toDate ? this.removeLoanForm.value.toDate : null
      };
    }

    this.removeLoanService.GetRemoveLoanSearch(obj).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.Element_Data = res['result'];
        this.dataSource = new MatTableDataSource<RemoveLoan>(this.Element_Data);
        this.ShowDetails = true;
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  DeleteLoan() {
    var typeOfLoan = this.selectedTypeOLoan == 1973 ? "GOI" :
      (this.selectedTypeOLoan == 1974 ? "NSSF" : (this.selectedTypeOLoan == 1975 ? "Market" :
        (this.selectedTypeOLoan == 1976 ? "Institution" : "")));
    if (this.selectedTypeOLoan != "") {
      var ids = this.directiveObj.selection.selected.map(a => a.id);
      if (ids.length > 0) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '360px',
            data: msgConst.CONFIRMATION_DIALOG.DELETE
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {

              var obj = {
                "typeOfLoan": typeOfLoan,
                "ids": ids
              };
              this.removeLoanService.DeleteLoan(obj).subscribe((res) => {
                if (res && res['status'] === 200 && res['result'] !== '') {
                  //this.Element_Data = res['result'];
                  this.toaster.success(res['result']);
                  this.GetRemoveLoanSearch();
                }
              },
                (err) => {
                  this.toaster.error(err);
                });

            }
          });       
      } else {
        this.toaster.error("Please select records to delete..");
      }
    } else {
      this.toaster.error("Please select Type of loan..");
    }
  }

  GetTranche() {
    this.removeLoanService.GetTranche().subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.tranche_list = res['result'];
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }
}
