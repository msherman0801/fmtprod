import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
declare let places: any;
@Component({
  selector: 'app-instantsearch',
  template: `<input #input type="search" placeholder="Where are we going?" />`,
  styleUrls: ['./instantsearch.component.scss']
})
export class InstantsearchComponent implements OnInit {

  constructor() { }
  private placesAutocomplete = null;
  @ViewChild("input") input;
  @Output() onChange? = new EventEmitter();
  @Input() type : string; // type is available as a prop
  @Input() class : string;
  ngOnInit(): void {


  }
  
  ngAfterViewInit(): void {
    this.placesAutocomplete = places({
      appId: 'pl7D0MJC0OKA',
      apiKey: 'f63d81a39604a1e39976f4402d1d5b73',
      container: this.input.nativeElement
    });

    this.placesAutocomplete.on("change", e => {
      this.onChange.emit(e);
    });
  }

  ngOnDestroy() {
    this.placesAutocomplete.destroy();
  }

}
