import { Component, OnInit } from '@angular/core';
import { PanelService } from './panel.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private panelService:PanelService) { }

  validationsList:Array<Object>;
  errorMessage:string;

  ngOnInit(): void {
    this.panelService.getAllAwaitingValidation().subscribe(
      validations => {
        this.validationsList = validations
        console.log(validations)
      },
      error => this.errorMessage = error
    )
  }

  approveEstablishment(est) {
    this.panelService.validateEstablishment(est).subscribe(
      obj => {
        this.validationsList = this.validationsList.filter(i => i != est)
      },
      err => console.log(err)
    )
  }

}
