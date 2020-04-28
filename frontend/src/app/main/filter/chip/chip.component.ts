import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  constructor() { }
  @Input()
  remove:boolean = false;
  @Input()
  id:number;
  @Input()
  text:string;
  @Output()
  output = new EventEmitter();

  ngOnInit(): void {
  }

  removeChips() {
    this.output.emit();
  }

}
