import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-operating-hours-select',
  templateUrl: './operating-hours-select.component.html',
  styleUrls: ['./operating-hours-select.component.scss']
})
export class OperatingHoursSelectComponent implements OnInit {

  constructor() { }

  @Input()
  day: string;
  time:string = ''
  zone: string = ''
  value:object = {time: this.time, zone: this.zone}
  @Output() onChange = new EventEmitter();
  

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    // document.getElementById('preloader').classList.add('show');
    // jQuery('select').selectpicker();
}

  valueChanged(type, value) {
    this.value[type] = value
    this.onChange.emit(this.value);
  }

}
