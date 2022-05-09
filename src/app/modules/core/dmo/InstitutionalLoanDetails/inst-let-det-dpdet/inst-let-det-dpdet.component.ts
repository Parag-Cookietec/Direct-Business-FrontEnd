import { DatePipe, KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/model/common-listing';
import { InstitutionalloandetailsService } from 'src/app/modules/services/dmo/institutionalloandetails.service';
import { instLoanRecievedModel, instLoanRecievedRequestModel, keyValueModel } from '../model/institutional-loan';

@Component({
  selector: 'app-inst-let-det-dpdet',
  templateUrl: './inst-let-det-dpdet.component.html',
  styleUrls: ['./inst-let-det-dpdet.component.css']
})
export class InstLetDetDPDetComponent implements OnInit {

  loanReceivedForm: FormGroup;
  isDetails = false;
  maxDate = new Date();
  todayDate = Date.now();
  errorMessages = dmoMessage;
  Element_Data: instLoanRecievedModel[] = [];
  // request: instLoanRecievedRequestModel;
  keyValue: keyValueModel;


  dataSource; //new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'position',
    'memoNo',
    'adviceNo',
    'dpDate',
    'adviceDate',
    'adviceBy',
    'transactionDesc',
    'creditAmt',
    'addDetailStatus',
  ];

  constructor(private fb: FormBuilder, private router: Router, private institutionalloandetailsService: InstitutionalloandetailsService, private datePipe: DatePipe,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.loanReceivedForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
    });
  }

  getDetails() {

    this.isDetails = true;
    var kV1: keyValueModel = {
      key : "FromDate",
      value : this.loanReceivedForm.value.fromDate ?  this.datePipe.transform(this.loanReceivedForm.value.fromDate, 'yyyy-MM-dd') :"2018-03-31"
    };
    var kV2: keyValueModel = {
      key : "ToDate",
      value :this.loanReceivedForm.value.toDate ?   this.datePipe.transform(this.loanReceivedForm.value.toDate, 'yyyy-MM-dd'): "2020-03-31"
    };

    var obj:keyValueModel[]=[];
    obj.push(kV1,kV2);

    var request: instLoanRecievedRequestModel = {
      pageIndex : 10,
      pageElement : 10,
      sortByColumn : "1",
      sortOrder : "ASC",
      jsonArr:obj

      //jsonArr.push(kV2)
    };
    this.institutionalloandetailsService.getAllLoanRecieved(request).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.Element_Data = res['result']['result'];
        this.dataSource = new MatTableDataSource<any>(this.Element_Data);
        console.log(this.Element_Data);
      }
    },
      (err) => {
        this.toaster.error(err);
      });


  }
  onAddDetails(element) {
    debugger;
    this.router.navigate(['./dashboard/dmo/institutional-loan/institution-loan-received/add-details'], element);
  }

}
