import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.scss']
})
export class EstablishmentCardComponent implements OnInit {

  constructor() { }

  @Input()
  establishment;
  mapsLink: string;

  ngOnInit(): void {
    // this.mapsLink="https://maps.google.com/?q="+this.establishment['location'].latlng.lat+","+this.establishment['location'].latlng.lng
  }

}
