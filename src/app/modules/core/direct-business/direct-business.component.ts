import { Component, OnInit } from '@angular/core';
import { DoiCommonService } from '../../services/doi/doi-common.service';

@Component({
  selector: 'app-direct-business',
  templateUrl: './direct-business.component.html',
  styleUrls: ['./direct-business.component.scss']
})
export class DirectBusinessComponent implements OnInit {

  constructor(private doiCommonService: DoiCommonService) { }

  ngOnInit() {
    this.doiCommonService.getDoiCommonData();
  }

}
