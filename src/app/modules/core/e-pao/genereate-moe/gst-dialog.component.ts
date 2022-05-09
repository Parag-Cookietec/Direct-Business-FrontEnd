import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BranchHamApping, GenerateMoeEntry, ListValue } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';

// generate mode dialog
const ELEMENT_DATA1: BranchHamApping[] = [
  {
    branchName: 'Receipt Branch 1',
    branch: 'HA'
  }
];
type NewType = GenerateMoeEntry;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'generate-mode-dialog',
  templateUrl: 'generate-mode-dialog.html',
})


export class GSTDialogComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<GSTDialogComponent>
  ) { }
  ELEMENT_DATA: NewType[] = [
    {
      status: 'Forwarded',
      gstIN: '4254432',
      mOEAmount: '550.00',
      cin: '4654651',
      mOEType: 'MOE',
      partyName: 'A K Mehta',
      rbiAmount: '500.00',
      gstAmount: '500.00',
      bank: 'State Bank Of India',
      govCreditDate: '12-Feb-20',
      paymentDate: '19-Dec-19',
      moeRaisedDate: '19-Dec-19',
      remarks: 'Created'
    },
  ];
  // table source
  newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  newdisplayedColumns: string[] = ['srNo', 'gstIN', 'partyName', 'cin', 'paymentDate', 'gstAmount',
    'rbiAmount', 'mOEType', 'bank', 'mOEAmount', 'bank', 'govCreditDate', 'remarks', 'newaction'];
  vitocancel(): void {
    this.dialogRef.close();
  }

}
