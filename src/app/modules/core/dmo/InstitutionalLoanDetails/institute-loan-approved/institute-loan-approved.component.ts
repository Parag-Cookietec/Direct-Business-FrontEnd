import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InstituteLoanApproved } from 'src/app/model/dmo';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-institute-loan-approved',
  templateUrl: './institute-loan-approved.component.html',
  styleUrls: ['./institute-loan-approved.component.css']
})
export class InstituteLoanApprovedComponent implements OnInit {

  instituteLoanApproved: FormGroup;
  todayDate = new Date();
  errorMessages = dmoMessage;
  loanAproved: any;
  directiveObj = new CommonDirective();
  showDetails: boolean = false;
  // table data
  columns: string[] = ['select', 'position', 'loanAccNumber',
    'sanctionOrderDate',
    'loanReceiptDate',
    'loanAmount',
    'loanTenure',
    'moratariumPeriod',
    'loanROI'];
  Element_Data: InstituteLoanApproved[] = [];
  //   {
  //     loanAccNumber: 'RIDF-1603', loanAmount: '1,00,000.00', loanReceiptDate: '27-Dec-2020',
  //     sanctionOrderDate: '25-Dec-2020', loanTenure: '7.0', moratariumPeriod: '2.0', loanROI: '4.5'
  //   }
  // ];
  dataSource = new MatTableDataSource<InstituteLoanApproved>(this.Element_Data);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private fb: FormBuilder, private datePipe: DatePipe,
    private institutionalloandetailsService: InstitutionalloandetailsService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.instituteLoanApproved = this.fb.group({
      loanNo: [null],
      fromDate: [''],
      toDate: ['']
    });
    this.dataSource.paginator = this.paginator;
  }
  getInstituteLoanApproved() {
    debugger;
    var obj = {
      adviceNo : this.instituteLoanApproved.value.loanNo,
      fromDate : this.instituteLoanApproved.value.fromDate ? this.datePipe.transform(this.instituteLoanApproved.value.fromDate, 'yyyy-MM-dd') : "2018-03-31",
      toDate : this.instituteLoanApproved.value.toDate ? this.datePipe.transform(this.instituteLoanApproved.value.toDate, 'yyyy-MM-dd') : "2021-03-31"
    };
    this.institutionalloandetailsService.getInstituteLoanApproved(JSON.stringify(obj)).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.Element_Data = res['result'];
        console.log(this.loanAproved);

        this.dataSource = new MatTableDataSource<InstituteLoanApproved>(this.Element_Data);

      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }

  GetDetails() {
    debugger;
    this.showDetails = true;
    this.getInstituteLoanApproved();
  }
}
